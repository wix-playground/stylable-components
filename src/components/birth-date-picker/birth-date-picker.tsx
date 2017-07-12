import React = require("react");

export interface BirthDatePickerDate {
    year?: number;
    month?: number;
    day?: number;
}

interface BirthDatePickerProps {
    value?: BirthDatePickerDate;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (newValue: BirthDatePickerDate) => void;
}

export class BirthDatePicker extends React.Component<BirthDatePickerProps, {}> {
    static defaultProps: BirthDatePickerProps;
    dayInput: any;
    monthInput: any;
    yearInput: any;

    render() {
        const {day, month, year} = this.props.value!;

        return <span data-automation-id="BIRTH_DATE_PICKER">
            <input data-automation-id="BIRTH_DATE_PICKER_DAY"
                ref={(input) => { this.dayInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="DD"
                value={day || ''}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_MONTH"
                ref={(input) => { this.monthInput = input }}
                type="text"
                size={3}
                pattern="\d*"
                placeholder="MM"
                value={month || ''}
                onChange={this.handleChange} />
            <input data-automation-id="BIRTH_DATE_PICKER_YEAR"
                ref={(input) => { this.yearInput = input }}
                type="text"
                size={5}
                pattern="\d*"
                placeholder="YYYY"
                value={year || ''}
                onChange={this.handleChange} />
        </span>;
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onChange!({
            year: Number(this.yearInput.value) || undefined,
            month: Number(this.monthInput.value) || undefined,
            day: Number(this.dayInput.value) || undefined
        });
    }
}

BirthDatePicker.defaultProps = {
    value: {
        day: undefined,
        month: undefined,
        year: undefined
    },
    minDate: new Date("1900-01-01Z"),
    maxDate: new Date(),
    onChange: (value: BirthDatePickerDate) => {}
};
