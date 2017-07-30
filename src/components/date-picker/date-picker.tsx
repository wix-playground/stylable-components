import * as React from 'react';
import {Dropdown} from './dropdown';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
import styles from './date-picker.st.css';
import { root } from "wix-react-tools";

export interface DatePickerProps {
    value: Date;
    onChange (value: Date): void;
    showDropdown?: boolean;
    placeholder?: string;
}

@observer
export class DatePicker extends React.Component<DatePickerProps, {}>{
    public get currentDate (): Date | undefined {
        return this.props.value;
    }

    @observable inputValue: string = this.props.value ? this.props.value.toDateString() : '';
    @observable showDropdown: boolean = this.props.showDropdown ? this.props.showDropdown : false;

    // Called with possibly invalid string from the input
    @action updateStateFromString = (input: string): void => {
        if (this.isDateValid(input) || input === '') {
            const updatedDate = input ? new Date(input) : new Date();
            this.inputValue = updatedDate.toDateString();

            if (this.props.onChange) {
                this.props.onChange(updatedDate);
            }
        } else {
            this.inputValue = 'Invalid Date';
        }
    };

    // Should only be called with valid date from the dropdown
    @action updateStateFromDate = (input: Date): void => {
        this.inputValue = input.toDateString();
        this.showDropdown = false;

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    };

    @action onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.inputValue = eventTarget.value;
    };

    @action onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.showDropdown = true;
    };

    @action onMouseDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.showDropdown = !this.showDropdown;
    };

    @action onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.FocusEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.showDropdown = false;
    };

    @action onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === KeyCodes.ENTER) {
            const eventTarget = event.target as HTMLInputElement;
            this.updateStateFromString(eventTarget.value);
            this.showDropdown = !this.showDropdown;
        }
    };

    isDateValid = (stringToValidate: string): boolean => {
        const dateFromString = new Date(stringToValidate);

        return dateFromString.toDateString() !== 'Invalid Date';
    };

    render() {
        return (
            <div data-automation-id="DATE_PICKER" {...root(this.props, {className:"root" })}>
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
                {this.showDropdown ?
                    <Dropdown onChange={this.updateStateFromDate}
                              value={this.props.value!} />
                    :
                    null
                }
            </div>
        );
    }
}
