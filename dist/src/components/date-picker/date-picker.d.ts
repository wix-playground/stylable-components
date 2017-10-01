/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { FormInputProps } from '../../types/forms';
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
export declare class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
    static defaultProps: Partial<DatePickerProps>;
    componentWillMount(): void;
    render(): JSX.Element;
    private onUserInput;
    private onCalendarInput;
    private updateDropdownDate;
    private toggleDropdown;
    private onInputChange;
    private onFocus;
    private onMouseDown;
    private onBlur;
    private shiftDate;
    private onKeyDown;
    private isDateValid;
}
