import * as React from 'react';
import {Dropdown} from './dropdown';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
import styles from './date-picker.st.css';

const invalidDate: string = 'Invalid Date';

export interface DatePickerProps {
    value: Date;
    onChange (value: Date): void;
    isDropdownVisible?: boolean;
    placeholder?: string;
}

@observer
export class DatePicker extends React.Component<DatePickerProps, {}>{
    @observable inputValue: string = this.props.value ? this.props.value.toDateString() : '';
    @observable isDropdownVisible: boolean = this.props.isDropdownVisible ? this.props.isDropdownVisible : false;

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

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    };

    @action onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.inputValue = eventTarget.value;
    };

    @action onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.isDropdownVisible = true;
    };

    @action onMouseDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.isDropdownVisible = !this.isDropdownVisible;
    };

    @action onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.isDropdownVisible = false;
    };

    @action onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === KeyCodes.ENTER) {
            const eventTarget = event.target as HTMLInputElement;
            this.updateStateFromString(eventTarget.value);
            this.isDropdownVisible = !this.isDropdownVisible;
        }
    };

    isDateValid = (stringToValidate: string): boolean => {
        const dateFromString = new Date(stringToValidate);

        return dateFromString.toDateString() !== invalidDate;
    };

    render() {
        return (
            <div data-automation-id="DATE_PICKER">
                <input className={styles.input}
                       onKeyDown={this.onKeyDown}
                       onMouseDown={this.onMouseDown}
                       onBlur={this.onBlur}
                       onFocus={this.onFocus}
                       onChange={this.onInputChange}
                       value={this.inputValue}
                       placeholder={this.props.placeholder}
                       type="text"
                       data-automation-id="DATE_PICKER_INPUT" />
                {this.isDropdownVisible ?
                    <Dropdown onChange={this.updateStateFromDate}
                              value={this.props.value!} />
                    :
                    null
                }
            </div>
        );
    }
}
