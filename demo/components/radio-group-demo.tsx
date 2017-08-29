import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {RadioButton, RadioGroup} from '../../src';
import {ChangeEvent} from '../../src/types/events';
import {noop} from '../../src/utils';
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
                        <RadioButton value="This way!" onChange={noop}/>
                        <RadioButton value="No, that way!" onChange={noop}/>
                        <RadioButton value="But not here" disabled={true} onChange={noop}/>
                        <RadioButton value="Start here" checked={true} disabled={true} onChange={noop}/>
                    </RadioGroup>
                    <br/>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.state.myValue1}</span>
                </div>
                <div data-automation-id="GROUP_2">
                    <h3>Data source radio group</h3>
                    <RadioGroup
                        onChange={this.onChange2}
                        labelLocation="left"
                        name="name"
                        className="rg"
                        dataSource={[
                            {value: 'Default', onChange: noop},
                            {value: 'Checked', checked: true, onChange: noop},
                            {value: 'Disabled', disabled: true, onChange: noop}
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
