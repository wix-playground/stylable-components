import * as keycode from 'keycode';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {dateToDateInputFormat} from '../../utils/date-helpers';
import {Popup} from '../popup';
import {Calendar} from './calendar';
import {CalendarIcon} from './date-picker-icons';
import styles from './date-picker.st.css';

const invalidDate: string = 'Invalid Date';

export interface DatePickerProps extends FormInputProps<Date>, properties.Props {
    placeholder?: string;
    openOnFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
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
}

@stylable(styles)
@properties
export class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
    public static defaultProps: Partial<DatePickerProps> = {
        openOnFocus: false,
        onChange: noop,
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

        return (
            <div
                data-automation-id="DATE_PICKER_ROOT"
                ref={dropdownRef => this.setState({dropdownRef})}
            >
                <input
                    className="input"
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
                <input type="hidden" value={dateToDateInputFormat(this.props.value!)} name={this.props.name}/>
                <div className="icon" data-automation-id="CALENDAR_ICON" onClick={this.toggleDropdown}>
                    <Icon/>
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
        );
    }

    // Called with possibly invalid string from the input
    private onUserInput = (input: string): void => {
        if (this.isDateValid(input)) {
            const updatedDate = input ? new Date(input) : new Date();
            this.setState({inputValue: updatedDate.toDateString()});

            this.props.onChange!({value: updatedDate});
        } else {
            this.setState({inputValue: invalidDate});
        }
    }

    // Should only be called with valid date from the dropdown
    private onCalendarInput = (input: Date): void => {
        this.setState({
            inputValue: input.toDateString(),
            isDropdownVisible: false,
            highlightSelectedDate: true,
            highlightFocusedDate: false,
            dropdownDate: input
        });

        this.props.onChange!({value: input});
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
        if (this.props.openOnFocus) {
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
