import React = require('react');
import {Popup} from '../../src/';

export class PopupDemo extends React.Component {
    render() {
        return (
            <div ref="anchor" data-automation-id="POPUP_DEMO_DIV">Anchor
                {/*<Popup anchor={this.refs.anchor}>*/}
                    {/*<span>Popup Header</span>*/}
                    {/*<div>Popup Body</div>*/}
                {/*</Popup>*/}
            </div>
        );
    }
}
