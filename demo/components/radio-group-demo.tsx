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
                <RadioGroup onChange={this.onChange}>
                    <RadioButton value="This way!" />
                    <RadioButton value="No, that way!"/>
                    <RadioButton value="But not here" disabled={true} />
                    <RadioButton value="Start here" checked={true} disabled={true} />
                </RadioGroup>
                <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue}</span>
            </div>
        );
    }
}
