import * as React from 'react';
import { DatePicker, DatePickerOptions } from '../../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";

@observer
export class DatePickerDemo extends React.Component<{}, {}> {
    variableDayOptions: DatePickerOptions = new DatePickerOptions();

    @action setStartingDay = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.variableDayOptions.startingDay = parseInt(target.value);
    };

    render () {
        return (
            <div>
                <h2>Standard DatePicker</h2>
                <DatePicker placeholder="mm/dd/yyyy" />

                <h2>DatePicker with variable week (and showDropdown set to true)</h2>
                <span>
                    <select value={this.variableDayOptions.startingDay} onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => this.setStartingDay(event)}>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </span>
                <DatePicker placeholder="mm/dd/yyyy" options={this.variableDayOptions} />
            </div>);
    }
}
