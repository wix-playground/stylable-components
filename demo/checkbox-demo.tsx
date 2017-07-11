import React = require('react');

export const demoCheckBoxText = 'covfefe';

export class CheckBoxDemo extends React.Component {

    render() {
        return (
            <div>
                <CheckBox value={this.myValue} onChange={value => this.myValue = value} boxIcon={box} tickIcon={tick} />
            </div>
        )
    }

}
