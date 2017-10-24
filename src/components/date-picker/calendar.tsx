import {computed} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {
    getDayNames,
    getDaysInMonth,
    getMonthFromOffset,
    getMonthNames,
    getNumOfFollowingDays,
    getNumOfPreviousDays
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
    onChange(date: Date): void;
    updateDropdownDate(date: Date): void;
}

export interface CalendarState {
    showMonthView: boolean;
}

const monthNames = getMonthNames();

@stylable(styles)
@observer
export class Calendar extends React.Component<CalendarProps, CalendarState> {
    public componentWillMount() {
        this.setState({showMonthView: false});
    }

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
                        <span
                            data-automation-id="CALENDAR_HEADER"
                            className="headerDate"
                            onMouseDown={this.toggleMonthView}
                        >
                            {this.state.showMonthView ?
                                null
                                :
                                <span data-automation-id="MONTH_NAME">
                                    {this.monthName}
                                </span>
                            }
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
                    {this.state.showMonthView ?
                        <div className="month-view" data-automation-id="MONTH_VIEW">
                            {this.monthArray}
                        </div>
                        :
                        <div className="calendar" data-automation-id="DAY_GRID">
                            {this.dayNames}
                            {this.previousDays}
                            {this.days}
                            {this.followingDays}
                        </div>
                    }
                </div>
            </div>
        );
    }

    private selectDay = (day: number) => {
        const date = new Date(this.props.value.getFullYear(), this.props.value.getMonth(), day);
        this.props.onChange(date);
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
            dayArray.push(
                <Day
                    day={day}
                    focused={this.isFocused(day)}
                    selected={this.isSelected(day)}
                    currentDay={this.isCurrentDay(day)}
                    onSelect={this.selectDay}
                    data-automation-id={'DAY_' + day}
                    key={'DAY_' + day}
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
        const lastDayOfPrevMonth: number = getDaysInMonth(getMonthFromOffset(this.props.value, -1));
        const numberOfDaysToDisplay: number = lastDayOfPrevMonth -
            getNumOfPreviousDays(this.props.value, this.props.startingDay);

        for (let day = numberOfDaysToDisplay + 1; day <= lastDayOfPrevMonth; day++) {
            previousDays.push((
                <Day
                    day={day}
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

        for (let i = 1; i <= numberOfDaysToDisplay; i++) {
            followingDays.push(
                <Day
                    day={i}
                    data-automation-id={'NEXT_DAY_' + i}
                    key={'NEXT_DAY_' + i}
                    partOfNextMonth={true}
                />
            );
        }

        return followingDays;
    }

    @computed
    get monthArray(): JSX.Element[] {
        const monthArray: JSX.Element[] = [];

        monthNames.forEach(month => {
            monthArray.push(
                <span
                    className="calendarItem monthName"
                    onMouseDown={this.selectMonth}
                    key={`MONTH_${month.toUpperCase()}`}
                    data-automation-id={`MONTH_${month.toUpperCase()}`}
                >
                    {month}
                </span>
                );
        });

        return monthArray;
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

    private selectMonth: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();
        const eventTarget = event.target as HTMLSpanElement;
        this.setState({showMonthView: !this.state.showMonthView});

        const date = new Date(this.props.value.getFullYear(),
            monthNames.indexOf(eventTarget.textContent!),
            this.props.value.getDate());

        this.props.updateDropdownDate(date);
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

    private toggleMonthView: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();
        this.setState({showMonthView: !this.state.showMonthView});
    }
}
