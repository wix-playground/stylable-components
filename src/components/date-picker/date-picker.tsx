import * as React from 'react';
import {Calendar} from './calendar';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
import styles from './date-picker.st.css';

const invalidDate: string = 'Invalid Date';

export interface DatePickerProps {
    value: Date;
    onChange (value: Date): void;
    placeholder: string;
    openOnFocus: boolean;
    disabled: boolean;
    readOnly: boolean;
    showDropdownOnInit: boolean;
    startingDay: number;
    dataAutomationId: string;
}

export interface DatePickerState {
    inputValue: string;
    isDropdownVisible: boolean;
    dropdownDate: Date;
    highlightSelectedDate: boolean;
    highlightFocusedDate: boolean;
}

export class DatePicker extends React.Component<Partial<DatePickerProps>, DatePickerState>{
    static defaultProps: Partial<DatePickerProps> = {
        openOnFocus: true
    };

    componentWillMount () {
        this.setState({
            inputValue: this.props.value ? this.props.value.toDateString() : '',
            isDropdownVisible: this.props.showDropdownOnInit || false,
            dropdownDate: this.props.value || new Date()
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
            isDropdownVisible: false,
            highlightSelectedDate: true,
            highlightFocusedDate: false,
            dropdownDate: input
        });

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    };

    updateDropdownDate = (updatedDate: Date): void => {
        this.setState({
           highlightFocusedDate: false,
           dropdownDate: updatedDate
        });
    };

    onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.setState({ inputValue: eventTarget.value });
    };

    onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        if (this.props.openOnFocus) {
            this.setState({ isDropdownVisible: true });
        }
    };

    onMouseDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
    };

    onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.setState({ isDropdownVisible: false })
    };

    shiftDate = (daysToShift: number): void => {
        const shiftedDate: Date = new Date(this.state.dropdownDate.getFullYear(), this.state.dropdownDate.getMonth(), this.state.dropdownDate.getDate());
        shiftedDate.setDate(this.state.dropdownDate.getDate() + daysToShift);
        this.setState({
           highlightFocusedDate: true,
           dropdownDate: shiftedDate
        });
    };

    onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        const {keyCode} = event;

        if (!this.props.disabled && !this.props.readOnly) {
            switch (keyCode) {
                case KeyCodes.ENTER:
                    this.state.highlightFocusedDate ? this.updateStateFromDate(this.state.dropdownDate) : this.updateStateFromString(eventTarget.value);
                    this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
                    event.preventDefault();
                    break;

                case KeyCodes.SPACE:
                    this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
                    event.preventDefault();
                    break;

                case KeyCodes.RIGHT:
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(1);
                    }
                    break;

                case KeyCodes.LEFT:
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-1);
                    }
                    break;

                case KeyCodes.UP:
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-7);
                    }
                    break;

                case KeyCodes.DOWN:
                    if (this.props.openOnFocus === false && !this.state.isDropdownVisible) {
                        this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
                    } else if (!this.state.isDropdownVisible) {
                        this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
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
                       onMouseDown={this.onMouseDown}
                       onBlur={this.onBlur}
                       onFocus={this.onFocus}
                       onChange={this.onInputChange}
                       value={this.state.inputValue}
                       placeholder={this.props.placeholder}
                       type="text"
                       data-automation-id="DATE_PICKER_INPUT" />
                {this.state.isDropdownVisible
                    ? <Calendar onChange={this.updateStateFromDate}
                                updateDropdownDate={this.updateDropdownDate}
                                value={this.state.dropdownDate}
                                selectedDate={this.props.value}
                                startingDay={this.props.startingDay}
                                highlightSelectedDate={this.state.highlightSelectedDate}
                                highlightFocusedDate={this.state.highlightFocusedDate}  />
                    : null
                }
            </div>
        );
    }
}
