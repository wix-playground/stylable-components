import * as debounce from 'debounce';
import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {GlobalEvent} from '../global-event';
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
    showTrigger?: string | string[];
    hideTrigger?: string | string[];
    showDelay?: number;
    hideDelay?: number;
    disableAutoPosition?: boolean;
    disableGlobalEvents?: boolean;
}

export interface TooltipState {
    style?: React.CSSProperties;
    open: boolean;
    position: Position;
}

function hasPosition(position: Position, ...candidates: string[]): boolean {
    return candidates.some(item => item === position);
}

const positions: Position[] = [
    'top', 'topLeft', 'topRight',
    'right', 'rightTop', 'rightBottom',
    'bottom', 'bottomRight', 'bottomLeft',
    'left', 'leftBottom', 'leftTop'
];

@stylable(styles)
class StyledTooltip extends React.Component<TooltipProps, TooltipState> {
    public static defaultProps = {
        open: false,
        position: 'top',
        showTrigger: 'mouseenter',
        hideTrigger: 'mouseleave',
        showDelay: 0,
        hideDelay: 0,
        disableAutoPosition: false,
        disableGlobalEvents: false
    };

    private target: HTMLElement | null = null;
    private tooltip: HTMLElement | null = null;
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
        const {children, disableGlobalEvents} = this.props;
        const {style, open, position} = this.state;
        const globalEvents: any = {
            resize: this.setStylesDebounce,
            scroll: this.setStylesDebounce
        };
        if (!disableGlobalEvents) {
            globalEvents.mousedown = globalEvents.touchstart = this.hide;
        }

        return (
            <div
                data-automation-id="TOOLTIP"
                className={`root ${position}`}
                style={style}
                style-state={{open, unplaced: !style}}
            >
                <GlobalEvent {...globalEvents}/>
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
        this.setStyles();
    }

    private setTarget() {
        this.target = document.querySelector(`[data-tooltip-for=${this.props.id}]`) as HTMLElement;
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
        const rect = this.target!.getBoundingClientRect();
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const rectTop = rect.top + scrollY;
        const rectLeft = rect.left + scrollX;
        const tipWidth = this.tooltip!.offsetWidth;
        const tipHeight = this.tooltip!.offsetHeight;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const index = positions.indexOf(this.props.position!);
        const orderedPositions = this.props.disableAutoPosition ?
            [this.props.position!] :
            positions.slice(index).concat(positions.slice(0, index), this.state.position);

        let top: number = 0;
        let left: number = 0;
        let position: Position;
        for (position of orderedPositions) {
            top = rectTop;
            left = rectLeft;
            if (hasPosition(position, 'bottom', 'bottomLeft', 'bottomRight', 'leftBottom', 'rightBottom')) {
                top += rect.height;
            }
            if (hasPosition(position, 'left', 'right')) {
                top += rect.height / 2 - tipHeight / 2;
            }
            if (hasPosition(position, 'right', 'topRight', 'bottomRight', 'rightTop', 'rightBottom')) {
                left += rect.width;
            }
            if (hasPosition(position, 'top', 'bottom')) {
                left += rect.width / 2 - tipWidth / 2;
            }
            if (hasPosition(position, 'top', 'topLeft', 'topRight', 'leftBottom', 'rightBottom')) {
                top -= tipHeight;
            }
            if (hasPosition(position, 'left', 'topRight', 'bottomRight', 'leftTop', 'leftBottom')) {
                left -= tipWidth;
            }
            if (
                (left >= scrollX) && (top >= scrollY) &&
                (left + tipWidth <= scrollX + winWidth) &&
                (top + tipHeight <= scrollY + winHeight)
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
                this.setState({open: !open}, this.setStyles);
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
