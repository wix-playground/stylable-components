import React = require('react');
import {CSSProperties} from 'react';
import style from './popup.st.css';

export type VerticalPosition =  'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface PositionPoint {
    vertical: VerticalPosition;
    horizontal: HorizontalPosition;
}

export interface PopupProps {
    anchor: any;
    open?: boolean;
    anchorPosition?: PositionPoint;
    popupPosition?: PositionPoint;
    syncWidth?: boolean;
    maxHeight?: number;
}

export interface PopupState {
    style: CSSProperties;
}

export class Popup extends React.Component<Partial<PopupProps>, PopupState> {
    private static defaultProps: Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        maxHeight: 500
    };
    private popup: HTMLElement | null;

    constructor() {
        super();
        this.state = { style: {position: 'absolute'}};
    }

    public render() {
        if (!this.props.anchor) {
            return null;
        }
        return (
            <div
                data-automation-id="POPUP"
                ref={this.setPosition}
                style={this.state.style}
                className={!this.props.open ? style.closed : ''}
            >
                {this.props.children}
            </div>
        );
    }

    private setPosition = (popup: any) => {
        if (popup) {
            const newStyle = this.state.style;
            const popupRect = popup.getBoundingClientRect();
            let popupWidth = popupRect.width;

            newStyle.maxHeight = this.props.maxHeight;
            if (this.props.syncWidth) {
                newStyle.width = (this.props.anchor as HTMLElement).getBoundingClientRect().width;
                popupWidth = newStyle.width;
            }

            const anchorHorizontalPos = this.props.anchorPosition!.horizontal;
            const anchorVerticalPos = this.props.anchorPosition!.vertical;

            setTop(newStyle, (this.props.anchor as HTMLElement).getBoundingClientRect(),
                anchorVerticalPos, popup.getBoundingClientRect().height, this.props.popupPosition!.vertical);
            setLeft(newStyle, (this.props.anchor as HTMLElement).getBoundingClientRect(),
                anchorHorizontalPos, popupWidth, this.props.popupPosition!.horizontal);
            if (this.props.syncWidth) {
                newStyle.width = (this.props.anchor as HTMLElement).getBoundingClientRect().width;
            }
            this.setState({style: newStyle});
        }
    }
}

function setTop(popupStyle: CSSProperties, anchorRect: ClientRect,
                anchorPosition: VerticalPosition, popupHeight: number, popupPoistion: VerticalPosition) {
    switch (popupPoistion) {
        case 'top':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition) - (popupHeight / 2);
            break;
        case 'bottom':
            popupStyle.bottom = `calc(100% - ${getVerticalReference(anchorRect, anchorPosition)}px`;
            break;
    }
}

function setLeft(popupStyle: CSSProperties, anchorRect: ClientRect,
                 anchorPosition: HorizontalPosition, popupWidth: number, popupPoistion: HorizontalPosition) {
    switch (popupPoistion) {
        case 'left':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition) - (popupWidth / 2);
            break;
        case 'right':
            popupStyle.right = `calc(100% - ${getHorizontalReference(anchorRect, anchorPosition)}px`;
            break;
    }
}

function getVerticalReference(rect: ClientRect, anchorPosition: VerticalPosition) {
    if (anchorPosition === 'center') {
        return (window.scrollY ? window.scrollY : window.pageYOffset) + rect.top + (rect.height / 2);
    } else {
        return (window.scrollY ? window.scrollY : window.pageYOffset) + rect[anchorPosition as 'top' | 'bottom'];
    }
}

function getHorizontalReference(rect: ClientRect, anchorPosition: HorizontalPosition) {
    if (anchorPosition === 'center') {
        return (window.scrollX ? window.scrollX : window.pageXOffset) + rect.left + (rect.width / 2);
    } else {
        return (window.scrollX ? window.scrollX : window.pageXOffset) + rect[anchorPosition as 'left' | 'right'];
    }
}
