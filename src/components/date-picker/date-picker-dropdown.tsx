import * as React from 'react';
import {getMonthNames, getDayNames, getMonthFromOffset, getDaysInMonth} from './date-picker-helpers';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';

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
        const date = new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), parseInt(day));
        this.date = date;
        this.props.onChange(this.date);
    }

    @computed
    get dayArray (): Array<number> {
        const dayArray: Array<number> = [];
        for (let i = 1; i < getDaysInMonth(this.date); i++) {
            dayArray.push(i);
        }

        return dayArray;
    }

    @computed
    get monthName (): string {
        return monthNames[this.date.getUTCMonth()];
    }

    @computed
    get year (): number {
        return this.date.getUTCFullYear();
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), 1), 1);
        this.setDateTo(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const previousMonth: Date = getMonthFromOffset(new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), 1), -1);
        this.setDateTo(previousMonth);
    };

    onClick: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLElement;
        this.setDayTo(eventTarget.textContent!)
    };

    render() {
        return (
            <div data-automation-id="DATE_PICKER_DROPDOWN">
                <span onMouseDown={this.goToPrevMonth} data-automation-id="PREV_MONTH_BUTTON">Prev</span>
                <span data-automation-id="MONTH_NAME">{this.monthName}</span> <span data-automation-id="YEAR">{this.year}</span>
                <span onMouseDown={this.goToNextMonth} data-automation-id="NEXT_MONTH_BUTTON">Next</span>
                <p>{getDayNames().map(name => <span data-automation-id={'DAY_NAME_' + name}>{name}</span>)}</p>
                <p>{this.dayArray.map(day => <span onMouseDown={this.onClick} data-automation-id={'DAY_' + day}>{day}</span>)}</p>
            </div>
        );
    }
}
