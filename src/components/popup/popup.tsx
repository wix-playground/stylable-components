import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {OverlayManager} from 'html-overlays';
import {properties, stylable} from 'wix-react-tools';
import {Point} from '../../types';
import {StylableProps} from '../../types/props';
import {measure, Measurements, findScrollParent, objectsShallowEqual} from '../../utils';
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
    private overlayManager?: OverlayManager;

    public state: PopupState = {
        style: {},
        className: ''
    };

    private portal: Portal | null;
    private timer: number;

    public componentDidMount() {
        this.setStyle(this.props);
        this.setOverlay();
    }

    public componentDidUpdate() {
        this.setStyle(this.props);
        this.setOverlay();
    }
    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    public render() {
        const {anchor, open, children} = this.props;
        if (anchor && open) {
            return (
                <Portal
                    overlayManager={this.overlayManager}
                    style={this.state.style}
                    className={this.state.className}
                    ref={portal => this.portal = portal}
                >
                    {React.cloneElement(children as React.ReactElement<any>, {
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

    private setOverlay() {
        this.overlayManager = this.props.anchor && !isPoint(this.props.anchor) ?
            new OverlayManager(findScrollParent(this.props.anchor as HTMLElement)) :
            undefined;
    }

    private setStyle(props: PopupCompProps) {
        if (!props.anchor || !props.open) {
            return;
        }

        // for some reason react 16 does not garantee that ref will set at this point.
        // so we skip this tick and apply calculations in next tick
        this.timer = setTimeout(() => {
            const state = this.createStyleAndClassName(props);
            if (!objectsShallowEqual(state.style, this.state.style)) {
                this.setState(state);
            }
        });
    }

    private createStyleAndClassName(props: PopupCompProps): PopupState {
        const node = props.anchor && !isPoint(props.anchor) ? (props.anchor as HTMLElement) : undefined;
        const measurements = measure(node!);

        if (!props.autoPosition) {
            return {
                style: this.createStyle(props, measurements),
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
            },
            // open bellow the anchor, left sides matches
            {
                anchorPosition: {vertical: 'bottom', horizontal: 'left'},
                popupPosition: {vertical: 'top', horizontal: 'left'},
                className: 'bottomLeft'
            }
        ];

        let style: React.CSSProperties = {};
        let className: string = '';
        for (const position of positions) {
            className = position.className;
            style = this.createStyle({
                ...props,
                anchorPosition: position.anchorPosition,
                popupPosition: position.popupPosition
            }, measurements);
            if (
                (style.top >= measurements.scrollY) &&
                (style.top + style.height <= measurements.scrollY + measurements.rootHeight) &&
                (style.left >= measurements.scrollX) &&
                (style.left + style.width <= measurements.scrollX + measurements.rootWidth)
            ) {
                break;
            }
        }
        return {style, className};
    }

    private createStyle(props: PopupCompProps, measurements: Measurements): React.CSSProperties {
        if (!props.anchor) {
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
            const {vertical, horizontal} = props.anchorPosition!;
            newStyle.top = measurements.top;
            newStyle.left = measurements.left;
            newStyle.width = props.syncWidth ?
                measurements.width :
                offsetWidth;

            if (vertical === 'center') {
                newStyle.top += measurements.height / 2;
            } else if (vertical === 'bottom') {
                newStyle.top += measurements.height;
            }

            if (horizontal === 'center') {
                newStyle.left += measurements.width / 2;
            } else if (horizontal === 'right') {
                newStyle.left += measurements.width;
            }
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

function isPoint(elem: Element | Point): elem is Point {
    return elem.hasOwnProperty('x') && elem.hasOwnProperty('y');
}
