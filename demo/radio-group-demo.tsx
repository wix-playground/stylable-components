import React = require('react');
import {RadioGroup, RadioButton} from '../src/';

interface DemoState {
    myValue: string;
}

export class RadioGroupDemo extends React.Component<{}, DemoState> {
    constructor() {
        super();
        this.setState({myValue: ''});
    }

    onChange = (value: string) => {
        this.setState({myValue: value});
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
