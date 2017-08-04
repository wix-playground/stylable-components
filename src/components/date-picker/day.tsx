import * as React from 'react';

import {computed} from 'mobx';
import {observer} from 'mobx-react';

import styles from './date-picker.st.css';

export interface DayProps {
    day: number | string;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    dataAutomationId?: string;
    onSelect?(day: number | string): void;
}

@observer
export class Day extends React.Component<DayProps, {}> {
    @computed
    get styles(): string {
        if (this.props.focused) {
            return [styles.calendarItem, styles.day, styles.selectedDay].join(' ');
        } else if (this.props.selected) {
            return [styles.calendarItem, styles.day, styles.selectedDay].join(' ');
        } else if (this.props.currentDay) {
            return [styles.calendarItem, styles.day, styles.currentDay].join(' ');
        } else if (this.props.partOfNextMonth || this.props.partOfPrevMonth) {
            return [styles.calendarItem].join(' ');
        } else {
            return [styles.calendarItem, styles.day].join(' ');
        }
    }

    public render() {
        return (
            <span
                className={this.styles}
                onMouseDown={this.onMouseDown}
                data-automation-id={this.props.dataAutomationId}
            >
                {this.props.day}
            </span>
        );
    }

    private onMouseDown: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(this.props.day);
        }
    }
}
