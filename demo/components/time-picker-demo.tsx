import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {TimePicker} from '../../src';
import {is12TimeFormat} from '../../src/components/time-picker/utils';
import styles from './time-picker-demo.st.css';

@stylable(styles)
export class TimePickerDemo extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            value1: '01:55',
            value2: null
        };
    }
    public render() {
        return (
            <div>
                <div>
                    System time format: <code>{is12TimeFormat ? 'ampm' : '24h'}</code>
                </div>

                <h3>Controlled 24 time format</h3>
                <div data-automation-id="TIME_PICKER_DEMO_CONTROLLED_24">
                    <TimePicker
                        value={this.state.value1}
                        format="24h"
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Controlled 12 time format</h3>
                <div data-automation-id="TIME_PICKER_DEMO_CONTROLLED_AMPM">
                    <TimePicker
                        format="ampm"
                        value={this.state.value1}
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Controlled 12 time format with error</h3>
                <div>
                    <TimePicker
                        error
                        format="ampm"
                        value={this.state.value1}
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Controlled 12 time format with RTL</h3>
                <div>
                    <TimePicker
                        rtl
                        format="ampm"
                        value={this.state.value1}
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Placeholder (read-only)</h3>
                <div>
                    <TimePicker
                        placeholder="Pick the time"
                        value={this.state.value2}
                        onChange={this.createOnChange('value2')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value2}</span>
                </div>

                <h3>No value (read-only)</h3>
                <div>
                    <TimePicker format="ampm"/>
                </div>

                <h3>Disabled</h3>
                <div>
                    <TimePicker value="14:55" disabled/>
                </div>

            </div>
        );
    }
    private createOnChange = (name: string) => (value: string) => this.setState({[name]: value});
}
