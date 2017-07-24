import React = require('react');
import {Popup} from '../../src/';

export class PopupDemo extends React.Component {
    render() {
        let div;
        return (
            <div ref={(ref) => div = ref} data-automation-id="POPUP_DEMO_DIV">Anchor
                <Popup anchor={div} open={true}>
                    <span>Popup Header</span>
                    <div>Popup Body</div>
                </Popup>
            </div>
        );
    }
}
