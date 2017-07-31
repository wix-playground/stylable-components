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
}

export class Popup extends React.Component<Partial<PopupProps>,{}> {
    popup: HTMLElement | null;
    static defaultProps : Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'}
    };

    componentDidMount() {
        if (this.popup) {

        }
    }

    render() {
        if (!this.props.anchor) {
            return null;
        }

        const rect = (this.props.anchor as HTMLElement).getBoundingClientRect();
        const layout: CSSProperties = {position: 'absolute'};
        layout.top = getTop(rect, this.props.anchorPosition!.vertical);


        if (this.props.anchorPosition!.horizontal === 'left') {
            layout.left = rect.left;
        } else if (this.props.anchorPosition!.horizontal === 'center') {
            layout.left = rect.left + (rect.width / 2);
        } else {
            layout.right = `calc(100% - ${rect.right}px`;
        }

        return (
            <div data-automation-id="POPUP" ref={(popup) => {this.popup = popup}} style={layout} className={!this.props.open ? style.closed : ''}>
                {this.props.children}
            </div>
        );
    }
}

function getTop(rect: ClientRect, position: VerticalPosition) {
    if (position !== 'center') {
        return rect[position as 'top' | 'bottom'];
    } else {
        return rect.top + (rect.height / 2);
    }
}


