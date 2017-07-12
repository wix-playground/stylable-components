// TODO: use MobX.
// TODO: filter input?
// TODO: should we update the state when we receive a different value?
// TODO: date validation belongs in a separate library.

import React = require("react");

export interface BirthDatePickerProps {
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (newValue?: Date) => void;
}

export interface BirthDatePickerState {
    valid: boolean;
    year?: string;
    month?: string;
    day?: string;
}

function isDateValid(date: Date): boolean {
    return !Number.isNaN(date.getTime());
}

export function dateFromYearMonthDay(y: string, m: string, d: string): Date | undefined {
    const looksPlausible = /^\d\d\d\d-\d\d?-\d\d?$/.test(`${y}-${m}-${d}`);
    if (!looksPlausible) {
        return undefined;
    }

    const date = new Date(`${y}-${m}-${d}Z`);
    const valid = (
        date.getUTCFullYear() === Number(y) &&
        date.getUTCMonth()    === Number(m) - 1 &&
        date.getUTCDate()     === Number(d)
    );

    return valid ? date : undefined;
}

export class BirthDatePicker extends React.Component<BirthDatePickerProps, BirthDatePickerState> {
    static defaultProps: BirthDatePickerProps;

    yearInput: HTMLInputElement | null;
    monthInput: HTMLInputElement | null;
    dayInput: HTMLInputElement | null;

    constructor(props: BirthDatePickerProps) {
        super(props);
        const {value} = this.props;
        const valid = value ? isDateValid(value) : false;
        this.state = {
            valid,
            year:  valid ? String(value!.getUTCFullYear())  : undefined,
            month: valid ? String(value!.getUTCMonth() + 1) : undefined,
            day:   valid ? String(value!.getUTCDate())      : undefined
        };
    }

    componentWillReceiveProps(newProps: BirthDatePickerProps) {}

    render() {
        return <span data-automation-id="BIRTH_DATE_PICKER">
            <input data-automation-id="BIRTH_DATE_PICKER_DAY"
                ref={(input) => { this.dayInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="DD"
                value={this.state.day || ""}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_MONTH"
                ref={(input) => { this.monthInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="MM"
                value={this.state.month || ""}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_YEAR"
                ref={(input) => { this.yearInput = input }}
                type="text"
                size={5}
                pattern="\d*"
                placeholder="YYYY"
                value={this.state.year || ""}
                onChange={this.handleChange} />
        </span>;
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const year = this.yearInput!.value;
        const month = this.monthInput!.value;
        const day = this.dayInput!.value;
        const date = dateFromYearMonthDay(year, month, day);
        const valid = Boolean(date);

        if (valid || this.state.valid) {
            this.props.onChange!(date);
        }

        this.setState({valid, year, month, day});
    }
}

BirthDatePicker.defaultProps = {
    value: undefined,
    minDate: new Date("1900-01-01Z"),
    maxDate: new Date(),
    onChange: (newValue?: Date) => {}
};
