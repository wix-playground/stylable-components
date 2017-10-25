import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom';

export interface TooltipProps {
    children?: React.ReactNode;
    position?: Position;
    id: string;
    open?: boolean;
    showTrigger?: string;
    hideTrigger?: string;
    showDelay?: number;
    hideDelay?: number;
}

export interface TooltipState {
    style?: React.CSSProperties;
    open: boolean;
}

@stylable(styles)
class StyledTooltip extends React.Component<TooltipProps, TooltipState> {
    public static defaultProps = {
        open: false,
        position: 'top',
        showTrigger: 'mouseenter',
        hideTrigger: 'mouseleave',
        showDelay: 0,
        hideDelay: 0
    };
    public state = {
        style: undefined,
        open: false
    };
    private target: HTMLElement | null = null;
    private events: string[] = [];
    private timeout?: number;

    public componentDidMount() {
        this.setTarget();
        this.bindEvents();
        this.setStyles();
    }
    public componentWillUnmount() {
        window.clearTimeout(this.timeout!);
        this.unbindEvents();
    }
    public componentWillReceiveProps(props: TooltipProps) {
        this.unbindEvents();
        this.setTarget();
        this.bindEvents();
        this.setStyles();
    }

    public render() {
        const {children, position} = this.props;
        const {style, open} = this.state;

        if (!style) {
            return null;
        }

        return (
            <div
                data-automation-id="TOOLTIP"
                className={`root ${position}`}
                style={style}
                style-state={{open}}
            >
                <div className="tooltip">
                    {children}
                    <svg className="tail" height="5" width="10">
                        <polygon points="0,0 10,0 5,5"/>
                    </svg>
                </div>
            </div>
        );
    }

    private setTarget() {
        this.target = document.querySelector(`[data-tooltip-for=${this.props.id}]`) as HTMLElement;
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
        const {position, open} = this.props;
        const rect = this.target!.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const style = {
            top: position === 'bottom' ? (top + rect.height) : top,
            left: position === 'right' ? (left + rect.width) : left,
            marginLeft: (position === 'top' || position === 'bottom') ? (rect.width / 2) : undefined,
            marginTop: (position === 'left' || position === 'right') ? (rect.height / 2) : undefined
        };
        this.setState({style, open: open!});
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
