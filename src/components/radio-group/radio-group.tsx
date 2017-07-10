import React = require('react');


interface RadioGroupProps {
    value: string;
    onChange: any;
}

export class RadioGroup extends React.Component<RadioGroupProps, {}> {

}

interface RadioButtonProps {
    value: string;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> {
    render() {
        return (<input type="radio" data-automation-id="RADIO_BUTTON"></input>)
    }

}
