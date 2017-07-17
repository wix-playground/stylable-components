import React = require('react');
import {RadioGroup, RadioButton} from '../../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';


@observer
export class RadioGroupDemo extends React.Component<{}, {}> {
    @observable myValue: string = '';

    @action
    onChange = (value: string) => {
        this.myValue = value;
    };

    render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <RadioGroup onChange={this.onChange} data={["This way!", "No, that way!"]} />
                <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue}</span>
            </div>
        );
    }
}
