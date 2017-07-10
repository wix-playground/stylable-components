import React = require('react');
import {RadioGroup, RadioButton} from '../src/components/radio-group/radio-group';


export class RadioGroupDemo extends React.Component<any, any> {

    render() {
        return (
            <RadioGroup value={this.myValue} onChange={value => this.myValue = value}>
                <RadioButton value = "This way!" />
                <RadioButton value = "No, that way!"/>
            </RadioGroup>
        );
    }
}
