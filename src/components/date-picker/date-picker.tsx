import * as React from 'react';
import {Calendar} from './calendar';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
import {debug} from "util";
const styles = require('./date-picker.st.css').default;

const invalidDate: string = 'Invalid Date';

export interface DatePickerProps {
    value: Date;
    onChange (value: Date): void;

    placeholder?: string;
    startingDay?: number;
    showDropdownOnInit?: boolean;
    dataAutomationId?: string;
    openOnFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}

@observer
export class DatePicker extends React.Component<Partial<DatePickerProps>, {}>{
    static defaultProps = {
        placeholder: '',
        startingDay: 0,
        dataAutomationId: 'DATE_PICKER',
        openOnFocus: false,
        disabled: false,
        readOnly: false,
        showDropdownOnInit: false
    };

    // @observable selectedDate: Date | undefined = this.props.value;
    @observable dropdownDate: Date = this.props.value ? this.props.value : new Date();
    @observable inputValue: string | undefined = this.props.value ? this.props.value.toDateString() : undefined;
    @observable isDropdownVisible: boolean = this.props.showDropdownOnInit ? this.props.showDropdownOnInit : false;
    @observable highlightSelectedDate: boolean = false;
    @observable highlightFocusedDate: boolean = false;

    // Called with possibly invalid string from the input
    @action updateStateFromString = (input: string): void => {
        if (this.isDateValid(input)) {
            const updatedDate = input ? new Date(input) : new Date();
            this.inputValue = updatedDate.toDateString();

            if (this.props.onChange) {
                this.props.onChange(updatedDate);
            }
        } else {
            this.inputValue = invalidDate;
        }
    };

    // Should only be called with valid date from the dropdown
    @action updateStateFromDate = (input: Date): void => {
        this.inputValue = input.toDateString();
        this.isDropdownVisible = false;
        this.highlightSelectedDate = true;
        this.highlightFocusedDate = false;
        this.dropdownDate = input;

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    };

    @action updateDropdownDate = (updatedDate: Date): void => {
        this.highlightFocusedDate = false;
        this.dropdownDate = updatedDate;
    };

    @action onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.inputValue = eventTarget.value;
    };

    @action onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.isDropdownVisible = this.props.openOnFocus!;
    };

    @action onClick: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.MouseEvent<HTMLInputElement>): void => {
        event.preventDefault();
        this.isDropdownVisible = !this.isDropdownVisible;
    };

    @action onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.isDropdownVisible = false;
    };

    @action shiftDate = (daysToShift: number): void => {
        const shiftedDate: Date = new Date(this.dropdownDate.getFullYear(), this.dropdownDate.getMonth(), this.dropdownDate.getDate());
        shiftedDate.setDate(this.dropdownDate.getDate() + daysToShift);
        this.highlightFocusedDate = true;
        this.dropdownDate = shiftedDate;
    };

    @action onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        const {keyCode} = event;

        if (!this.props.disabled && !this.props.readOnly) {
            switch (keyCode) {
                case KeyCodes.ENTER:
                    this.highlightFocusedDate ? this.updateStateFromDate(this.dropdownDate) : this.updateStateFromString(eventTarget.value);
                    event.preventDefault();

                    if (!this.props.openOnFocus) {
                        this.isDropdownVisible = !this.isDropdownVisible;
                    } else {
                        this.isDropdownVisible = false;
                    }

                    break;

                case KeyCodes.SPACE:
                    this.isDropdownVisible = !this.isDropdownVisible;
                    event.preventDefault();
                    break;

                case KeyCodes.RIGHT:
                    if (this.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(1);
                    }
                    break;

                case KeyCodes.LEFT:
                    if (this.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-1);
                    }
                    break;

                case KeyCodes.UP:
                    if (this.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-7);
                    }
                    break;

                case KeyCodes.DOWN:
                    if (this.props.openOnFocus === false && !this.isDropdownVisible) {
                        this.isDropdownVisible = !this.isDropdownVisible;
                    } else if (!this.isDropdownVisible) {
                        this.isDropdownVisible = !this.isDropdownVisible;
                    } else {
                        this.shiftDate(7);
                    }
                    event.preventDefault();
                    break;
            }
        }
    };

    isDateValid = (stringToValidate: string): boolean => {
        return new Date(stringToValidate).toDateString() !== invalidDate;
    };

    render() {
        return (
            <div className={styles.root} data-automation-id={this.props.dataAutomationId}>
                <input className={styles.input}
                       onKeyDown={this.onKeyDown}
                       onClick={this.onClick}
                       onBlur={this.onBlur}
                       onFocus={this.onFocus}
                       onChange={this.onInputChange}
                       value={this.inputValue}
                       placeholder={this.props.placeholder}
                       type="text"
                       data-automation-id="DATE_PICKER_INPUT" />
                {this.isDropdownVisible
                    ? <Calendar onChange={this.updateStateFromDate}
                                updateDropdownDate={this.updateDropdownDate}
                                value={this.dropdownDate}
                                selectedDate={this.props.value}
                                startingDay={this.props.startingDay!}
                                highlightSelectedDate={this.highlightSelectedDate}
                                highlightFocusedDate={this.highlightFocusedDate}  />
                    : null
                }
            </div>
        );
    }
}
