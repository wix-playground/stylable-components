import * as React from 'react';
import {Dropdown} from './dropdown';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
const styles = require('./date-picker.st.css').default;

export interface DatePickerProps {
    date: Date;
    onChange (value: Date): void;

    placeholder: string;
    startingDay: number;
    showDropdownOnInit: boolean;
    dataAutomationId: string;
    openOnFocus: boolean;
    disabled: boolean;
    readOnly: boolean;
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

    public get currentDate (): Date {
        return this.date;
    }

    @observable date: Date = this.props.date ? this.props.date : new Date();
    @observable dropdownDate: Date = this.date;
    @observable inputValue: string = this.props.date ? this.props.date.toDateString() : '';
    @observable showDropdown: boolean = this.props.showDropdownOnInit ? this.props.showDropdownOnInit : false;
    @observable highlightSelectedDate: boolean = false;

    // Called with possibly invalid string from the input
    @action updateStateFromString = (input: string): void => {
        if (this.isDateValid(input) || input === '') {
            const updatedDate = input ? new Date(input) : new Date();
            this.date = updatedDate;
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
        this.date = input;
        this.inputValue = input.toDateString();
        this.highlightSelectedDate = true;
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
        this.showDropdown = this.props.openOnFocus!;
    };

    @action onClick: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.MouseEvent<HTMLInputElement>): void => {
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    };

    @action onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.FocusEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.showDropdown = false;
    };

    @action shiftDate = (daysToShift: number): void => {
        const shiftedDate: Date = new Date(this.dropdownDate.getFullYear(), this.dropdownDate.getMonth(), this.dropdownDate.getDate());
        shiftedDate.setDate(this.dropdownDate.getDate() + daysToShift);
        this.dropdownDate = shiftedDate;
    };

    @action onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        const {keyCode} = event;

        if (!this.props.disabled && !this.props.readOnly) {
            switch (keyCode) {
                case KeyCodes.ENTER:
                    this.updateStateFromString(eventTarget.value);
                    this.showDropdown = !this.showDropdown;
                    event.preventDefault();
                    break;

                case KeyCodes.SPACE:
                    this.showDropdown = !this.showDropdown;
                    event.preventDefault();
                    break;

                case KeyCodes.RIGHT:
                    if (this.showDropdown) {
                        event.preventDefault();
                        this.shiftDate(1);
                    }
                    break;

                case KeyCodes.LEFT:
                    if (this.showDropdown) {
                        event.preventDefault();
                        this.shiftDate(-1);
                    }
                    break;

                case KeyCodes.UP:
                    if (this.showDropdown) {
                        event.preventDefault();
                        this.shiftDate(-7);
                    }
                    break;

                case KeyCodes.DOWN:
                    if (this.props.openOnFocus === false && !this.showDropdown) {
                        this.showDropdown = !this.showDropdown;
                    } else if (!this.showDropdown) {
                        this.showDropdown = !this.showDropdown;
                    } else {
                        this.shiftDate(7);
                    }
                    event.preventDefault();
                    break;
            }
        }


    };

    isDateValid = (stringToValidate: string): boolean => {
        const dateFromString = new Date(stringToValidate);

        return dateFromString.toDateString() !== 'Invalid Date';
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
                {this.showDropdown ?
                    <Dropdown onChange={this.updateStateFromDate}
                              date={this.dropdownDate!}
                              startingDay={this.props.startingDay!}
                              highlightSelectedDate={this.highlightSelectedDate} />
                    :
                    null
                }
            </div>
        );
    }
}
