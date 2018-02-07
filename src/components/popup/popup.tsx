import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {properties, stylable} from 'wix-react-tools';
import {Point} from '../../types';
import {StylableProps} from '../../types/props';
import {objectsShallowEqual} from '../../utils';
import {Portal} from '../portal';

import styles from './popup.st.css';

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
    autoPosition?: boolean;
}

export interface PopupCompProps extends PopupProps {
    anchor: Element | Point | null;
}

export interface PopupState {
    style: React.CSSProperties;
    className: string;
}

@stylable(styles)
@properties
export class Popup extends React.Component<PopupCompProps, PopupState> {
    public static defaultProps: Partial<PopupCompProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        autoPosition: false
    };

    public state: PopupState = {
        style: {},
        className: ''
    };

    private portal: Portal | null;

    public componentDidMount() {
        this.setStyle(this.props);
    }

    public componentWillReceiveProps(nextProps: PopupCompProps) {
        this.setStyle(nextProps);
    }

    public componentDidUpdate() {
        this.setStyle(this.props);
    }

    public render() {
        if (this.props.anchor && this.props.open) {
            return (
                <Portal
                    style={this.state.style}
                    className={this.state.className}
                    ref={portal => this.portal = portal}
                >
                    {React.cloneElement(this.props.children as React.ReactElement<any>, {
                        ref: 'content'
                    })}
                </Portal>
            );
        }

        return null;
    }

    public getPortal(): Portal | null {
        return this.portal;
    }

    private setStyle(props: PopupCompProps) {
        const state = this.createStyleAndClassName(props);
        if (!objectsShallowEqual(state.style, this.state.style)) {
            this.setState(state);
        }
    }

    private createStyleAndClassName(props: PopupCompProps): PopupState {
        if (!props.autoPosition) {
            return {
                style: this.createStyle(props),
                className: ''
            };
        }
        const positions: Array<{
            anchorPosition: PopupPositionPoint,
            popupPosition: PopupPositionPoint,
            className: string
        }> = [
            // open bellow the anchor, left sides matches
            {
                anchorPosition: {vertical: 'bottom', horizontal: 'left'},
                popupPosition: {vertical: 'top', horizontal: 'left'},
                className: 'bottomLeft'
            },
            // open bellow the anchor, right sides matches
            {
                anchorPosition: {vertical: 'bottom', horizontal: 'right'},
                popupPosition: {vertical: 'top', horizontal: 'right'},
                className: 'bottomRight'
            },
            // open above the anchor, left sides matches
            {
                anchorPosition: {vertical: 'top', horizontal: 'left'},
                popupPosition: {vertical: 'bottom', horizontal: 'left'},
                className: 'topLeft'
            },
            // open above the anchor, right sides matches
            {
                anchorPosition: {vertical: 'top', horizontal: 'right'},
                popupPosition: {vertical: 'bottom', horizontal: 'right'},
                className: 'topRight'
            }
        ];

        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        let style: React.CSSProperties = {};
        let className: string = '';
        for (const position of positions) {
            className = position.className;
            style = this.createStyle({
                ...props,
                anchorPosition: position.anchorPosition,
                popupPosition: position.popupPosition
            });
            if (
                (style.top >= scrollY) &&
                (style.top + style.height <= scrollY + winHeight) &&
                (style.left >= scrollX) &&
                (style.left + style.width <= scrollX + winWidth)
            ) {
                break;
            }
        }
        return {style, className};
    }

    private createStyle(props: PopupCompProps): React.CSSProperties {
        if (!props.anchor || !props.open) {
            return {};
        }
        const content = findDOMNode(this.refs.content) as HTMLElement;
        const {offsetWidth = 0, offsetHeight = 0} = content || {};
        const newStyle: React.CSSProperties = {
            position: 'absolute',
            height: offsetHeight
        };

        if (isPoint(props.anchor)) {
            newStyle.top = props.anchor.y;
            newStyle.left = props.anchor.x;
            newStyle.width = offsetWidth;

        } else {
            const anchorRect = props.anchor!.getBoundingClientRect();
            newStyle.width = props.syncWidth ?
                anchorRect.width :
                offsetWidth;

            newStyle.top = getVerticalReference(anchorRect, props.anchorPosition!.vertical);
            newStyle.left = getHorizontalReference(anchorRect, props.anchorPosition!.horizontal);
        }
        switch (props.popupPosition!.vertical) {
            case 'center':
                newStyle.top -= newStyle.height / 2;
                break;
            case 'bottom':
                newStyle.top -= newStyle.height;
                break;
        }
        switch (props.popupPosition!.horizontal) {
            case 'center':
                newStyle.left -= newStyle.width / 2;
                break;
            case 'right':
                newStyle.left -= newStyle.width;
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

function isPoint(elem: Element | Point): elem is Point {
    return elem.hasOwnProperty('x') && elem.hasOwnProperty('y');
}
