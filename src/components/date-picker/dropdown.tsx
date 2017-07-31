import * as React from 'react';
import {getMonthNames, getMonthFromOffset, getDayNames, getDaysInMonth, getNumOfPreviousDays, getNumOfFollowingDays} from '../../common/date-helpers';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import {Day} from './day';
const styles = require('./date-picker.st.css').default;

export interface DropdownProps {
    value: Date;
    selectedDate: Date | undefined;
    focusedDate?: Date;
    onChange (date: Date): void;
    updateDropdownDate (date: Date): void;
    startingDay: number;
    highlightSelectedDate: boolean;
    highlightFocusedDate: boolean;
}

const monthNames = getMonthNames();

@observer
export class Dropdown extends React.Component<DropdownProps, {}>{
    setDate (date: Date) {
        this.props.updateDropdownDate(date);
    }

    selectDay = (day: number) => {
        const date = new Date(this.props.value.getFullYear(), this.props.value.getMonth(), day);
        this.props.onChange(date);
    };

    @computed
    get monthName (): string {
        return monthNames[this.props.value.getMonth()];
    }

    @computed
    get year (): number {
        return this.props.value.getFullYear();
    }

    @computed
    get days (): Array<JSX.Element> {
        const dayArray: Array<number> = [];
        const daysInMonth = getDaysInMonth(this.props.value);

        for (let i = 1; i <= daysInMonth; i++) {
            dayArray.push(i);
        }

        return dayArray.map((day: number) => {
            return (
                <Day day={day}
                     focused={this.isFocused(day)}
                     selected={this.isSelected(day)}
                     currentDay={this.isCurrentDay(day)}
                     onSelect={this.selectDay}
                     dataAutomationId={'DAY_' + day}
                     key={'DAY_' + day} />
            );
        });
    }

    @computed
    get dayNames (): Array<JSX.Element> {
        return getDayNames(this.props.startingDay).map((name: string, index: number) => {
            return (
                <span className={[styles.calendarItem, styles.dayName].join(' ')}
                      key={'DAY_NAME_' + index}
                      data-automation-id={'DAY_NAME_' + name.toUpperCase()}>
                    {name}</span>
            );
        });
    }

    @computed
    get previousDays (): Array<JSX.Element> {
        const previousDays: Array<JSX.Element> = [];
        const lastDayOfPrevMonth: number = getDaysInMonth(getMonthFromOffset(this.props.value, -1));
        const numberOfDaysToDisplay: number = getNumOfPreviousDays(this.props.value, this.props.startingDay);

        for (let i = (lastDayOfPrevMonth - numberOfDaysToDisplay) + 1; i <= lastDayOfPrevMonth; i++) {
            previousDays.push((
                <Day day={i}
                     dataAutomationId={'PREV_DAY_' + i}
                     key={'PREV_DAY_' + i}
                     partOfPrevMonth={true} />
            ));
        }

        return previousDays;
    }

    @computed
    get followingDays (): Array<JSX.Element> {
        const followingDays: Array<JSX.Element> = [];
        const numberOfDaysToDisplay: number = getNumOfFollowingDays(this.props.value, this.props.startingDay);

        for (let i = 1; i <= numberOfDaysToDisplay; i++) {
            followingDays.push(<Day day={i} dataAutomationId={'NEXT_DAY_' + i} key={'NEXT_DAY_' + i} partOfNextMonth={true} />);
        }

        return followingDays;
    }

    isCurrentDay (day: number): boolean {
        const currentDate = new Date();
        return (this.props.value.getFullYear() === currentDate.getFullYear() && this.props.value.getMonth() === currentDate.getMonth() && currentDate.getDate() === day)
    }

    isSelected (day: number): boolean {
        // Don't highlight the current day as selected
        if (this.props.highlightSelectedDate && this.props.selectedDate) {
            return (this.props.value.getFullYear() === this.props.selectedDate.getFullYear() && this.props.value.getMonth() === this.props.selectedDate.getMonth() && this.props.selectedDate.getDate() === day);
        } else {
            return false;
        }
    }

    isFocused (day: number): boolean {
        if (this.props.highlightFocusedDate) {
            return (this.props.value.getDate() === day);
        } else {
            return false;
        }
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<Element>> = (event) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.props.value.getFullYear(), this.props.value.getMonth(), 1), 1);
        this.props.updateDropdownDate(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<Element>> = (event) => {
        event.preventDefault();
        const previousMonth: Date = getMonthFromOffset(new Date(this.props.value.getFullYear(), this.props.value.getMonth(), 1), -1);
        this.props.updateDropdownDate(previousMonth);
    };

    render() {
        return (
            <div tabIndex={1} id="DATE_PICKER_DROPDOWN">
                <div className={styles.dropdownArrowWrapper}><div className={styles.dropdownArrow} /></div>
                <div className={styles.dropdown} data-automation-id="DATE_PICKER_DROPDOWN">
                    <div className={styles.header}>
                        <span className={[styles.arrowWrapper, styles.arrowWrapperPrev].join(' ')}
                              onMouseDown={this.goToPrevMonth}
                              data-automation-id="PREV_MONTH_BUTTON">
                            <i className={[styles.headerArrow, styles.headerArrowPrev].join(' ')}></i>
                        </span>
                        <span className={styles.headerDate}>
                            <span data-automation-id="MONTH_NAME">{this.monthName}</span>&nbsp;<span data-automation-id="YEAR">{this.year}</span>
                        </span>
                        <span className={[styles.arrowWrapper, styles.arrowWrapperNext].join(' ')}
                             onMouseDown={this.goToNextMonth}
                             data-automation-id="NEXT_MONTH_BUTTON">
                            <i className={[styles.headerArrow, styles.headerArrowNext].join(' ')}></i>
                        </span>
                    </div>
                    <div className={styles.calendar} data-automation-id="DAY_GRID">
                        {this.dayNames}
                        {this.previousDays}
                        {this.days}
                        {this.followingDays}
                    </div>
                </div>
            </div>
        );
    }
}
