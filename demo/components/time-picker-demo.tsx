import * as React from 'react';
import {TimePicker} from '../../src';

export class TimePickerDemo extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            now: new Date(),
            value1: '00:00:00'
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({now: new Date()});
        }, 1000)
    }
    render() {
        const value = [
            this.state.now.getHours(),
            this.state.now.getMinutes(),
            this.state.now.getSeconds()
        ].join(':')
        return <table>
            <tbody>
                <tr>
                    <th>
                        Current Time
                        <br/>
                        <TimePicker value={value}/>
                    </th>
                    <th>
                        <div>{this.state.value1}</div>
                        <TimePicker
                            value={this.state.value1}
                            onChange={value1 => this.setState({value1})}
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    }
}
