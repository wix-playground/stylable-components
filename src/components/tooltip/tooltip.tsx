import * as debounce from 'debounce';
import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {findScrollParent, measure, warnOnce} from '../../utils';
import {GlobalEvent, GlobalEventProps} from '../global-event';
import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom' |
    'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' |
    'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface TooltipProps {
    className?: string;
    children?: React.ReactNode;
    position?: Position;
    id: string;
    open?: boolean;
    showTrigger?: string | string[];
    hideTrigger?: string | string[];
    showDelay?: number;
    hideDelay?: number;
    onTop?: boolean;
    disableGlobalEvents?: boolean;
    disableAutoPosition?: boolean;
}

export interface TooltipState {
    style?: React.CSSProperties;
    open: boolean;
    position: Position;
}

const DATA_FOR_ATTRIBUTE = 'data-tooltip-for';

function hasPosition(position: Position, ...candidates: string[]): boolean {
    return candidates.some(item => item === position);
}

const positions: Position[] = [
    'top', 'bottom', 'left', 'right',
    'topLeft', 'topRight',
    'rightTop', 'rightBottom',
    'bottomRight', 'bottomLeft',
    'leftBottom', 'leftTop'
];

@stylable(styles)
export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    public static defaultProps = {
        open: false,
        position: 'top',
        showTrigger: 'mouseenter',
        hideTrigger: 'mouseleave',
        showDelay: 0,
        hideDelay: 0,
        onTop: false,
        disableAutoPosition: false,
        disableGlobalEvents: false
    };

    private target: HTMLElement | null = null;
    private overlayRoot: HTMLElement | null = null;
    private tooltip: HTMLElement | null = null;
    private preventHide: boolean;
    private events: string[] = [];
    private timeout?: number;
    private setStylesDebounce = debounce(() => {
        if (this.state.open) {
            this.setStyles();
        }
    }, 200);

    public constructor(props: TooltipProps) {
        super();
        this.state = {
            style: undefined,
            open: props.open!,
            position: props.position!
        };
    }

    public render() {
        const {children, disableGlobalEvents, onTop, className} = this.props;
        const {style, open, position} = this.state;
        const globalEvents: GlobalEventProps = {
            resize: this.setStylesDebounce
        };

        if (!disableGlobalEvents) {
            globalEvents.mousedown = globalEvents.touchstart = this.hide;
        }

        if (!open) {
            return null;
        }

        return (
            <div>
                <GlobalEvent {...globalEvents}/>
                <Portal overlayRoot={this.overlayRoot}>
                    <div
                        data-automation-id="TOOLTIP"
                        className={`innerPortal ${position} ${className || ''}`}
                        style={style}
                        style-state={{open, onTop, unplaced: !style}}
                        onMouseDown={this.stopEvent}
                    >
                        <div
                            className="tooltip"
                            ref={elem => this.tooltip = elem}
                        >
                            {children}
                            <svg className="tail" height="5" width="10" data-automation-id="TOOLTIP_TAIL">
                                <polygon points="0,0 10,0 5,5"/>
                            </svg>
                        </div>
                    </div>
                </Portal>
            </div>
        );
    }

    public componentDidMount() {
        this.setTarget();
        this.bindEvents();
        if (this.state.open) {
            this.setStyles();
        }
    }
    public componentWillUnmount() {
        window.clearTimeout(this.timeout!);
        this.unbindEvents();
        this.setStylesDebounce.clear();
    }
    public componentWillReceiveProps(props: TooltipProps) {
        if (
            props.id !== this.props.id ||
            props.showTrigger !== this.props.showTrigger ||
            props.hideTrigger !== this.props.hideTrigger
        ) {
            this.unbindEvents();
            this.setTarget();
            this.bindEvents();
        }
        if ('open' in props && this.props.open !== props.open) {
            this.setState({open: props.open!}, this.setStylesDebounce);
        } else {
            this.setStylesDebounce();
        }
    }

    public show = () => this.setState({open: true}, this.setStylesDebounce);

    public hide = () => {
        if (!this.preventHide) {
            this.setState({open: false, style: undefined});
        }
        this.preventHide = false;
    }

    private setTarget() {
        const target = document.querySelector(`[${DATA_FOR_ATTRIBUTE}=${this.props.id}]`) as HTMLElement;
        if (target && target !== this.target) {
            this.target = target!;
            this.overlayRoot = findScrollParent(this.target);
        }
        if (!target) {
            this.target = null;
            this.overlayRoot = null;
            warnOnce(`There is no anchor with "${DATA_FOR_ATTRIBUTE}=%s"`, this.props.id);
        }
    }

    private bindEvents() {
        if (!this.target) {
            return;
        }
        const {showTrigger, hideTrigger} = this.props;
        this.events = ([] as string[])
            .concat(showTrigger!, hideTrigger!)
            .filter((val, index, arr) => arr.indexOf(val) === index);
        this.events.forEach(event => {
            this.target!.addEventListener(event, this.toggle);
        });
        this.target!.addEventListener('mousedown', this.stopEvent);
    }
    private unbindEvents() {
        if (!this.target) {
            return;
        }
        this.events.forEach(event => {
            this.target!.removeEventListener(event, this.toggle);
        });
        this.target!.removeEventListener('mousedown', this.stopEvent);
    }
    private setStyles() {
        if (!this.target || !this.tooltip) {
            return;
        }
        const measurements = measure(this.target);
        const tipWidth = this.tooltip!.offsetWidth;
        const tipHeight = this.tooltip!.offsetHeight;
        const index = positions.indexOf(this.props.position!);
        const orderedPositions = this.props.disableAutoPosition ?
            [this.props.position!] :
            positions.slice(index).concat(positions.slice(0, index), this.state.position);

        let top: number = 0;
        let left: number = 0;
        let position: Position;
        for (position of orderedPositions) {
            top = measurements.top;
            left = measurements.left;
            if (hasPosition(position, 'bottom', 'bottomLeft', 'bottomRight', 'leftBottom', 'rightBottom')) {
                top += measurements.height;
            }
            if (hasPosition(position, 'left', 'right')) {
                top += measurements.height / 2 - tipHeight / 2;
            }
            if (hasPosition(position, 'right', 'topRight', 'bottomRight', 'rightTop', 'rightBottom')) {
                left += measurements.width;
            }
            if (hasPosition(position, 'top', 'bottom')) {
                left += measurements.width / 2 - tipWidth / 2;
            }
            if (hasPosition(position, 'top', 'topLeft', 'topRight', 'leftBottom', 'rightBottom')) {
                top -= tipHeight;
            }
            if (hasPosition(position, 'left', 'topRight', 'bottomRight', 'leftTop', 'leftBottom')) {
                left -= tipWidth;
            }
            if (
                (left >= measurements.scrollX) && (top >= measurements.scrollY) &&
                (left + tipWidth <= measurements.scrollX + measurements.rootWidth) &&
                (top + tipHeight <= measurements.scrollY + measurements.rootHeight)
            ) {
                break;
            }
        }

        const style = {top, left};
        this.setState({style, position: position!});
    }

    private toggle = (e: Event) => {
        const {open} = this.state;
        const {showTrigger, hideTrigger, showDelay, hideDelay} = this.props;
        const {type} = e;
        const delay = open ? hideDelay : showDelay;

        const next = () => {
            if (
                (open && hideTrigger!.indexOf(type) !== -1) ||
                (!open && showTrigger!.indexOf(type) !== -1)
            ) {
                this.setState({open: !open}, this.setStylesDebounce);
            }
        };

        window.clearTimeout(this.timeout!);
        if (delay) {
            this.timeout = window.setTimeout(next, delay);
        } else {
            next();
        }
    }

    private stopEvent = (e: React.SyntheticEvent<HTMLElement> | Event) => {
        if (!this.props.disableGlobalEvents) {
            this.preventHide = this.state.open;
        }
    }
}
