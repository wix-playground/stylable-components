import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ContextProvider, TimePicker} from '../../src';
import {is12TimeFormat} from '../../src/components/time-picker/utils';
import {ChangeEvent} from '../../src/types/events';
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
            <table cellSpacing={24}>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            System time format: <code>{is12TimeFormat ? 'ampm' : '24h'}</code>
                        </th>
                    </tr>
                    <tr>
                        <th>Controlled 24 time format</th>
                        <th>Controlled 12 time format</th>
                        <th>Controlled 12 time format with error</th>
                        <th>Controlled 12 time format with RTL</th>
                        <th>Placeholder (read-only)</th>
                        <th>No value (read-only)</th>
                        <th>Disabled</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-automation-id="TIME_PICKER_DEMO_CONTROLLED_24">
                            <TimePicker
                                value={this.state.value1}
                                format="24h"
                                onChange={this.createOnChange('value1')}
                            />
                            <span style={{marginLeft: 20}}>{this.state.value1}</span>
                        </td>
                        <td data-automation-id="TIME_PICKER_DEMO_CONTROLLED_AMPM">
                            <TimePicker
                                format="ampm"
                                value={this.state.value1}
                                onChange={this.createOnChange('value1')}
                            />
                            <span style={{marginLeft: 20}}>{this.state.value1}</span>
                        </td>
                        <td>
                            <TimePicker
                                error
                                format="ampm"
                                value={this.state.value1}
                                onChange={this.createOnChange('value1')}
                            />
                            <span style={{marginLeft: 20}}>{this.state.value1}</span>
                        </td>
                        <td>
                            <ContextProvider dir="rtl">
                                <TimePicker
                                    format="ampm"
                                    value={this.state.value1}
                                    onChange={this.createOnChange('value1')}
                                />
                                <span style={{marginRight: 20}}>{this.state.value1}</span>
                            </ContextProvider>
                        </td>
                        <td>
                            <TimePicker
                                placeholder="Pick the time"
                                value={this.state.value2}
                                onChange={this.createOnChange('value2')}
                            />
                            <span style={{marginLeft: 20}}>{this.state.value2}</span>
                        </td>
                        <td>
                            <TimePicker format="ampm"/>
                        </td>
                        <td>
                            <TimePicker value="14:55" disabled/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    private createOnChange = (name: string) => (e: ChangeEvent<string>) => this.setState({[name]: e.value});
}
