import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom';

export interface TooltipProps {
    children?: React.ReactNode;
    position?: Position;
    id: string;
    openTrigger?: string;
    closeTrigger?: string;
}

export interface TooltipState {
    style?: React.CSSProperties;
    open: boolean;
}

@stylable(styles)
class TooltipInner extends React.Component<TooltipProps, TooltipState> {
    static defaultProps = {
        position: 'top',
        openTrigger: 'mouseenter',
        closeTrigger: 'mouseleave'
    }
    state = {
        style: undefined,
        open: false
    }
    private target: HTMLElement | null = null;
    private events: string[] = [];

    public componentDidMount() {
        this.setTarget();
        this.bindEvents();
        this.setStyles();
    }
    public componentWillUnmount() {
        this.unbindEvents();
    }
    public componentWillReceiveProps(props: TooltipProps) {
        this.unbindEvents();
        this.setTarget();
        this.bindEvents();
        this.setStyles();
    }

    private setTarget() {
        this.target = document.querySelector(`[data-tooltip-for=${this.props.id}]`) as HTMLElement;
    }

    private bindEvents() {
        if (!this.target) {
            return;
        }
        const {openTrigger, closeTrigger} = this.props;
        this.events = openTrigger!.split(',')
            .concat(closeTrigger!.split(','))
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
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const style = {
            top: position === 'bottom' ? (top + rect.height) : top,
            left: position === 'right' ? (left + rect.width) : left,
            marginLeft: (position === 'top' || position === 'bottom') ? (rect.width / 2) : undefined,
            marginTop: (position === 'left' || position === 'right') ? (rect.height / 2) : undefined,
        }
        this.setState({style});
    }

    private toggle = (e: Event) => {
        const {open} = this.state;
        const {openTrigger, closeTrigger} = this.props;
        if (
            (open && closeTrigger!.indexOf(e.type) !== -1) ||
            (!open && openTrigger!.indexOf(e.type) !== -1)
        ) {
            this.setState({open: !open});
        }
    }

    public render() {
        const {children, position} = this.props;
        const {style, open} = this.state;

        if (!style) {
            return null;
        }

        return (
            <div
                className={`root ${position}`}
                style={style}
                style-state={{open}}
            >
                <div className='tooltip'>
                    {children}
                    <svg className="tail" height="5" width="10">
                        <polygon points="0,0 10,0 5,5"/>
                    </svg>
                </div>
            </div>
        );
    }
}


export class Tooltip extends React.Component<TooltipProps> {
    render() {
        return (
            <Portal>
                <TooltipInner {...this.props}/>
            </Portal>
        );
    }
}
