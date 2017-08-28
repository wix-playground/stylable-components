import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {RadioButton, RadioChangeEvent, RadioGroup} from '../../src';
import styles from './radio-group-demo.st.css';

@SBComponent(styles)
export class RadioGroupDemo extends React.Component<{}, {}> {
    public state = {
        myValue1: '',
        myValue2: ''
    };

    public render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <div data-automation-id="GROUP_1">
                    <h3>Children radio group</h3>
                    <RadioGroup onChange={this.onChange} name="demo" className="rg">
                        <RadioButton value="This way!"/>
                        <RadioButton value="No, that way!"/>
                        <RadioButton value="But not here" disabled={true} />
                        <RadioButton value="Start here" checked={true} disabled={true} />
                    </RadioGroup>
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue1}</span>
                </div>
                <div data-automation-id="GROUP_2">
                    <h3>Data source radio group</h3>
                    <RadioGroup
                        onChange={this.onChange2}
                        radioLocation="left"
                        name="name"
                        className="rg"
                        dataSource={[
                            {value: 'Default'},
                            {value: 'Checked', checked: true},
                            {value: 'Disabled', disabled: true}
                        ]}
                    />
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue2}</span>
                </div>
            </div>
        );
    }
    private onChange = (e: RadioChangeEvent) => {
        this.setState({myValue1: e.value});
    }

    private onChange2 = (e: RadioChangeEvent) => {
        this.setState({myValue2: e.value});
    }
}
