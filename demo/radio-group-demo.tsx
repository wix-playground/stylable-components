import React = require('react');
import {RadioGroup, RadioButton} from '../src/';


export class RadioGroupDemo extends React.Component<{}, {}> {
    myValue: string;

    render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <RadioGroup>
                    {/*<RadioGroup value={this.myValue} onChange={(value:string) => this.myValue = value}>*/}
                    <RadioButton value = "This way!" />
                    <RadioButton value = "No, that way!"/>
                </RadioGroup>
                <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue}</span>
            </div>
        );
    }
}
