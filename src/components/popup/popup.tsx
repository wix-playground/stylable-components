import * as React from 'react';
import {properties} from 'wix-react-tools';
import {Point} from '../../types';
import {StylableProps} from '../../types/props';
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
    children?: React.ReactNode;
}

export interface PopupCompProps extends PopupProps {
    anchor: Element | Point | null;
}

export interface PopupState {
    style: React.CSSProperties;
}

@properties
export class Popup extends React.Component<PopupCompProps, PopupState> {
    public static defaultProps: Partial<PopupCompProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true
    };

    public state: PopupState = {
        style: {}
    };

    private portal: Portal | null;

    public componentWillMount() {
        this.setState({style: this.createStyle(this.props)});
    }

    public componentWillReceiveProps(nextProps: PopupCompProps) {
        this.setState({style: this.createStyle(nextProps)});
    }

    public render() {
        if (this.props.anchor && this.props.open) {
            return (
                <Portal
                    style={this.state.style}
                    ref={portal => this.portal = portal}
                >
                    {this.props.children}
                </Portal>);
        }

        return null;
    }

    public componentDidUpdate() {
        const style = this.createStyle(this.props);
        if (!objectsShallowEqual(style, this.state.style)) {
            this.setState({style});
        }
    }

    public getPortal(): Portal | null {
        return this.portal;
    }

    private createStyle(props: PopupCompProps): React.CSSProperties {
        if (!props.anchor || !props.open) {
            return {};
        }
        const newStyle: React.CSSProperties = {position: 'absolute'};

        newStyle.transform = '';
        newStyle.WebkitTransform = '';
        if (isPoint(props.anchor)) {
            newStyle.top = props.anchor.y;
            newStyle.left = props.anchor.x;

        } else {
            const anchorRect = props.anchor!.getBoundingClientRect();
            if (props.syncWidth) {
                newStyle.width = anchorRect.width;
            }

            newStyle.top = getVerticalReference(anchorRect, props.anchorPosition!.vertical);
            newStyle.left = getHorizontalReference(anchorRect, props.anchorPosition!.horizontal);
        }
        switch (props.popupPosition!.vertical) {
            case 'center':
                addTransform(newStyle, 'translateY(-50%)');
                break;
            case 'bottom':
                addTransform(newStyle, 'translateY(-100%)');
                break;
        }
        switch (props.popupPosition!.horizontal) {
            case 'center':
                addTransform(newStyle, 'translateX(-50%)');
                break;
            case 'right':
                addTransform(newStyle, 'translateX(-100%)');
                break;
        }

        return newStyle;
    }
}

function objectsShallowEqual(a: {[index: string]: any}, b: {[index: string]: any}) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    return (aKeys.length === bKeys.length) ? aKeys.every(k => a[k] === b[k]) : false;
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
