import React = require('react');
import { HorizontalPosition, Popup, PositionPoint, RadioButton, RadioGroup, VerticalPosition } from '../../src/';
import {ChangeEvent} from '../../src/types/events';

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
        const divDim: React.CSSProperties = {marginLeft: '100px', width: '100px'};
        const flexStyle: React.CSSProperties = {padding: '10px'};
        const popupPos: PositionPoint = {
            vertical: this.state.pVertical as VerticalPosition, horizontal: this.state.pHorizontal as HorizontalPosition
        };
        const anchorPos: PositionPoint = {
            vertical: this.state.aVertical as VerticalPosition, horizontal: this.state.aHorizontal as HorizontalPosition
        };
        return (
            <div>
                <button
                    ref={this.updateState}
                    onClick={this.onClick}
                    style={divDim}
                    data-automation-id="POPUP_DEMO_DIV"
                >
                    Click me!
                </button>
                <Popup
                    anchor={this.state.div}
                    popupPosition={popupPos}
                    syncWidth={false}
                    anchorPosition={anchorPos}
                    open={this.state.isOpen}
                >
                    <div style={{backgroundColor: 'black', color: 'white'}}>Hello!</div>
                </Popup>
                <div style={{display: 'flex'}}>
                    <div style={flexStyle}>
                        <h3>Popup position - vertical</h3>
                        <RadioGroup value="top" onChange={this.changePVertical}>
                            <RadioButton value="top"/>
                            <RadioButton value="center"/>
                            <RadioButton value="bottom"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Popup position - horizontal</h3>
                        <RadioGroup value="left" onChange={this.changePHorizontal}>
                            <RadioButton value="left"/>
                            <RadioButton value="center"/>
                            <RadioButton value="right"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Anchor position - vertical</h3>
                        <RadioGroup value="bottom" onChange={this.changeAVertical}>
                            <RadioButton value="top"/>
                            <RadioButton value="center"/>
                            <RadioButton value="bottom"/>
                        </RadioGroup>
                    </div>
                    <div style={flexStyle}>
                        <h3>Anchor position - horizontal</h3>
                        <RadioGroup value="left" onChange={this.changeAHorizontal}>
                            <RadioButton value="left"/>
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

    private changePVertical = (e: ChangeEvent<string>) => {
        this.setState({div: this.state.div, pVertical: e.value as VerticalPosition});
    }

    private changePHorizontal = (e: ChangeEvent<string>) => {
        this.setState({div: this.state.div, pHorizontal: e.value as HorizontalPosition});
    }

    private changeAVertical = (e: ChangeEvent<string>) => {
        this.setState({div: this.state.div, aVertical: e.value as VerticalPosition});
    }

    private changeAHorizontal = (e: ChangeEvent<string>) => {
        this.setState({div: this.state.div, aHorizontal: e.value as HorizontalPosition});
    }

}
