import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';

export interface DatePickerDemoState {
    value: Date;
    startingDay?: number;
}

export class DatePickerDemo extends React.Component<DatePickerProps, DatePickerDemoState> {
    public state: DatePickerDemoState = {
        value: this.props.value ? this.props.value : new Date()
    };

    public render() {
        return (
            <div>
                <h2>Standard DatePicker</h2>
                <span data-automation-id="CURRENT_DATE">{this.state.value.toDateString()}</span>
                <DatePicker
                    {...this.props}
                    data-automation-id="BASIC_DATEPICKER"
                    placeholder="mm/dd/yyyy"
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange = (updatedDate: Date): void => {
        this.setState({ value: updatedDate });
    }
}

export class DatePickerDemoStartingDay extends React.Component<DatePickerProps, Partial<DatePickerDemoState>> {
    public state: DatePickerDemoState = {
        value: this.props.value ? this.props.value : new Date(),
        startingDay: 0
    };

    public render() {
        return (
            <div>
                <h2>DatePicker with variable week (and showDropdown set to true)</h2>
                <span>
                    <select
                        value={this.state.startingDay}
                        onChange={this.setStartingDay}
                    >
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </span>
                <span data-automation-id="CURRENT_DATE">{this.state.value!.toDateString()}</span>
                <DatePicker
                    placeholder="mm/dd/yyyy"
                    startingDay={this.state.startingDay!}
                    showDropdownOnInit={true}
                    value={this.state.value!}
                    onChange={this.onChange}
                    {...this.props}
                />
            </div>
        );
    }

    private setStartingDay = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.setState({ startingDay: parseInt(target.value, 10) });
    }

    private onChange = (updatedDate: Date): void => {
        this.setState({ value: updatedDate });
    }
}
