import React = require('react');

export class RadioGroup extends React.Component<{}, {}> {
    render() {
        return (<div></div>);
    }
}

interface RadioButtonProps {
    value: string;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> {
    render() {
        return (<input type="radio" data-automation-id="RADIO_BUTTON" value={this.props.value}/>)
    }

}
