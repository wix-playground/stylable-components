import * as React from 'react';
import {DatePickerDropdown} from './date-picker-dropdown';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";
import {KeyCodes} from '../../common/key-codes';
import HTML = Mocha.reporters.HTML;

export interface DatePickerProps {
    date: Date;
    onChange (value: Date): void;
    showDropdown?: boolean;
}

@observer
export class DatePicker extends React.Component<Partial<DatePickerProps>, {}>{
    static defaultProps: Partial<DatePickerProps> = {
        date: new Date()
    };

    @observable date: Date = this.props.date!;
    @observable inputValue: string;
    @observable showDropdown: boolean = this.props.showDropdown ? this.props.showDropdown : false;

    // Called with possibly invalid string from the input
    @action updateStateFromString = (input: string): void => {
        const newDate: Date = this.validateDate(input);
        this.date = newDate;
        this.inputValue = newDate.toDateString();

        if (this.props.onChange) {
            this.props.onChange(newDate);
        }
    };

    // Should only be called with valid date from the dropdown
    @action updateStateFromDate = (input: Date): void => {
        this.date = input;
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

    @action onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.FocusEvent<HTMLInputElement>): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.showDropdown = false;
    };

    @action onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === KeyCodes.ENTER) {
            const eventTarget = event.target as HTMLInputElement;
            this.updateStateFromString(eventTarget.value);
        }
    };

    validateDate = (stringToValidate: string): Date => {
        return new Date(stringToValidate);
    };

    render() {
        return (
            <div data-automation-id="DATE_PICKER">
                <input onKeyDown={this.onKeyDown} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onInputChange} value={this.inputValue} type="text" data-automation-id="DATE_PICKER_INPUT" />
                {this.showDropdown ?
                    <DatePickerDropdown onChange={this.updateStateFromDate} date={this.props.date!} data-automation-id="DATE_PICKER_DROPDOWN" />
                    :
                    null
                }
            </div>
        );
    }
}
