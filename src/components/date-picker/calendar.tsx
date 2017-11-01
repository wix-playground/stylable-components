import {computed} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {
    changeDayInMonth,
    getDayNames,
    getDaysInMonth,
    getMonthFromOffset,
    getMonthNames,
    getNumOfFollowingDays,
    getNumOfPreviousDays,
    isWeekend,
    noop
} from '../../utils';
import styles from './date-picker.st.css';
import {Day} from './day';

export interface CalendarProps {
    value: Date;
    selectedDate?: Date;
    focusedDate?: Date;
    startingDay?: number;
    highlightSelectedDate?: boolean;
    highlightFocusedDate?: boolean;
    disableWeekends?: boolean;
    onChange(date: Date): void;
    updateDropdownDate(date: Date): void;
}

const monthNames = getMonthNames();

@stylable(styles)
@observer
export class Calendar extends React.Component<CalendarProps, {}> {
    public render() {
        return (
            <div data-automation-id="DATE_PICKER_CALENDAR">
                <div className="dropdownArrowWrapper"><div className="dropdownArrow" /></div>
                <div className="dropdown" data-automation-id="DATE_PICKER_DROPDOWN">
                    <div className="header">
                        <span
                            className="arrowWrapper arrowWrapperPrev"
                            onMouseDown={this.goToPrevMonth}
                            data-automation-id="PREV_MONTH_BUTTON"
                        >
                            <i className="headerArrow headerArrowPrev" />
                        </span>
                        <span className="headerDate">
                            <span data-automation-id="MONTH_NAME">
                                {this.monthName}
                            </span>
                            &nbsp;
                            <span data-automation-id="YEAR">{this.year}</span>
                        </span>
                        <span
                            className="arrowWrapper arrowWrapperNext"
                            onMouseDown={this.goToNextMonth}
                            data-automation-id="NEXT_MONTH_BUTTON"
                        >
                            <i className="headerArrow headerArrowNext" />
                        </span>
                    </div>
                    <div className="calendar" data-automation-id="DAY_GRID">
                        {this.dayNames}
                        {this.previousDays}
                        {this.days}
                        {this.followingDays}
                    </div>
                </div>
            </div>
        );
    }

    @computed
    get monthName(): string {
        return monthNames[this.props.value.getMonth()];
    }

    @computed
    get year(): number {
        return this.props.value.getFullYear();
    }

    @computed
    get days(): JSX.Element[] {
        const dayArray: JSX.Element[] = [];
        const daysInMonth = getDaysInMonth(this.props.value);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = changeDayInMonth(this.props.value, day);
            const shouldDisable = this.props.disableWeekends ? isWeekend(date) : false;

            dayArray.push(
                <Day
                    day={date}
                    focused={this.isFocused(day)}
                    selected={this.isSelected(day)}
                    currentDay={this.isCurrentDay(day)}
                    onSelect={!shouldDisable ? this.props.onChange : noop}
                    data-automation-id={'DAY_' + day}
                    key={'DAY_' + day}
                    disabled={shouldDisable}
                />
            );
        }

        return dayArray;
    }

    @computed
    get dayNames(): JSX.Element[] {
        return getDayNames(this.props.startingDay).map((name: string, index: number) => {
            return (
                <span
                    className="calendarItem dayName"
                    key={'DAY_NAME_' + index}
                    data-automation-id={'DAY_NAME_' + name.toUpperCase()}
                >
                    {name}
                </span>
            );
        });
    }

    @computed
    get previousDays(): JSX.Element[] {
        const previousDays: JSX.Element[] = [];
        const lastMonth = getMonthFromOffset(this.props.value, -1);
        const lastDayOfPrevMonth: number = getDaysInMonth(lastMonth);
        const numberOfDaysToDisplay: number = lastDayOfPrevMonth -
            getNumOfPreviousDays(this.props.value, this.props.startingDay);

        for (let day = numberOfDaysToDisplay + 1; day <= lastDayOfPrevMonth; day++) {
            const lastMonthCopy = changeDayInMonth(lastMonth, day);

            previousDays.push((
                <Day
                    day={lastMonthCopy}
                    data-automation-id={'PREV_DAY_' + day}
                    key={'PREV_DAY_' + day}
                    partOfPrevMonth={true}
                />
            ));
        }

        return previousDays;
    }

    @computed
    get followingDays(): JSX.Element[] {
        const followingDays: JSX.Element[] = [];
        const numberOfDaysToDisplay: number = getNumOfFollowingDays(this.props.value, this.props.startingDay);

        for (let day = 1; day <= numberOfDaysToDisplay; day++) {
            const nextMonth = changeDayInMonth(getMonthFromOffset(this.props.value, 1), day);

            followingDays.push(
                <Day
                    day={nextMonth}
                    data-automation-id={'NEXT_DAY_' + day}
                    key={'NEXT_DAY_' + day}
                    partOfNextMonth={true}
                />
            );
        }

        return followingDays;
    }

    private isCurrentDay(day: number): boolean {
        const currentDate = new Date();
        return (this.props.value.getFullYear() === currentDate.getFullYear()
            && this.props.value.getMonth() === currentDate.getMonth()
            && currentDate.getDate() === day);
    }

    private isSelected(day: number): boolean {
        // Don't highlight the current day as selected
        if (this.props.highlightSelectedDate && this.props.selectedDate) {
            return (this.props.value.getFullYear() === this.props.selectedDate.getFullYear()
                && this.props.value.getMonth() === this.props.selectedDate.getMonth()
                && this.props.selectedDate.getDate() === day);
        } else {
            return false;
        }
    }

    private isFocused(day: number): boolean {
        if (this.props.highlightFocusedDate) {
            return (this.props.value.getDate() === day);
        } else {
            return false;
        }
    }

    private goToNextMonth: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();
        const nextMonth: Date =
            getMonthFromOffset(new Date(this.props.value.getFullYear(), this.props.value.getMonth(), 1), 1);
        this.props.updateDropdownDate(nextMonth);
    }

    private goToPrevMonth: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();
        const previousMonth: Date =
            getMonthFromOffset(new Date(this.props.value.getFullYear(), this.props.value.getMonth(), 1), -1);
        this.props.updateDropdownDate(previousMonth);
    }
}
