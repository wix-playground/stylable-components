import * as React from 'react';
import {Dropdown} from './dropdown';
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

export interface DatePickerState {
    inputValue: string;
    isDropdownVisible: boolean;
}

export class DatePicker extends React.Component<DatePickerProps, DatePickerState>{
    componentWillMount () {
        this.setState({
            inputValue: this.props.value ? this.props.value.toDateString() : '',
            isDropdownVisible: this.props.isDropdownVisible ? this.props.isDropdownVisible : false
        });
    }

    // Called with possibly invalid string from the input
    updateStateFromString = (input: string): void => {
        if (this.isDateValid(input)) {
            const updatedDate = input ? new Date(input) : new Date();
            this.setState({ inputValue: updatedDate.toDateString() });

            if (this.props.onChange) {
                this.props.onChange(updatedDate);
            }
        } else {
            this.setState({ inputValue: invalidDate });
        }
    };

    // Should only be called with valid date from the dropdown
    updateStateFromDate = (input: Date): void => {
        this.setState({
            inputValue: input.toDateString() ,
            isDropdownVisible: false
        });

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    };

    onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.setState({ inputValue: eventTarget.value });
    };

    onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.setState({ isDropdownVisible: true })
    };

    onMouseDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
    };

    onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.setState({ isDropdownVisible: false })
    };

    onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === KeyCodes.ENTER) {
            const eventTarget = event.target as HTMLInputElement;
            this.updateStateFromString(eventTarget.value);
            this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
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
                       value={this.state.inputValue}
                       placeholder={this.props.placeholder}
                       type="text"
                       data-automation-id="DATE_PICKER_INPUT" />
                {this.state.isDropdownVisible
                    ? <Dropdown onChange={this.updateStateFromDate}
                              value={this.props.value!} />
                    : null
                }
            </div>
        );
    }
}
