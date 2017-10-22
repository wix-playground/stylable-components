import * as keycode from 'keycode';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {StylableProps} from '../../types/props';
import {noop} from '../../utils';
import {Input} from '../input';
import {Popup} from '../popup';
import {Calendar} from './calendar';
import {CalendarIcon} from './date-picker-icons';
import styles from './date-picker.st.css';

const invalidDate: string = 'Invalid Date';

export interface DatePickerProps extends FormInputProps<Date, string>, StylableProps {
    placeholder?: string;
    openOnFocus?: boolean;
    showDropdownOnInit?: boolean;
    startingDay?: number;
    calendarIcon?: React.ComponentType;
}

export interface DatePickerState {
    inputValue: string;
    isDropdownVisible: boolean;
    dropdownRef: HTMLDivElement | null;
    dropdownDate: Date;
    highlightSelectedDate: boolean;
    highlightFocusedDate: boolean;
    error: boolean;
}

@stylable(styles)
@properties
export class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
    public static defaultProps: Partial<DatePickerProps> = {
        openOnFocus: false,
        onChange: noop,
        onInput: noop,
        calendarIcon: CalendarIcon
    };

    public componentWillMount() {
        this.setState({
            inputValue: this.props.value ? this.props.value.toDateString() : '',
            isDropdownVisible: this.props.showDropdownOnInit || false,
            dropdownDate: this.props.value || new Date()
        });
    }

    public render() {
        const Icon = this.props.calendarIcon!;

        const styleState = {
            disabled: this.props.disabled!,
            readonly: this.props.readOnly!,
            error: this.state.error
        };

        return (
            <div
                data-automation-id="DATE_PICKER_ROOT"
                ref={dropdownRef => this.setState({dropdownRef})}
                style-state={styleState}
            >
                <div className="flex-wrapper">
                    <Input
                        className="input"
                        value={this.state.inputValue}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        name={this.props.name}
                        tabIndex={this.props.tabIndex}
                        type="text"
                        data-automation-id="DATE_PICKER_INPUT"
                        onKeyDown={this.onKeyDown}
                        onMouseDown={this.onMouseDown}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onInputChange}
                        onInput={this.props.onInput}
                    />
                    <div className="icon" data-automation-id="CALENDAR_ICON" onClick={this.toggleDropdown}>
                        <Icon />
                    </div>
                    <Popup open={this.state.isDropdownVisible} anchor={this.state.dropdownRef}>
                        <Calendar
                            onChange={this.onCalendarInput}
                            updateDropdownDate={this.updateDropdownDate}
                            value={this.state.dropdownDate}
                            selectedDate={this.props.value}
                            startingDay={this.props.startingDay}
                            highlightSelectedDate={this.state.highlightSelectedDate}
                            highlightFocusedDate={this.state.highlightFocusedDate}
                        />
                    </Popup>
                </div>
            </div>
        );
    }

    // Called with possibly invalid string from the input
    private onUserInput = (input: string): void => {
        if (!(this.props.disabled || this.props.readOnly)) {
            if (this.isDateValid(input)) {
                const updatedDate = input ? new Date(input) : new Date();
                this.setState({
                    inputValue: updatedDate.toDateString(),
                    error: false
                });

                this.props.onChange!({value: updatedDate});
            } else {
                this.setState({error: true});
            }
        }
    }

    // Should only be called with valid date from the dropdown
    private onCalendarInput = (input: Date): void => {
        if (!(this.props.disabled || this.props.readOnly)) {
            this.setState({
                inputValue: input.toDateString() ,
                isDropdownVisible: false,
                highlightSelectedDate: true,
                highlightFocusedDate: false,
                dropdownDate: input
            });

            this.props.onChange!({value: input});
        }
    }

    private updateDropdownDate = (updatedDate: Date): void => {
        this.setState({
           highlightFocusedDate: false,
           dropdownDate: updatedDate
        });
    }

    private toggleDropdown = (): void => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.setState({isDropdownVisible: !this.state.isDropdownVisible});
        }
    }

    private onInputChange: React.EventHandler<React.SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.setState({inputValue: eventTarget.value});
    }

    private onFocus: React.EventHandler<React.SyntheticEvent<HTMLInputElement>> = (): void => {
        if (this.props.openOnFocus && !(this.props.disabled || this.props.readOnly)) {
            this.setState({isDropdownVisible: true});
        }
    }

    private onMouseDown: React.EventHandler<React.SyntheticEvent<HTMLInputElement>> = (): void => {
        this.toggleDropdown();
    }

    private onBlur: React.EventHandler<React.SyntheticEvent<HTMLInputElement>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        this.onUserInput(eventTarget.value);
        this.setState({isDropdownVisible: false});
    }

    private shiftDate = (daysToShift: number): void => {
        const shiftedDate: Date = new Date(
            this.state.dropdownDate.getFullYear(),
            this.state.dropdownDate.getMonth(),
            this.state.dropdownDate.getDate()
        );

        shiftedDate.setDate(this.state.dropdownDate.getDate() + daysToShift);
        this.setState({
           highlightFocusedDate: true,
           dropdownDate: shiftedDate
        });
    }

    private onKeyDown: React.EventHandler<React.KeyboardEvent<Element>> = (event): void => {
        const eventTarget = event.target as HTMLInputElement;
        const {keyCode} = event;

        if (!this.props.disabled && !this.props.readOnly) {
            switch (keyCode) {
                case keycode('enter'):
                    this.state.highlightFocusedDate
                        ? this.onCalendarInput(this.state.dropdownDate)
                        : this.onUserInput(eventTarget.value);
                    this.toggleDropdown();
                    event.preventDefault();
                    break;

                case keycode('space'):
                    this.toggleDropdown();
                    event.preventDefault();
                    break;

                case keycode('right'):
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(1);
                    }
                    break;

                case keycode('left'):
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-1);
                    }
                    break;

                case keycode('up'):
                    if (this.state.isDropdownVisible) {
                        event.preventDefault();
                        this.shiftDate(-7);
                    }
                    break;

                case keycode('down'):
                    if (this.props.openOnFocus === false && !this.state.isDropdownVisible) {
                        this.toggleDropdown();
                    } else if (!this.state.isDropdownVisible) {
                        this.toggleDropdown();
                    } else {
                        this.shiftDate(7);
                    }
                    event.preventDefault();
                    break;
            }
        }
    }

    private isDateValid = (stringToValidate: string): boolean => {
        return new Date(stringToValidate).toDateString() !== invalidDate;
    }
}
