import * as React from 'react';
import {getMonthNames, getMonthFromOffset} from './date-picker-helpers';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {DatePickerGrid} from './date-picker-grid';
import styles from './date-picker.st.css';

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
        const date = new Date(this.date.getFullYear(), this.date.getMonth(), parseInt(day));
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

    goToNextMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const nextMonth: Date = getMonthFromOffset(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 1);
        this.setDateTo(nextMonth);
    };

    goToPrevMonth: React.EventHandler<React.SyntheticEvent<HTMLSpanElement>> = (event: React.SyntheticEvent<HTMLSpanElement>) => {
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
                        <span className={[styles.headerArrow, styles.headerArrowPrev].join(' ')} onMouseDown={this.goToPrevMonth} data-automation-id="PREV_MONTH_BUTTON"></span>
                        <div className={styles.headerDate}>
                            <span data-automation-id="MONTH_NAME">{this.monthName}</span>&nbsp;<span data-automation-id="YEAR">{this.year}</span>
                        </div>
                        <span className={[styles.headerArrow, styles.headerArrowNext].join(' ')} onMouseDown={this.goToNextMonth} data-automation-id="NEXT_MONTH_BUTTON"></span>
                    </div>
                    <DatePickerGrid date={this.date} onChange={this.setDayTo.bind(this)} />
                </div>
            </div>
        );
    }
}
