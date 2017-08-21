import * as React from 'react';
import {Portal} from '../../../src';

export type VerticalPosition =  'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface PositionPoint {
    vertical: VerticalPosition;
    horizontal: HorizontalPosition;
}

export interface PopupProps {
    anchor: Element;
    open?: boolean;
    anchorPosition?: PositionPoint;
    popupPosition?: PositionPoint;
    syncWidth?: boolean;
    maxHeight?: number;
}

export class Popup extends React.Component<PopupProps, {}> {
    public static defaultProps: Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        maxHeight: 500
    };

    public render() {
        if (this.props.anchor && this.props.open) {
            return (
                <Portal style={this.createStyle()}>
                    {this.props.children}
                </Portal>);
        }

        return null;
    }

    private createStyle() {
        if (!this.props.anchor) {
            return;
        }
        const newStyle: React.CSSProperties = {position: 'absolute'};
        newStyle.display = this.props.open ? '' : 'none';
        const anchorRect = this.props.anchor.getBoundingClientRect();

        newStyle.maxHeight = this.props.maxHeight;
        newStyle.transform = '';
        newStyle.WebkitTransform = '';
        if (this.props.syncWidth) {
            newStyle.width = anchorRect.width;
        }

        const anchorHorizontalPos = this.props.anchorPosition!.horizontal;
        const anchorVerticalPos = this.props.anchorPosition!.vertical;

        setTop(newStyle, anchorRect,
            anchorVerticalPos, this.props.popupPosition!.vertical);
        setLeft(newStyle, anchorRect,
            anchorHorizontalPos, this.props.popupPosition!.horizontal);
        if (this.props.syncWidth) {
            newStyle.width = anchorRect.width;
        }
        return newStyle;
    }
}

function setTop(popupStyle: React.CSSProperties, anchorRect: ClientRect,
                anchorPosition: VerticalPosition, popupPosition: VerticalPosition) {
    switch (popupPosition) {
        case 'top':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition);
            addTransform(popupStyle, 'translateY(-50%)');
            break;
        case 'bottom':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition);
            addTransform(popupStyle, 'translateY(-100%)');
            break;
    }
}

function setLeft(popupStyle: React.CSSProperties, anchorRect: ClientRect,
                 anchorPosition: HorizontalPosition, popupPoistion: HorizontalPosition) {
    switch (popupPoistion) {
        case 'left':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition);
            addTransform(popupStyle, 'translateX(-50%)');
            break;
        case 'right':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition);
            addTransform(popupStyle, 'translateX(-100%)');
            break;
    }
}

function getVerticalReference(rect: ClientRect, anchorPosition: VerticalPosition): number {
    if (anchorPosition === 'center') {
        return window.pageYOffset + rect.top + (rect.height / 2);
    } else {
        return window.pageYOffset + rect[anchorPosition as 'top' | 'bottom'];
    }
}

function getHorizontalReference(rect: ClientRect, anchorPosition: HorizontalPosition): number {
    if (anchorPosition === 'center') {
        return window.pageXOffset + rect.left + (rect.width / 2);
    } else {
        return window.pageXOffset + rect[anchorPosition as 'left' | 'right'];
    }
}

function addTransform(style: React.CSSProperties, tranformation: string) {
    style.transform += tranformation;
    style.WebkitTransform += tranformation;
}
