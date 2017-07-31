import React = require('react');
import ReactDOM = require('react-dom');
import {CSSProperties} from "react";
const style = require('./popup.st.css').default;

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
    maxHeight?: number
}

export interface PopupState {
    style: CSSProperties;
}

export class Popup extends React.Component<Partial<PopupProps>,PopupState> {
    popup: HTMLElement | null;
    static defaultProps : Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        maxHeight: 500
    };

    constructor() {
        super();
        this.state = { style: {position: 'absolute'}};
    }

    componentDidMount() {
        if (this.popup) {
            const newStyle = this.state.style;
            let popupWidth = this.popup.getBoundingClientRect().width;

            newStyle.maxHeight = this.props.maxHeight;
            if (this.props.syncWidth) {
                newStyle.width = (this.props.anchor as HTMLElement).getBoundingClientRect().width;
                popupWidth = newStyle.width;
            }

            setTop(newStyle, (this.props.anchor as HTMLElement).getBoundingClientRect(), this.props.anchorPosition!.vertical, this.popup.getBoundingClientRect().height, this.props.popupPosition!.vertical);
            setLeft(newStyle, (this.props.anchor as HTMLElement).getBoundingClientRect(), this.props.anchorPosition!.horizontal, popupWidth, this.props.popupPosition!.horizontal);
            if (this.props.syncWidth) {
                newStyle.width = (this.props.anchor as HTMLElement).getBoundingClientRect().width;
            }
            this.setState({style: newStyle})
        }
    }

    render() {
        if (!this.props.anchor) {
            return null;
        }

        return (
            <div data-automation-id="POPUP" ref={(popup) => {this.popup = popup}} style={this.state.style} className={!this.props.open ? style.closed : ''}>
                {this.props.children}
            </div>
        );
    }
}

function setTop(style: CSSProperties, anchorRect: ClientRect, anchorPosition: VerticalPosition, popupHeight: number, popupPoistion: VerticalPosition) {
    switch (popupPoistion) {
        case 'top':
            style.top = getVerticalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            style.top = getVerticalReference(anchorRect, anchorPosition) - (popupHeight / 2);
            break;
        case 'bottom':
            style.bottom = `calc(100% - ${getVerticalReference(anchorRect, anchorPosition)}px`;
            break;
    }
}

function setLeft(style: CSSProperties, anchorRect: ClientRect, anchorPosition: HorizontalPosition, popupWidth: number, popupPoistion: HorizontalPosition) {
    switch (popupPoistion) {
        case 'left':
            style.left = getHorizontalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            style.left = getHorizontalReference(anchorRect, anchorPosition) - (popupWidth / 2);
            break;
        case 'right':
            style.right = `calc(100% - ${getHorizontalReference(anchorRect, anchorPosition)}px`;
            break;
    }
}

function getVerticalReference(rect: ClientRect, anchorPosition: VerticalPosition) {
    if (anchorPosition === 'center') {
        return rect.top + (rect.height / 2);
    } else {
        return rect[anchorPosition as 'top' | 'bottom'];
    }
}

function getHorizontalReference(rect: ClientRect, anchorPosition: HorizontalPosition) {
    if (anchorPosition === 'center') {
        return rect.left + (rect.width / 2);
    } else {
        return rect[anchorPosition as 'left' | 'right'];
    }
}

