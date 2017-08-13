import {computed} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {root} from 'wix-react-tools';
import styles from './date-picker.st.css';

export interface DayProps {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    onSelect?(day: number): void;
}

@observer
export class Day extends React.Component<DayProps, {}> {
    public render() {
        return (
            <span
                {...root(this.props,
                    { 'data-automation-id': '', 'className': 'root' }) as React.HTMLAttributes<HTMLSpanElement>
                }
                className={this.styles}
                onMouseDown={this.onMouseDown}
            >
                {this.props.day}
            </span>
        );
    }

    @computed
    get styles(): string {
        if (this.props.focused && this.props.selected) {
            return `${styles.calendarItem} ${styles.day} ${styles.focusedAndSelected}`;
        } else if (this.props.focused && this.props.currentDay) {
            return `${styles.calendarItem} ${styles.day} ${styles.focused} ${styles.current}`;
        } else if (this.props.focused) {
            return `${styles.calendarItem} ${styles.day} ${styles.focused}`;
        } else if (this.props.selected) {
            return `${styles.calendarItem} ${styles.day} ${styles.selected}`;
        } else if (this.props.currentDay) {
            return `${styles.calendarItem} ${styles.day} ${styles.current}`;
        } else if (this.props.partOfNextMonth || this.props.partOfPrevMonth) {
            return `${styles.calendarItem} ${styles.inactive}`;
        } else {
            return `${styles.calendarItem} ${styles.day}`;
        }
    }

    private onMouseDown: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(this.props.day);
        }
    }
}
