import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Popup} from '../popup';
import {TooltipPosition} from './slider-types';
import style from './tooltip.st.css';

export interface TooltipProps {
    children?: React.ReactNode;
    position: TooltipPosition;
    open: boolean;
    active: boolean;
}
export interface TooltipState {
    anchor: HTMLElement | null;
}

@stylable(style)
export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    public state = {
        anchor: null
    };
    public onRef = (el: HTMLElement | null) => {
        this.setState({anchor: el});
    }
    public render() {
        const {children, position, active, open} = this.props;
        return (
            <div ref={this.onRef}>
                <Popup
                    open={open}
                    anchor={this.state.anchor}
                >
                    <div
                        className={`root tooltip ${position}`}
                        style-state={{active}}
                    >
                        {children}
                        <svg className="tail" height="5" width="10">
                            <polygon points="0,0 10,0 5,5"/>
                        </svg>
                    </div>
                </Popup>
            </div>
        );
    }
}
