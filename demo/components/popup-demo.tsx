import React = require('react');
import {Popup} from '../../src/';

export class PopupDemo extends React.Component {
    render() {
        return (
            <div ref="anchor">Anchor
                <Popup anchor={this.refs.anchor}>
                    <span>Popup Header</span>
                    <div>Popup Body</div>
                </Popup>
            </div>
        );
    }
}
