import React = require("react");
import { autorun, computed, observable, reaction } from "mobx";
import { observer } from "mobx-react";

export interface BirthDatePickerProps {
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (newValue: Date) => void;
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
    return [
        valid ? String(date!.getUTCFullYear())  : "",
        valid ? String(date!.getUTCMonth() + 1) : "",
        valid ? String(date!.getUTCDate())      : ""
    ];
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

@observer
export class BirthDatePicker extends React.Component<BirthDatePickerProps, {}> {
    static defaultProps: BirthDatePickerProps = {
        minDate: new Date("1900-01-01Z"),
        maxDate: new Date(),
        onChange: (newValue: Date) => {}
    };

    @observable year: string = "";
    @observable month: string = "";
    @observable day: string = "";
    @computed get currentValue() {
        return dateFromYearMonthDay(this.year, this.month, this.day);
    }

    componentWillMount() {
        autorun(() => {
            [this.year, this.month, this.day] = yearMonthDayFromDate(this.props.value);
        });

        reaction(() => this.currentValue, value => {
            if (value instanceof Date) {
                this.props.onChange!(value);
            }
        });
    }

    render() {
        return <span data-automation-id="BIRTH_DATE_PICKER">
            <input data-automation-id="BIRTH_DATE_PICKER_DAY"
                type="text"
                size={3}
                pattern="\d*"
                placeholder="DD"
                value={this.day}
                onChange={this.handleDayChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_MONTH"
                type="text"
                size={3}
                pattern="\d*"
                placeholder="MM"
                value={this.month}
                onChange={this.handleMonthChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_YEAR"
                type="text"
                size={5}
                pattern="\d*"
                placeholder="YYYY"
                value={this.year}
                onChange={this.handleYearChange} />
        </span>;
    }

    handleYearChange  = (event: React.FormEvent<HTMLInputElement>) => this.year  = event.currentTarget.value;
    handleMonthChange = (event: React.FormEvent<HTMLInputElement>) => this.month = event.currentTarget.value;
    handleDayChange   = (event: React.FormEvent<HTMLInputElement>) => this.day   = event.currentTarget.value;
}
