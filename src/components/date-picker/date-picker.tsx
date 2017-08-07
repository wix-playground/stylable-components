import * as keycode from 'keycode';
import * as React from 'react';
import {SyntheticEvent} from 'react';
import inputStyles from '../../style/default-theme/controls/input.st.css';
import {Calendar} from './calendar';
import styles from './date-picker.st.css';
const invalidDate: string = 'Invalid Date';

export interface DatePickerProps {
    value: Date;
    isDropdownVisible?: boolean;
    placeholder?: string;
    onChange(value: Date): void;
}

export interface DatePickerState {
    inputValue: string;
    isDropdownVisible: boolean;
}

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    public componentWillMount() {
        this.setState({
            inputValue: this.props.value ? this.props.value.toDateString() : '',
            isDropdownVisible: this.props.isDropdownVisible ? this.props.isDropdownVisible : false
        });
    }

    public render() {
        return (
            <div data-automation-id="DATE_PICKER">
                <input
                    className={`${styles.input} ${inputStyles.root}`}
                    onKeyDown={this.onKeyDown}
                    onMouseDown={this.onMouseDown}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onInputChange}
                    value={this.state.inputValue}
                    placeholder={this.props.placeholder}
                    type="text"
                    data-automation-id="DATE_PICKER_INPUT"
                />
                {
                    this.state.isDropdownVisible &&
                    <Calendar
                        onChange={this.updateStateFromDate}
                        value={this.props.value!}
                    />
                }
            </div>
        );
    }

    // Called with possibly invalid string from the input
    private updateStateFromString = (input: string): void => {
        if (this.isDateValid(input)) {
            const updatedDate = input ? new Date(input) : new Date();
            this.setState({ inputValue: updatedDate.toDateString() });

            if (this.props.onChange) {
                this.props.onChange(updatedDate);
            }
        } else {
            this.setState({ inputValue: invalidDate });
        }
    }

    // Should only be called with valid date from the dropdown
    private updateStateFromDate = (input: Date): void => {
        this.setState({
            inputValue: input.toDateString() ,
            isDropdownVisible: false
        });

        if (this.props.onChange) {
            this.props.onChange(input);
        }
    }

    private onInputChange: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.setState({ inputValue: eventTarget.value });
    }

    private onFocus: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.setState({ isDropdownVisible: true });
    }

    private onMouseDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (): void => {
        this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
    }

    private onBlur: React.EventHandler<SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.updateStateFromString(eventTarget.value);
        this.setState({ isDropdownVisible: false });
    }

    private onKeyDown: React.EventHandler<SyntheticEvent<HTMLInputElement>> =
        (event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (keycode(event.keyCode) === 'enter') {
                const eventTarget = event.target as HTMLInputElement;
                this.updateStateFromString(eventTarget.value);
                this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
            }
    }

    private isDateValid = (stringToValidate: string): boolean => {
        const dateFromString = new Date(stringToValidate);

        return dateFromString.toDateString() !== invalidDate;
    }
}
