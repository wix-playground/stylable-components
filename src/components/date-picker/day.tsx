import {observer} from 'mobx-react';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from './date-picker.st.css';

export interface DayProps extends properties.Props {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    onSelect?(day: number): void;
}

@observer
@properties
@stylable(styles)
export class Day extends React.Component<DayProps, {}> {
    public render() {
        return (
            <span
                className="calendarItem day"
                onMouseDown={this.onMouseDown}
                style-state={{
                    focused: this.props.focused!,
                    selected: this.props.selected!,
                    current: this.props.currentDay!,
                    inactive: this.props.partOfNextMonth! || this.props.partOfPrevMonth!
                }}
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
