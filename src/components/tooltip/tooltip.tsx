import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {Portal} from '../portal';
import styles from './tooltip.st.css';

export type Position = 'top' | 'left' | 'right' | 'bottom';

export interface TooltipProps {
    children?: React.ReactNode;
	position?: Position;
	id: string
}
export interface TooltipState {
    //anchor: HTMLElement | null;
}


@stylable(styles)
class TooltipInner extends React.Component<TooltipProps, TooltipState> {
	render() {
		const {children, position} = this.props;
        return <div
            className={position}
        >
            {children}
            <svg className="tail" height="5" width="10">
                <polygon points="0,0 10,0 5,5"/>
            </svg>
        </div>
	}
}


export class Tooltip extends React.Component<TooltipProps> {
	static defaultProps = {
		position: 'top'
	}
	/*
    public state = {
        anchor: null
    };
    public componentDidMount() {
    	const {id} = this.props;
    	const target = document.querySelector(`[data-id=${id}]`);
    	this.setState({anchor: target as HTMLElement});
    }
    */
	render() {
        return (
            <Portal>
            	<TooltipInner {...this.props}/>
            </Portal>
        );
	}

}
