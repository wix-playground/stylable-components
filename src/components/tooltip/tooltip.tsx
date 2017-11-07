import * as debounce from 'debounce';
import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {warnOnce} from '../../utils';
import {GlobalEvent, GlobalEventProps} from '../global-event';
import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom' |
    'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' |
    'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface TooltipProps {
    children?: React.ReactNode;
    position?: Position;
    id: string;
    open?: boolean;
    showTrigger?: string;
    hideTrigger?: string;
    showDelay?: number;
    hideDelay?: number;
    disableGlobalEvents?: boolean;
    onTop?: boolean;
}

export interface TooltipState {
    style?: React.CSSProperties;
    open: boolean;
}

const DATA_FOR_ATTRIBUTE = 'data-tooltip-for';

function hasPosition(position: Position, ...candidates: string[]): boolean {
    return candidates.some(item => item === position);
}

@stylable(styles)
class StyledTooltip extends React.Component<TooltipProps, TooltipState> {
    public static defaultProps = {
        open: false,
        position: 'top',
        showTrigger: 'mouseenter',
        hideTrigger: 'mouseleave',
        showDelay: 0,
        hideDelay: 0,
        onTop: false
    };

    private target: HTMLElement | null = null;
    private events: string[] = [];
    private timeout?: number;
    private onWindowResize = debounce(() => {
        if (this.state.open) {
            this.setStyles();
        }
    }, 500);

    public constructor(props: TooltipProps) {
        super();
        this.state = {
            style: undefined,
            open: props.open!
        };
    }

    public render() {
        const {children, position, disableGlobalEvents, onTop} = this.props;
        const {style, open} = this.state;

        if (!style) {
            return null;
        }
        const globalEvents: GlobalEventProps = {
            resize: this.onWindowResize
        };
        if (!disableGlobalEvents) {
            globalEvents.mousedown = globalEvents.touchstart = this.hide;
        }

        return (
            <div
                data-automation-id="TOOLTIP"
                className={`root ${position}`}
                style={style}
                style-state={{open, onTop}}
            >
                <GlobalEvent {...globalEvents}/>
                <div className="tooltip">
                    {children}
                    <svg className="tail" height="5" width="10" data-automation-id="TOOLTIP_TAIL">
                        <polygon points="0,0 10,0 5,5"/>
                    </svg>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.setTarget();
        this.bindEvents();
        this.setStyles();
    }
    public componentWillUnmount() {
        window.clearTimeout(this.timeout!);
        this.unbindEvents();
        this.onWindowResize.clear();
    }
    public componentWillReceiveProps(props: TooltipProps) {
        if (props.id !== this.props.id) {
            this.unbindEvents();
            this.setTarget();
            this.bindEvents();
        }
        if (this.state.open) {
            this.setStyles();
        }
    }

    private setTarget() {
        this.target = document.querySelector(`[${DATA_FOR_ATTRIBUTE}=${this.props.id}]`) as HTMLElement;
        if (!this.target) {
            warnOnce(`There is no anchor with "${DATA_FOR_ATTRIBUTE}=%s"`, this.props.id);
        }
    }

    private bindEvents() {
        if (!this.target) {
            return;
        }
        const {showTrigger, hideTrigger} = this.props;
        this.events = showTrigger!.split(',')
            .concat(hideTrigger!.split(','))
            .filter((val, index, arr) => arr.indexOf(val) === index);
        this.events.forEach(event => {
            this.target!.addEventListener(event, this.toggle);
        });
    }
    private unbindEvents() {
        if (!this.target) {
            return;
        }
        this.events.forEach(event => {
            this.target!.removeEventListener(event, this.toggle);
        });
    }
    private setStyles() {
        if (!this.target) {
            return;
        }
        const {position} = this.props;
        const rect = this.target!.getBoundingClientRect();
        let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop);
        let left = rect.left + (window.pageXOffset || document.documentElement.scrollLeft);
        if (hasPosition(position!, 'bottom', 'bottomLeft', 'bottomRight', 'leftBottom', 'rightBottom')) {
            top += rect.height;
        }
        if (hasPosition(position!, 'left', 'right')) {
            top += rect.height / 2;
        }
        if (hasPosition(position!, 'right', 'topRight', 'bottomRight', 'rightTop', 'rightBottom')) {
            left += rect.width;
        }
        if (hasPosition(position!, 'top', 'bottom')) {
            left += rect.width / 2;
        }
        const style = {top, left};
        this.setState({style});
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
                this.setState({open: !open});
            }
        };

        window.clearTimeout(this.timeout!);
        if (delay) {
            this.timeout = window.setTimeout(next, delay);
        } else {
            next();
        }
    }

    private hide = () => this.setState({open: false});

}

export class Tooltip extends React.Component<TooltipProps> {
    private tooltip: React.ReactNode;
    public getTooltip() {
        return this.tooltip;
    }
    public render() {
        return (
            <Portal>
                <StyledTooltip
                    ref={tooltip => this.tooltip = tooltip}
                    {...this.props}
                />
            </Portal>
        );
    }
}
