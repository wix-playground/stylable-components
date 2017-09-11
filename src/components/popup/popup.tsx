import * as React from 'react';
import {Portal} from '../../../src/components/portal';

export type PopupVerticalPosition =  'top' | 'center' | 'bottom';
export type PopupHorizontalPosition = 'left' | 'center' | 'right';

export interface PopupPositionPoint {
    vertical: PopupVerticalPosition;
    horizontal: PopupHorizontalPosition;
}

export interface PopupProps {
    open?: boolean;
    anchorPosition?: PopupPositionPoint;
    popupPosition?: PopupPositionPoint;
    syncWidth?: boolean;
    maxHeight?: number;
    children?: React.ReactNode;
}

export interface PopupCompProps extends PopupProps {
    anchor: Element | null;
}

export class Popup extends React.Component<PopupCompProps, {}> {
    public static defaultProps: Partial<PopupCompProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        maxHeight: 500
    };

    private portal: Portal | null;

    public render() {
        if (this.props.anchor && this.props.open) {
            return (
                <Portal style={this.createStyle()} ref={portal => this.portal = portal}>
                    {this.props.children}
                </Portal>);
        }

        return null;
    }

    public getPortal() {
        return this.portal;
    }

    private createStyle(): React.CSSProperties {
        if (!this.props.anchor) {
            return {};
        }
        const newStyle: React.CSSProperties = {position: 'absolute'};
        const anchorRect = this.props.anchor!.getBoundingClientRect();

        newStyle.maxHeight = this.props.maxHeight;
        newStyle.transform = '';
        newStyle.WebkitTransform = '';
        if (this.props.syncWidth) {
            newStyle.width = anchorRect.width;
        }

        newStyle.top = getVerticalReference(anchorRect, this.props.anchorPosition!.vertical);
        newStyle.left = getHorizontalReference(anchorRect, this.props.anchorPosition!.horizontal);
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

        return newStyle;
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
