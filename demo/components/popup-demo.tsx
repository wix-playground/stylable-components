import React = require('react');
import {Popup} from '../../src/';

export class PopupDemo extends React.Component {
    isOpen = false;

    onClick() {
        this.isOpen = true;
    }

    render() {
        let div;
        return (
            <div ref={(ref) => div = ref} onClick={this.onClick} data-automation-id="POPUP_DEMO_DIV">Anchor
                <Popup anchor={div} open={this.isOpen}>
                    <span>Popup Header</span>
                    <div>Popup Body</div>
                </Popup>
            </div>
        );
    }
}
