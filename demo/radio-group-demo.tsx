import React = require('react');
import {RadioGroup, RadioButton} from '../src/';


export class RadioGroupDemo extends React.Component<{}, {}> {
    myValue: string;

    render() {
        return (
            <RadioGroup value={this.myValue} onChange={(value:string) => this.myValue = value}>
                <RadioButton value = "This way!" />
                <RadioButton value = "No, that way!"/>
            </RadioGroup>
        );
    }
}
