import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ChangeEvent, RadioButton, RadioGroup} from '../../src';
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
                <div>
                    <h3>Children radio group</h3>
                    <RadioGroup
                        data-automation-id="GROUP_1_GROUP"
                        onChange={this.onChange}
                        name="demo"
                        className="rg"
                        value={this.state.myValue1}
                    >
                        <RadioButton value="This way!">
                            <span className="label">Default Radio</span>
                        </RadioButton>
                        <RadioButton value="No, that way!">
                            <span className="label">No, that way!</span>
                        </RadioButton>
                        <RadioButton value="But not here" disabled>
                            <span className="label">But not here</span>
                        </RadioButton>
                        <RadioButton value="Start here" disabled>
                            <span className="label">Start here</span>
                        </RadioButton>
                    </RadioGroup>
                    <br/>
                    <span data-automation-id="GROUP_1_RESULT">Value: {this.state.myValue1}</span>
                </div>
                <div data-automation-id="GROUP_2">
                    <h3>Data source radio group</h3>
                    <RadioGroup
                        onChange={this.onChange2}
                        name="name"
                        className="rg"
                        value={this.state.myValue2}
                        dataSource={[
                            {value: 'Default Radio', labelText: 'Default Radio'},
                            {value: 'Checked Radio', labelText: 'Checked Radio'},
                            {
                                value: 'Disabled Radio',
                                disabled: true,
                                labelText: 'Disabled Radio'
                            }
                        ]}
                    />
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue2}</span>
                </div>
            </div>
        );
    }
    private onChange = (e: ChangeEvent<string>) => {
        this.setState({myValue1: e.value});
    }

    private onChange2 = (e: ChangeEvent<string>) => {
        this.setState({myValue2: e.value});
    }
}
