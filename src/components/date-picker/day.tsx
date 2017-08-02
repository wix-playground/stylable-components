import * as React from 'react';
import {computed} from 'mobx';
import {observer} from 'mobx-react';

const styles = require('./date-picker.st.css').default;

export interface DayProps {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    dataAutomationId?: string;
    onSelect? (day: number): void;
}

@observer
export class Day extends React.Component<DayProps, {}> {
    @computed
    get styles(): string {
        if (this.props.focused && this.props.selected) {
            return [styles.calendarItem, styles.day, styles.focusedAndSelected].join(' ');
        } else if (this.props.focused) {
            return [styles.calendarItem, styles.day, styles.focusedDay].join(' ');
        } else if (this.props.selected) {
            return [styles.calendarItem, styles.day, styles.selectedDay].join(' ');
        } else if (this.props.currentDay) {
            return [styles.calendarItem, styles.day, styles.currentDay].join(' ');
        } else if (this.props.partOfNextMonth || this.props.partOfPrevMonth) {
            return [styles.calendarItem, styles.inactiveDay].join(' ');
        } else {
            return [styles.calendarItem, styles.day].join(' ');
        }
    }

    onMouseDown: React.EventHandler<React.SyntheticEvent<Element>> = (event) => {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(this.props.day);
        }
    };

    render() {
        return (
            <span className={this.styles}
                     onMouseDown={this.onMouseDown}
                     data-automation-id={this.props.dataAutomationId}>
                {this.props.day}
            </span>
        );
    }
}
