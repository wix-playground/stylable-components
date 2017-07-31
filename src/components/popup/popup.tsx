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
}

export interface PopupState {
    layout: CSSProperties;
}

export class Popup extends React.Component<Partial<PopupProps>,PopupState> {
    popup: HTMLElement | null;
    static defaultProps : Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'}
    };

    constructor() {
        super();
        this.state = { layout: {position: 'absolute'}};
    }

    componentDidMount() {
        if (this.popup) {
            const newLayout = this.state.layout;
            setTop(newLayout, (this.props.anchor as HTMLElement).getBoundingClientRect(), this.props.anchorPosition!.vertical, this.popup.getBoundingClientRect(), this.props.popupPosition!.vertical);
            setLeft(newLayout, (this.props.anchor as HTMLElement).getBoundingClientRect(), this.props.anchorPosition!.horizontal, this.popup.getBoundingClientRect(), this.props.popupPosition!.horizontal);
            this.setState({layout: newLayout})
        }
    }

    render() {
        if (!this.props.anchor) {
            return null;
        }

        return (
            <div data-automation-id="POPUP" ref={(popup) => {this.popup = popup}} style={this.state.layout} className={!this.props.open ? style.closed : ''}>
                {this.props.children}
            </div>
        );
    }
}

function setTop(layout: CSSProperties, anchorRect: ClientRect, anchorPosition: VerticalPosition, popupRect: ClientRect, popupPoistion: VerticalPosition) {
    switch (popupPoistion) {
        case 'top':
            layout.top = getVerticalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            layout.top = getVerticalReference(anchorRect, anchorPosition) - (popupRect.height / 2);
            break;
        case 'bottom':
            layout.bottom = `calc(100% - ${getVerticalReference(anchorRect, anchorPosition)}px`;
            break;
    }
}

function setLeft(layout: CSSProperties, anchorRect: ClientRect, anchorPosition: HorizontalPosition, popupRect: ClientRect, popupPoistion: HorizontalPosition) {
    switch (popupPoistion) {
        case 'left':
            layout.left = getHorizontalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            layout.left = getHorizontalReference(anchorRect, anchorPosition) - (popupRect.width / 2);
            break;
        case 'right':
            layout.right = `calc(100% - ${getHorizontalReference(anchorRect, anchorPosition)}px`;
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

