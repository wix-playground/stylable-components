import * as React from 'react';
import {getMonthNames, getMonthFromOffset, getDayNames, getDaysInMonth, getNumOfPreviousDays, getNumOfFollowingDays} from './date-picker-helpers';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Day} from './day';
const styles = require('./date-picker.css');

export interface DropdownProps {
    date: Date;
    onChange (date: Date): void;
    startingDay: number;
}

const monthNames = getMonthNames();

@observer
export class Dropdown extends React.Component<DropdownProps, {}>{
    @observable date: Date = this.props.date;

    @action setDateTo (date: Date) {
        this.date = date;
    }

    @action setDayTo = (day: number) => {
        const date = new Date(this.date.getFullYear(), this.date.getMonth(), day);
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

    @computed
    get dayArray (): Array<JSX.Element> {
        const dayArray: Array<number> = [];
        for (let i = 1; i <= getDaysInMonth(this.date); i++) {
            dayArray.push(i);
        }

        return dayArray.map(day => <Day day={day} onSelect={this.setDayTo} dataAutomationId={'DAY_' + day} key={'DAY_' + day} />);

    }

    @computed
    get dayNames (): Array<JSX.Element> {
        return getDayNames(this.props.startingDay).map((name, index) => <span className={[styles.calendarItem, styles.dayName].join(' ')} key={'DAY_NAME_' + index}
                                                                              data-automation-id={'DAY_NAME_' + name.toUpperCase()}>{name}</span>);
    }

    @computed
    get previousDays (): Array<JSX.Element> {
        const previousDays: Array<JSX.Element> = [];
        const lastDayOfPrevMonth: number = getDaysInMonth(getMonthFromOffset(this.date, -1));
        const numberOfDaysToDisplay: number = getNumOfPreviousDays(this.date, this.props.startingDay);

        for (let i = (lastDayOfPrevMonth - numberOfDaysToDisplay) + 1; i <= lastDayOfPrevMonth; i++) {
            previousDays.push(<Day day={i} dataAutomationId={'PREV_DAY_' + i} key={'PREV_DAY_' + i} partOfPrevMonth={true} />);
        }

        return previousDays;
    }

    @computed
    get followingDays (): Array<JSX.Element> {
        const followingDays: Array<JSX.Element> = [];
        const numberOfDaysToDisplay: number = getNumOfFollowingDays(this.date, this.props.startingDay);

        for (let i = 1; i <= numberOfDaysToDisplay; i++) {
            followingDays.push(<Day day={i} dataAutomationId={'NEXT_DAY_' + i} key={'NEXT_DAY_' + i} partOfNextMonth={true} />);
        }

        return followingDays;
    }

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLDivElement>> = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 1);
        this.setDateTo(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<HTMLDivElement>> = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const previousMonth: Date = getMonthFromOffset(new Date(this.date.getFullYear(), this.date.getMonth(), 1), -1);
        this.setDateTo(previousMonth);
    };

    render() {
        return (
            <div>
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
