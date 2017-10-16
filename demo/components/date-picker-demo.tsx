import * as React from 'react';
import {DatePicker, DatePickerProps} from '../../src';

export interface DatePickerDemoState {
    value: Date;
    startingDay?: number;
    locale?: string;
}

export class DatePickerDemo extends React.Component<DatePickerProps, Partial<DatePickerDemoState>> {
    public state: DatePickerDemoState = {
        value: this.props.value ? this.props.value : new Date(),
        startingDay: 0,
        locale: 'en-US'
    };

    public render() {
        return (
            <div data-automation-id="DATE_PICKER_DEMO">
                <h2>Try changing which day of the week the calendar starts on!</h2>
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
                <h2>Try changing the locale!</h2>
                <span>
                    <select
                        value={this.state.locale}
                        onChange={this.setLocale}
                    >
                        <option value="en-CA">English</option>
                        <option value="he-IL">עברית</option>
                        <option value="it-IT">Italiano</option>
                    </select>
                </span>
                <span style={{marginBottom: '1em'}} data-automation-id="CURRENT_DATE">
                    {this.state.value!.toDateString()}
                </span>
                <DatePicker
                    data-automation-id="DATE_PICKER"
                    placeholder="mm/dd/yyyy"
                    startingDay={this.state.startingDay!}
                    locale={this.state.locale}
                    value={this.state.value!}
                    onChange={this.onChange}
                    {...this.props}
                />
            </div>
        );
    }

    private setStartingDay = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.setState({startingDay: parseInt(target.value, 10)});
    }

    private setLocale = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.setState({locale: target.value});
    }

    private onChange = (e: {value: Date}): void => {
        this.setState({value: e.value});
    }
}
