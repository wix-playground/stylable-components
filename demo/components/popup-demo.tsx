import React = require('react');
import {Popup} from '../../src/';

export interface DemoState {
    div: HTMLElement | null;
    isOpen: boolean;
}

export class PopupDemo extends React.Component<{}, DemoState> {
    public state = {div: null, isOpen: false};

    public render() {
        const divDim: React.CSSProperties = {width: '50px', border: '1px solid blue'};
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

    private updateState = (ref: HTMLElement | null) => {
        this.setState({div: ref, isOpen: this.state.isOpen});
    }

}
