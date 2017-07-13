import React = require('react');
import {RadioGroup, RadioButton} from '../src/';


export class RadioGroupDemo extends React.Component<{}, {}> {
    myValue: string;

    onChange = (value: string) => {
        this.myValue = value;
    };

    render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <RadioGroup onChange={this.onChange}>
                    <RadioButton value = "This way!" />
                    <RadioButton value = "No, that way!"/>
                </RadioGroup>
                <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue}</span>
            </div>
        );
    }
}
