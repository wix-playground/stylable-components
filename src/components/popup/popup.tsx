import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {properties} from 'wix-react-tools';
import {Point} from '../../types';
import {StylableProps} from '../../types/props';
import {objectsShallowEqual} from '../../utils';
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
    autoPosition?: boolean;
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
        syncWidth: true,
        autoPosition: false
    };

    public state: PopupState = {
        style: {}
    };

    public componentWillMount() {
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
                    ref="portal"
                >
                    {React.cloneElement(this.props.children as React.ReactElement<any>, {
                        ref: 'content'
                    })}
                </Portal>
            );
        }

        return null;
    }

    private setStyle(props: PopupCompProps) {
        const style = this.createStyleWithAutoPosition(props);
        if (!objectsShallowEqual(style, this.state.style)) {
            this.setState({style});
        }
    }

    public getPortal(): Portal | null {
        return this.refs.portal as Portal;
    }

    private createStyleWithAutoPosition(props: PopupCompProps): React.CSSProperties {
        if (!props.autoPosition) {
            return this.createStyle(props);
        }
        const positions: Array<{
            anchorPosition: PopupPositionPoint,
            popupPosition: PopupPositionPoint
        }> = [
            // open bellow the anchor
            {
                anchorPosition: {vertical: 'bottom', horizontal: 'left'},
                popupPosition: {vertical: 'top', horizontal: 'left'}
            },
            // open above the anchor
            {
                anchorPosition: {vertical: 'top', horizontal: 'left'},
                popupPosition: {vertical: 'bottom', horizontal: 'left'}
            }
        ];

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const winHeight = window.innerHeight;

        let style: React.CSSProperties = {};
        for (const position of positions) {
            style = this.createStyle({
                ...props,
                ...position
            });
            if (
                (style.top >= scrollY) &&
                (style.top + style.height <= scrollY + winHeight)
            ) {
                break;
            }
        }
        return style;
    }

    private createStyle(props: PopupCompProps): React.CSSProperties {
        if (!props.anchor || !props.open) {
            return {};
        }
        const content = findDOMNode(this.refs.content) as HTMLElement;
        const {offsetWidth = 0, offsetHeight = 0} = content || {};
        const newStyle: React.CSSProperties = {
            position: 'absolute',
            height: offsetHeight,
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
