import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom';

export interface TooltipProps {
    children?: React.ReactNode;
    position?: Position;
    id: string;
}

export interface TooltipState {
    style?: React.CSSProperties
}

@stylable(styles)
class TooltipInner extends React.Component<TooltipProps, TooltipState> {
    static defaultProps = {
        position: 'top'
    }
    state = {
        style: undefined
    }
    public componentDidMount() {
        const {id} = this.props;
        const target = document.querySelector(`[data-id=${id}]`);
        if (!target) {
                return;
        }
        const elemRect = target.getBoundingClientRect();
        //const bodyRect = document.body.getBoundingClientRect()
        const style = {
            top: elemRect.top + window.scrollY,
            left: elemRect.left + window.scrollX,
            width: elemRect.width,
            height: elemRect.height
        }
        this.setState({style});
    }
    render() {
        const {children, position} = this.props;
        const {style} = this.state;
        console.log(style);

        return (
            <div style={style}>
                <div className={`tooltip ${position}`}>
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
