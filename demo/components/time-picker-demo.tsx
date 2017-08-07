import * as React from 'react';
import {TimePicker} from '../../src';

export class TimePickerDemo extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            now: new Date(),
            value1: '00:00',
            value2: '00:00',
            value3: null,
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({now: new Date()});
        }, 1000)
    }
    render() {
        const currentTime = [
            this.state.now.getHours(),
            this.state.now.getMinutes()
        ].join(':')
        return <div>

            <h3>Current time</h3>
            <div>
                <TimePicker value={currentTime}/>
                <span style={{marginLeft: 20}}>{currentTime}</span>
            </div>

            <h3>Controlled 24 time format</h3>
            <div>
                <TimePicker
                    value={this.state.value1}
                    use12Hours={false}
                    onChange={value1 => this.setState({value1})}
                />
                <span style={{marginLeft: 20}}>{this.state.value1}</span>
            </div>

            <h3>Controlled 12 time format</h3>
            <div>
                <TimePicker
                    use12Hours
                    value={this.state.value1}
                    onChange={value1 => this.setState({value1})}
                />
                <span style={{marginLeft: 20}}>{this.state.value1}</span>
            </div>

            <h3>Placeholder</h3>
            <div>
                <TimePicker
                    placeholder='Pick the time'
                    value={this.state.value3}
                    onChange={value3 => this.setState({value3})}
                />
                <span style={{marginLeft: 20}}>{this.state.value3}</span>
            </div>

            <h3>No value</h3>
            <div>
                <TimePicker/>
                <span style={{marginLeft: 20}}>{this.state.value3}</span>
            </div>

        </div>
    }
}
