import * as React from 'react';
import {TimePicker} from '../../src';

export class TimePickerDemo extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            now: new Date(),
            value1: '14:25',
            value2: null
        };
    }
    public componentDidMount() {
        setInterval(() => {
            //this.setState({now: new Date()});
        }, 1000);
    }
    public render() {
        const currentTime = [
            this.state.now.getHours(),
            this.state.now.getMinutes()
        ].join(':');
        return (
            <div>
                <h3>Current time</h3>
                <div>
                    <TimePicker value={currentTime}/>
                    <span style={{marginLeft: 20}}>{currentTime}</span>
                </div>

                <h3>Controlled 24 time format</h3>
                <div>
                    <TimePicker
                        value={this.state.value1}
                        format="24h"
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Controlled 12 time format</h3>
                <div>
                    <TimePicker
                        format="ampm"
                        value={this.state.value1}
                        onChange={this.createOnChange('value1')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value1}</span>
                </div>

                <h3>Placeholder</h3>
                <div>
                    <TimePicker
                        placeholder="Pick the time"
                        value={this.state.value2}
                        onChange={this.createOnChange('value2')}
                    />
                    <span style={{marginLeft: 20}}>{this.state.value2}</span>
                </div>

                <h3>No value</h3>
                <div>
                    <TimePicker/>
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
