import * as React from 'react';
import {getDayNames, getDaysInMonth} from './date-picker-helpers';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import styles = require('./date-picker.css');

export interface DatePickerGridProps {
    date: Date;
    onChange (selectedDay: string): void;
}

@observer
export class DatePickerGrid extends React.Component<DatePickerGridProps, {}> {
    @computed
    get dayArray(): Array<number> {
        const dayArray: Array<number> = [];
        for (let i = 1; i <= getDaysInMonth(this.props.date); i++) {
            dayArray.push(i);
        }

        return dayArray;
    }

    onMouseDown: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLElement;
        this.props.onChange(eventTarget.textContent!)
    };

    render() {
        return (
                <div className={styles.calendar} data-automation-id="CALENDAR">
                    {getDayNames().map((name, index) => <span className={[styles.calendarItem, styles.dayName].join(' ')} key={'DAY_NAME_' + index}
                                                        data-automation-id={'DAY_NAME_' + name.toUpperCase()}>{name}</span>)}
                    {this.dayArray.map(day => <span className={[styles.calendarItem, styles.day].join(' ')} onMouseDown={this.onMouseDown} key={'DAY_' + day}
                                                       data-automation-id={'DAY_' + day}>{day}</span>)}
                </div>
        );
    }
}
