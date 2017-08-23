import React = require('react');
import {CSSProperties} from 'react';
import { HorizontalPosition, Popup, PositionPoint, RadioButton, RadioGroup, VerticalPosition } from '../../src/';

export interface DemoState {
    div: HTMLElement | null;
    isOpen: boolean;
    pVertical: string;
    pHorizontal: string;
    aVertical: string;
    aHorizontal: string;
}

export class PopupDemo extends React.Component<{}, DemoState> {
    public state = {
        div: null,
        isOpen: false,
        pVertical: 'top',
        pHorizontal: 'left',
        aVertical: 'bottom',
        aHorizontal: 'left'
    };

    public render() {
        const divDim: CSSProperties = {marginLeft: '100px', width: '100px', border: '1px solid blue'};
        const flexStyle: CSSProperties = {padding: '10px'};
        const popupPos: PositionPoint = {
            vertical: this.state.pVertical as VerticalPosition, horizontal: this.state.pHorizontal as HorizontalPosition
        };
        const anchorPos: PositionPoint = {
            vertical: this.state.aVertical as VerticalPosition, horizontal: this.state.aHorizontal as HorizontalPosition
        };
        return (
            <div>
                <div
                    ref={this.updateState}
                    onClick={this.onClick}
                    style={divDim}
                    data-automation-id="POPUP_DEMO_DIV"
                >
                    Click me!
                </div>
                <Popup
                    anchor={this.state.div}
                    popupPosition={popupPos}
                    syncWidth={false}
                    anchorPosition={anchorPos}
                    open={this.state.isOpen}
                >
                    <div style={{background: 'green', color: 'white'}}>
                        <span>Popup Header</span>
                        <div>Popup Body</div>
                    </div>
                </Popup>
                <div style={{display: 'flex'}}>
                    <div style={flexStyle}>
                        <h3>Popup position - vertical</h3>
                        <RadioGroup onChange={this.changePVertical}>
                            <RadioButton checked value="top"/>
                            <RadioButton value="center"/>
                            <RadioButton value="bottom"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Popup position - horizontal</h3>
                        <RadioGroup onChange={this.changePHorizontal}>
                            <RadioButton checked value="left"/>
                            <RadioButton value="center"/>
                            <RadioButton value="right"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Anchor position - vertical</h3>
                        <RadioGroup onChange={this.changeAVertical}>
                            <RadioButton value="top"/>
                            <RadioButton value="center"/>
                            <RadioButton checked value="bottom"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Anchor position - horizontal</h3>
                        <RadioGroup onChange={this.changeAHorizontal}>
                            <RadioButton checked value="left"/>
                            <RadioButton value="center"/>
                            <RadioButton value="right"/>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        );
    }

    private onClick = () => {
        this.setState({div: this.state.div, isOpen: !this.state.isOpen});
    }

    private updateState = (ref: HTMLElement | null) => {
        this.setState({div: ref, isOpen: this.state.isOpen});
    }

    private changePVertical = (e: string) => {
        this.setState({div: this.state.div, pVertical: e as VerticalPosition});
    }

    private changePHorizontal = (e: string) => {
        this.setState({div: this.state.div, pHorizontal: e as HorizontalPosition});
    }

    private changeAVertical = (e: string) => {
        this.setState({div: this.state.div, aVertical: e as VerticalPosition});
    }

    private changeAHorizontal = (e: string) => {
        this.setState({div: this.state.div, aHorizontal: e as HorizontalPosition});
    }

}
