import * as React from 'react';
import {getMonthNames, getMonthFromOffset, getDayNames, getDaysInMonth, getNumOfPreviousDays, getNumOfFollowingDays} from './date-picker-helpers';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Day} from './day';
const styles = require('./date-picker.st.css').default;

export interface DropdownProps {
    date: Date;
    focusedDate: Date;
    onChange (date: Date): void;
    updateDropdownDate (date: Date): void;
    startingDay: number;
    highlightSelectedDate: boolean;
    highlightFocusedDate: boolean;
}

const monthNames = getMonthNames();

@observer
export class Dropdown extends React.Component<DropdownProps, {}>{
    // @observable date: Date = this.props.date;

    setDateTo (date: Date) {
        this.props.updateDropdownDate(date);
    }

    @action setDayTo = (day: number) => {
        const date = new Date(this.props.focusedDate.getFullYear(), this.props.focusedDate.getMonth(), day);
        this.props.onChange(date);
    };

    @computed
    get monthName (): string {
        return monthNames[this.props.focusedDate.getMonth()];
    }

    @computed
    get year (): number {
        return this.props.focusedDate.getFullYear();
    }

    @computed
    get dayArray (): Array<JSX.Element> {
        const dayArray: Array<number> = [];
        for (let i = 1; i <= getDaysInMonth(this.props.focusedDate); i++) {
            dayArray.push(i);
        }

        return dayArray.map(day => <Day day={day} selected={this.isSelected(day)} focused={this.isFocused(day)} currentDay={this.isCurrentDay(day)} onSelect={this.setDayTo} dataAutomationId={'DAY_' + day} key={'DAY_' + day} />);

    }

    @computed
    get dayNames (): Array<JSX.Element> {
        return getDayNames(this.props.startingDay).map((name, index) => <span className={[styles.calendarItem, styles.dayName].join(' ')} key={'DAY_NAME_' + index}
                                                                              data-automation-id={'DAY_NAME_' + name.toUpperCase()}>{name}</span>);
    }

    @computed
    get previousDays (): Array<JSX.Element> {
        const previousDays: Array<JSX.Element> = [];
        const lastDayOfPrevMonth: number = getDaysInMonth(getMonthFromOffset(this.props.focusedDate, -1));
        const numberOfDaysToDisplay: number = getNumOfPreviousDays(this.props.focusedDate, this.props.startingDay);

        for (let i = (lastDayOfPrevMonth - numberOfDaysToDisplay) + 1; i <= lastDayOfPrevMonth; i++) {
            previousDays.push(<Day day={i} dataAutomationId={'PREV_DAY_' + i} key={'PREV_DAY_' + i} partOfPrevMonth={true} />);
        }

        return previousDays;
    }

    @computed
    get followingDays (): Array<JSX.Element> {
        const followingDays: Array<JSX.Element> = [];
        const numberOfDaysToDisplay: number = getNumOfFollowingDays(this.props.focusedDate, this.props.startingDay);

        for (let i = 1; i <= numberOfDaysToDisplay; i++) {
            followingDays.push(<Day day={i} dataAutomationId={'NEXT_DAY_' + i} key={'NEXT_DAY_' + i} partOfNextMonth={true} />);
        }

        return followingDays;
    }

    isCurrentDay (day: number): boolean {
        const currentDate = new Date();
        return (this.props.focusedDate.getFullYear() === currentDate.getFullYear() && this.props.focusedDate.getMonth() === currentDate.getMonth() && currentDate.getDate() === day)
    }

    isSelected (day: number): boolean {
        // Don't highlight the current day as selected
        if (this.props.highlightSelectedDate) {
            return false;
            // return (this.date.getFullYear() === this.props.date.getFullYear() && this.date.getMonth() === this.props.date.getMonth() && this.props.date.getDate() === day);
        } else {
            return false;
        }
    }

    isFocused (day: number): boolean {
        if (this.props.highlightFocusedDate) {
            return (this.props.focusedDate.getDate() === day);
        } else {
            return false;
        }
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLDivElement>> = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.props.focusedDate.getFullYear(), this.props.focusedDate.getMonth(), 1), 1);
        this.setDateTo(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<HTMLDivElement>> = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const previousMonth: Date = getMonthFromOffset(new Date(this.props.focusedDate.getFullYear(), this.props.focusedDate.getMonth(), 1), -1);
        this.setDateTo(previousMonth);
    };

    render() {
        return (
            <div tabIndex={1} id="DATE_PICKER_DROPDOWN">
                <div className={styles.dropdownArrowWrapper}><div className={styles.dropdownArrow} /></div>
                <div className={styles.dropdown} data-automation-id="DATE_PICKER_DROPDOWN">
                    <div className={styles.header}>
                        <div className={[styles.arrowWrapper, styles.arrowWrapperPrev].join(' ')} onMouseDown={this.goToPrevMonth} data-automation-id="PREV_MONTH_BUTTON">
                            <i className={[styles.headerArrow, styles.headerArrowPrev].join(' ')}></i>
                        </div>
                        <div className={styles.headerDate}>
                            <span data-automation-id="MONTH_NAME">{this.monthName}</span>&nbsp;<span data-automation-id="YEAR">{this.year}</span>
                        </div>
                        <div className={[styles.arrowWrapper, styles.arrowWrapperNext].join(' ')} onMouseDown={this.goToNextMonth} data-automation-id="NEXT_MONTH_BUTTON">
                            <i className={[styles.headerArrow, styles.headerArrowNext].join(' ')}></i>
                        </div>
                    </div>
                    <div className={styles.calendar} data-automation-id="DAY_GRID">
                        {this.dayNames}
                        {this.previousDays}
                        {this.dayArray}
                        {this.followingDays}
                    </div>
                </div>
            </div>
        );
    }
}
