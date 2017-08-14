import {computed} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import { SBComponent } from 'stylable-react-component';
import {root} from 'wix-react-tools';
import styles from './day.st.css';

export interface DayProps {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    onSelect?(day: number): void;
}

@SBComponent(styles)
@observer
export class Day extends React.Component<DayProps, {}> {
    public render() {
        const cssStates = {
            focused: this.props.focused!,
            selected: this.props.selected!,
            current: this.props.currentDay!,
            inactive: this.props.partOfNextMonth! || this.props.partOfPrevMonth!,
            active: !this.props.partOfNextMonth! && !this.props.partOfPrevMonth!,
            focusedAndSelected: this.props.selected! && this.props.focused!
        };

        return (
            <span
                {...root(this.props,
                    { 'data-automation-id': '', 'className': 'root' }) as React.HTMLAttributes<HTMLSpanElement>
                }
                className={`${styles.calendarItem} ${styles.day}`}
                onMouseDown={this.onMouseDown}
                cssStates={cssStates}
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
