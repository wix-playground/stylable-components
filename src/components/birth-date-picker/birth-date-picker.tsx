import React = require("react");

export interface BirthDatePickerProps {
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (newValue: Date) => void;
}

export interface BirthDatePickerState {
    year: string;
    month: string;
    day: string;
}

function isValidDate(date: any): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
}

function sameDate(a: Date, b: Date) {
    return a.getUTCFullYear() === b.getUTCFullYear() &&
           a.getUTCMonth() === b.getUTCMonth() &&
           a.getUTCDate() === b.getUTCDate();
}

function yearMonthDayFromDate(date: Date | undefined) {
    const valid = isValidDate(date);
    return {
        year:  valid ? String(date!.getUTCFullYear())  : "",
        month: valid ? String(date!.getUTCMonth() + 1) : "",
        day:   valid ? String(date!.getUTCDate())      : ""
    }
}

export function dateFromYearMonthDay(y: string, m: string, d: string): Date | Error {
    if (/^\d\d\d\d-\d\d?-\d\d?$/.test(`${y}-${m}-${d}`)) {
        const date = new Date(`${y}-${m}-${d}Z`);
        if (
            date.getUTCFullYear()  === Number(y) &&
            date.getUTCMonth() + 1 === Number(m) &&
            date.getUTCDate()      === Number(d)
        ) {
            return date;
        }
    }
    return new Error("Invalid date");
}

export class BirthDatePicker extends React.Component<BirthDatePickerProps, BirthDatePickerState> {
    static defaultProps: BirthDatePickerProps = {
        minDate: new Date("1900-01-01Z"),
        maxDate: new Date(),
        onChange: (newValue: Date) => {}
    };

    lastValue: Date | undefined;
    yearInput: HTMLInputElement | null;
    monthInput: HTMLInputElement | null;
    dayInput: HTMLInputElement | null;

    constructor(props: BirthDatePickerProps) {
        super(props);
        const {value} = this.props;
        this.lastValue = isValidDate(value) ? value : undefined;
        this.state = yearMonthDayFromDate(this.lastValue);
    }

    componentWillReceiveProps(nextProps: BirthDatePickerProps) {
        const {value} = nextProps;
        if (isValidDate(value)) {
            this.lastValue = value;
            this.setState(yearMonthDayFromDate(value));
        }
    }

    render() {
        return <span data-automation-id="BIRTH_DATE_PICKER">
            <input data-automation-id="BIRTH_DATE_PICKER_DAY"
                ref={(input) => { this.dayInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="DD"
                value={this.state.day}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_MONTH"
                ref={(input) => { this.monthInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="MM"
                value={this.state.month}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_YEAR"
                ref={(input) => { this.yearInput = input }}
                type="text"
                size={5}
                pattern="\d*"
                placeholder="YYYY"
                value={this.state.year}
                onChange={this.handleChange} />
        </span>;
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const year = this.yearInput!.value;
        const month = this.monthInput!.value;
        const day = this.dayInput!.value;

        const newValue = dateFromYearMonthDay(year, month, day);
        if (newValue instanceof Date && (!this.lastValue || !sameDate(this.lastValue, newValue))) {
            this.lastValue = newValue;
            this.props.onChange!(newValue);
        }
        this.setState({year, month, day});
    }
}
