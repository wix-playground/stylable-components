import React = require('react');
import {Popup} from '../../src/';
import {CSSProperties} from "react";

export interface DemoState {
    div: any;
}

export class PopupDemo extends React.Component<{}, DemoState> {
    constructor() {
        super();
        this.state = {div: undefined};
    }

    updateState = (ref: any) => {
        this.setState({div: ref})
    };

    render() {
        const divDim: CSSProperties = {width: '50px', border: '1px solid blue'};
        return (
            <div>
                <div ref={this.updateState} style={divDim} data-automation-id="POPUP_DEMO_DIV">Anchor</div>
                <Popup anchor={this.state.div} popupPosition={{vertical: 'bottom', horizontal: 'left'}} syncWidth={false} anchorPosition={{vertical: 'top', horizontal: 'right'}} open={true}>
                    <div style={{border: '1px solid green'}}>
                        <span>Popup Header</span>
                        <div>Popup Body</div>
                    </div>
                </Popup>
            </div>
        );
    }
}
