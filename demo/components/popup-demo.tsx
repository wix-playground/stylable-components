import React = require('react');
import {CSSProperties} from 'react';
import {Popup} from '../../src/';

export interface DemoState {
    div: any;
    isOpen: boolean;
}

export class PopupDemo extends React.Component<{}, DemoState> {
    constructor() {
        super();
        this.state = {div: undefined, isOpen: false};
    }

    public render() {
        const divDim: CSSProperties = {width: '50px', border: '1px solid blue'};
        return (
            <div>
                <div
                    ref={this.updateState}
                    onClick={this.onClick}
                    style={divDim}
                    data-automation-id="POPUP_DEMO_DIV"
                >
                    Anchor
                </div>
                <Popup
                    anchor={this.state.div}
                    popupPosition={{vertical: 'bottom', horizontal: 'left'}}
                    syncWidth={false}
                    anchorPosition={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.isOpen}
                >
                    <div style={{background: 'green', color: 'white'}}>
                        <span>Popup Header</span>
                        <div>Popup Body</div>
                    </div>
                </Popup>
            </div>
        );
    }

    private onClick = () => {
        this.setState({div: this.state.div, isOpen: !this.state.isOpen});
    }

    private updateState = (ref: any) => {
        this.setState({div: ref, isOpen: this.state.isOpen});
    }

}
