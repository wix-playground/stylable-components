import * as React from 'react';
import { DatePicker } from '../../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";

@observer
export class DatePickerDemo extends React.Component<{}, {}> {
    @observable startingDay: number = 0;

    @action setStartingDay = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.startingDay = parseInt(target.value);
    };

    render () {
        return (
            <div>
                <h2>Standard DatePicker</h2>
                <DatePicker placeholder="mm/dd/yyyy" />

                <h2>DatePicker with variable week (and showDropdown set to true)</h2>
                <span>
                    <select value={this.startingDay} onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => this.setStartingDay(event)}>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </span>
                <DatePicker placeholder="mm/dd/yyyy" startingDay={this.startingDay} showDropdownOnInit={true} />
            </div>);
    }
}
