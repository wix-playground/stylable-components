import React = require('react');
import ReactDOM = require('react-dom');
import {CSSProperties} from "react";
const style = require('./popup.st.css').default;

export interface PositionPoint {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
}

export interface PopupProps {
    anchor: any;
    open?: boolean;
    anchorPosition?: PositionPoint;
}

export class Popup extends React.Component<Partial<PopupProps>,{}> {
    static defaultProps : Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'}
    };

    render() {
        if (!this.props.anchor) {
            return null;
        }

        const rect = (this.props.anchor as HTMLElement).getBoundingClientRect();
        const layout: CSSProperties = {position: 'absolute', top: rect[this.props.anchorPosition!.vertical]};
        if (this.props.anchorPosition!.horizontal === 'left') {
            layout.left = rect.left;
        } else {
            layout.right = rect.left;
        }

        return (
            <div data-automation-id="POPUP" style={layout} className={!this.props.open ? style.closed : ''}>
                {this.props.children}
            </div>
        );
    }
}

