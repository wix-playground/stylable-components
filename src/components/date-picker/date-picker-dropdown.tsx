import * as React from 'react';
import {getMonthNames, getMonthFromOffset} from './date-picker-helpers';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {DatePickerGrid} from './date-picker-grid';
import {debug} from "util";

export interface DatePickerDropdownProps {
    date: Date;
    onChange (date: Date): void;
}

const monthNames = getMonthNames();

@observer
export class DatePickerDropdown extends React.Component<DatePickerDropdownProps, {}>{
    @observable date: Date = this.props.date;

    @action setDateTo (date: Date) {
        this.date = date;
    }

    @action setDayTo (day: string) {
        const date = new Date(this.date.getFullYear(), this.date.getMonth(), parseInt(day));
        this.props.onChange(date);
    }

    @computed
    get monthName (): string {
        return monthNames[this.date.getMonth()];
    }

    @computed
    get year (): number {
        return this.date.getFullYear();
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 1);
        this.setDateTo(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const previousMonth: Date = getMonthFromOffset(new Date(this.date.getFullYear(), this.date.getMonth(), 1), -1);
        this.setDateTo(previousMonth);
    };

    render() {
        return (
            <div data-automation-id="DATE_PICKER_DROPDOWN">
                <span onMouseDown={this.goToPrevMonth} data-automation-id="PREV_MONTH_BUTTON">Prev</span>
                <span data-automation-id="MONTH_NAME">{this.monthName}</span>&nbsp;<span data-automation-id="YEAR">{this.year}</span>
                <span onMouseDown={this.goToNextMonth} data-automation-id="NEXT_MONTH_BUTTON">Next</span>
                <DatePickerGrid date={this.date} onChange={this.setDayTo.bind(this)} />
            </div>
        );
    }
}
