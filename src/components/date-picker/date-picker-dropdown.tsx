import * as React from 'react';
import {getMonthNames, getDayNames} from './date-picker-helpers';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {ReactElement} from "react";

export interface DatePickerDropdownProps {
    date: Date;
    onChange (date: Date): void;
}

export class DatePickerDropdown extends React.Component<DatePickerDropdownProps, {}>{
    generateDayArray (date: Date): Array<number> {
        const dayArray: Array<number> = [];
        for (let i = 1; i < this.getDaysInMonth(date); i++) {
            dayArray.push(i);
        }

        return dayArray;
    }

    getDaysInMonth (date: Date): number {
        // Important: the '0' in the day category "rolls back" the daysArray to the start of the previous month
        // so we add a month to the daysArray in order to get the number of days for the intended month
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    onClick: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        const eventTarget = event.target as HTMLElement;
        this.onChange(eventTarget.textContent!)
    };

    onChange (day: string): void {
        const date = this.props.date;
        date.setDate(parseInt(day));
        this.props.onChange(date);
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        const date = this.props.date;
    };

    goToNextMonth (): void {
        const nextMonth = getMonthFromOffset(new Date(this.state.displayedYear, this.state.displayedMonth, 1), 1);
        this.state.displayedMonth = nextMonth.getMonth();
        this.setFocusedIndex(this.getNumOfPreviousDays(nextMonth), getDaysInMonth(nextMonth));
    }

    render() {
        return (
            <div data-automation-id="DATE_PICKER_DROPDOWN">
                <p data-automation-id="MONTH_NAME">{getMonthNames()[this.props.date.getMonth()]}</p>
                <span onMouseDown={this.goToNextMonth} data-automation-id="NEXT_MONTH_BUTTON">Next Month</span>
                {getDayNames().map(name => <span data-automation-id={'DAY_NAME_' + name}>{name}</span>)}
                {this.generateDayArray(this.props.date).map(day => <span onMouseDown={this.onClick} data-automation-id={'DAY_' + day}>{day}</span>)}
            </div>
        );
    }
}
