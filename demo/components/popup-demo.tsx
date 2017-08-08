import React = require('react');
import {CSSProperties} from 'react';
import { HorizontalPosition, Popup, RadioButton, RadioGroup, VerticalPosition } from '../../src/';

export interface DemoState {
    div: any;
    isOpen: boolean;
    pVertical: VerticalPosition;
    pHorizontal: HorizontalPosition;
    aVertical: VerticalPosition;
    aHorizontal: HorizontalPosition;
}

export class PopupDemo extends React.Component<{}, DemoState> {
    constructor() {
        super();
        this.state = {
            div: undefined,
            isOpen: false,
            pVertical: 'top',
            pHorizontal: 'left',
            aVertical: 'bottom',
            aHorizontal: 'left'
        };
    }

    public render() {
        const divDim: CSSProperties = {marginLeft: '100px', width: '100px', border: '1px solid blue'};
        const flexStyle: CSSProperties = {padding: '10px'};
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
                    popupPosition={{vertical: this.state.pVertical, horizontal: this.state.pHorizontal}}
                    syncWidth={false}
                    anchorPosition={{vertical: this.state.aVertical, horizontal: this.state.aHorizontal}}
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

    private updateState = (ref: any) => {
        this.setState({div: ref, isOpen: this.state.isOpen});
    }

    private changePVertical = (e: any) => {
        this.setState({div: this.state.div, pVertical: e});
    }

    private changePHorizontal = (e: any) => {
        this.setState({div: this.state.div, pHorizontal: e});
    }

    private changeAVertical = (e: any) => {
        this.setState({div: this.state.div, aVertical: e});
    }

    private changeAHorizontal = (e: any) => {
        this.setState({div: this.state.div, aHorizontal: e});
    }

}
