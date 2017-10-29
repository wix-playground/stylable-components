import * as React from 'react';
import {properties} from 'wix-react-tools';
import {Point} from '../../types';
import {StylableProps} from '../../types/props';
import {noop} from '../../utils';
import {Portal} from '../portal';

export type PopupVerticalPosition =  'top' | 'center' | 'bottom';
export type PopupHorizontalPosition = 'left' | 'center' | 'right';

export interface PopupPositionPoint {
    vertical: PopupVerticalPosition;
    horizontal: PopupHorizontalPosition;
}

export interface PopupProps extends StylableProps {
    open?: boolean;
    anchorPosition?: PopupPositionPoint;
    popupPosition?: PopupPositionPoint;
    syncWidth?: boolean;
    onExitBounds?: () => void;
    children?: React.ReactNode;
}

export interface PopupCompProps extends PopupProps {
    anchor: Element | Point | null;
}

@properties
export class Popup extends React.Component<PopupCompProps> {
    public static defaultProps: Partial<PopupCompProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        onExitBounds: noop
    };

    private portal: Portal | null;
    private isExitingBounds = false;

    public render() {
        if (this.props.anchor && this.props.open) {
            return (
                <Portal
                    style={this.createStyle()}
                    ref={portal => this.portal = portal}
                >
                    {this.props.children}
                </Portal>);
        }

        return null;
    }

    public componentDidMount() {
        window.addEventListener('scroll', this.onScroll, true);
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    public componentDidUpdate() {
        if (this.isExitingBounds) {
            this.props.onExitBounds!();
        }
        this.isExitingBounds = false;
    }

    public getPortal(): Portal | null {
        return this.portal;
    }

    private onScroll = (e: Event) => {
        if (this.props.anchor && this.props.open
                && !isPoint(this.props.anchor) && (e.target as Node).contains(this.props.anchor)) {
            this.forceUpdate();
        }
    }

    private createStyle(): React.CSSProperties {
        if (!this.props.anchor) {
            return {};
        }
        const newStyle: React.CSSProperties = {position: 'absolute'};

        newStyle.transform = '';
        newStyle.WebkitTransform = '';
        if (isPoint(this.props.anchor)) {
            newStyle.top = this.props.anchor.y;
            newStyle.left = this.props.anchor.x;

        } else {
            const anchorRect = this.props.anchor!.getBoundingClientRect();
            if (this.props.syncWidth) {
                newStyle.width = anchorRect.width;
            }

            newStyle.top = getVerticalReference(anchorRect, this.props.anchorPosition!.vertical);
            newStyle.left = getHorizontalReference(anchorRect, this.props.anchorPosition!.horizontal);
        }
        switch (this.props.popupPosition!.vertical) {
            case 'center':
                addTransform(newStyle, 'translateY(-50%)');
                break;
            case 'bottom':
                addTransform(newStyle, 'translateY(-100%)');
                break;
        }
        switch (this.props.popupPosition!.horizontal) {
            case 'center':
                addTransform(newStyle, 'translateX(-50%)');
                break;
            case 'right':
                addTransform(newStyle, 'translateX(-100%)');
                break;
        }

        const rect = this.getPortalRect();
        if (rect) {
            this.isExitingBounds = isFullyContainedWithinWindow(newStyle.top, newStyle.left, rect.height, rect.width);
        }
        return newStyle;
    }

    private getPortalRect(): ClientRect | null {
        return this.portal && this.portal.getPortal && this.portal.getPortal()!.getBoundingClientRect();
    }
}

function getVerticalReference(rect: ClientRect, anchorPosition: PopupVerticalPosition): number {
    if (anchorPosition === 'center') {
        return window.pageYOffset + rect.top + (rect.height / 2);
    } else {
        return window.pageYOffset + rect[anchorPosition as 'top' | 'bottom'];
    }
}

function getHorizontalReference(rect: ClientRect, anchorPosition: PopupHorizontalPosition): number {
    if (anchorPosition === 'center') {
        return window.pageXOffset + rect.left + (rect.width / 2);
    } else {
        return window.pageXOffset + rect[anchorPosition as 'left' | 'right'];
    }
}

function addTransform(style: React.CSSProperties, transformation: string) {
    style.transform += transformation;
    style.WebkitTransform += transformation;
}

function isPoint(elem: Element | Point): elem is Point {
    return elem.hasOwnProperty('x') && elem.hasOwnProperty('y');
}

function isFullyContainedWithinWindow(top: number, left: number, height: number, width: number): boolean {
    return top < 0 ||
        left < 0 ||
        top + height - window.pageYOffset > window.innerHeight ||
        left + width - window.pageXOffset > window.innerWidth;
}
