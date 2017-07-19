import * as React from 'react';
import {getDayNames, getDaysInMonth, getNumOfPreviousDays, getMonthFromOffset} from './date-picker-helpers';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
const styles = require('./date-picker.css');

export interface DatePickerGridProps {
    date: Date;
    onChange (selectedDay: string): void;
    startingDay: number;
}

@observer
export class DatePickerGrid extends React.Component<DatePickerGridProps, {}> {
    @computed
    get dayArray (): Array<JSX.Element> {
        const dayArray: Array<number> = [];
        for (let i = 1; i <= getDaysInMonth(this.props.date); i++) {
            dayArray.push(i);
        }

        return dayArray.map(day => <span className={[styles.calendarItem, styles.day].join(' ')} onMouseDown={this.onMouseDown} key={'DAY_' + day}
                                              data-automation-id={'DAY_' + day}>{day}</span>);
    }

    @computed
    get dayNames (): Array<JSX.Element> {
        return getDayNames(this.props.startingDay).map((name, index) => <span className={[styles.calendarItem, styles.dayName].join(' ')} key={'DAY_NAME_' + index}
                                                 data-automation-id={'DAY_NAME_' + name.toUpperCase()}>{name}</span>);
    }

    @computed
    get previousDays (): Array<JSX.Element> {
        const previousDays: Array<JSX.Element> = [];
        const lastDayOfPrevMonth: number = getDaysInMonth(getMonthFromOffset(this.props.date, -1));
        const numberOfDaysToDisplay: number = getNumOfPreviousDays(this.props.date, this.props.startingDay);

        for (let i = lastDayOfPrevMonth - numberOfDaysToDisplay + 1; i <= lastDayOfPrevMonth; i++) {
            previousDays.push(<span className={[styles.calendarItem, styles.previousDay].join(' ')} key={'PREV_DAY_' + i} data-automation-id={'PREV_DAY_' + i}>{i}</span>);
        }

        return previousDays;
    }

    onMouseDown: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLElement;
        this.props.onChange(eventTarget.textContent!)
    };

    render() {
        return (
                <div className={styles.calendar} data-automation-id="CALENDAR">
                    {this.dayNames}
                    {this.previousDays}
                    {this.dayArray}
                </div>
        );
    }
}
