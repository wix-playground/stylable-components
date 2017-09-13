import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {RadioButton, RadioGroup} from '../../src';
import styles from './radio-group-demo.st.css';

@stylable(styles)
export class RadioGroupDemo extends React.Component<{}, {}> {
    public state = {
        myValue1: 'Start here',
        myValue2: 'Checked Radio'
    };

    public render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <div data-automation-id="GROUP_1">
                    <h3>Children radio group</h3>
                    <RadioGroup onChange={this.onChange} name="demo" className="rg" value={this.state.myValue1}>
                        <RadioButton value="This way!"/>
                        <RadioButton value="No, that way!"/>
                        <RadioButton value="But not here" disabled={true}/>
                        <RadioButton value="Start here" disabled={true}/>
                    </RadioGroup>
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue1}</span>
                </div>
                <div data-automation-id="GROUP_2">
                    <h3>Data source radio group</h3>
                    <RadioGroup
                        onChange={this.onChange2}
                        name="name"
                        className="rg"
                        value={this.state.myValue2}
                        dataSource={[
                            {value: 'Default Radio'},
                            {value: 'Checked Radio'},
                            {value: 'Disabled Radio', disabled: true}
                        ]}
                    />
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue2}</span>
                </div>
            </div>
        );
    }
    private onChange = (e: {value: string}) => {
        this.setState({myValue1: e.value});
    }

    private onChange2 = (e: {value: string}) => {
        this.setState({myValue2: e.value});
    }
}
