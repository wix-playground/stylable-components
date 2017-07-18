import * as React from 'react';
import {getDayNames, getDaysInMonth, getNumOfPreviousDays} from './date-picker-helpers';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
const styles = require('./date-picker.css');

export interface DatePickerGridProps {
    date: Date;
    startingDay?: number;
    onChange (selectedDay: string): void;
}

@observer
export class DatePickerGrid extends React.Component<DatePickerGridProps, {}> {
    static defaultProps = {
        startingDay: 0
    };

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

        for (let i = 0; i < getNumOfPreviousDays(this.props.date, this.props.startingDay); i++) {
            previousDays.push(<span className={styles.calendarItem} key={'PREV_DAY_' + i} data-automation-id={'PREV_DAY_' + i}></span>);
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
