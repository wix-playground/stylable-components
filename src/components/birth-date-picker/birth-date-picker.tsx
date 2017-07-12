import React = require("react");

interface BirthDatePickerProps {
    value?: Date;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (newValue?: Date) => void;
}

interface BirthDatePickerState {
    valid: boolean;
    year?: string;
    month?: string;
    day?: string;
}

function isValidDate(date: any): boolean {
    return Boolean(date instanceof Date && date.getTime());
}

function withinRange(n: number, min: number, max: number) {
    return n >= min && n <= max;
}

// TODO: use MobX
export class BirthDatePicker extends React.Component<BirthDatePickerProps, BirthDatePickerState> {
    static defaultProps: BirthDatePickerProps;

    yearInput: HTMLInputElement | null;
    monthInput: HTMLInputElement | null;
    dayInput: HTMLInputElement | null;

    constructor(props: BirthDatePickerProps) {
        super(props);
        const {value} = this.props;
        const valid = isValidDate(value);
        this.state = {
            valid,
            year:  valid ? String(value!.getUTCFullYear())  : undefined,
            month: valid ? String(value!.getUTCMonth() + 1) : undefined,
            day:   valid ? String(value!.getUTCDate())      : undefined
        };
    }

    componentWillReceiveProps(newProps: BirthDatePickerProps) {
        // TODO: should we update the state when we receive a different value?
    }

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
        const value = new Date(`${year}-${month}-${day}Z`);
        const valid = (
            /^\d{4}$/.test(year)    && withinRange(Number(year), 1000, 9999) &&
            /^\d{1,2}$/.test(month) && withinRange(Number(month),   1,   12) &&
            /^\d{1,2}$/.test(day)   && withinRange(Number(day),     1,   31) &&
            isValidDate(value)
        );

        if (valid || this.state.valid) {
            this.props.onChange!(valid ? value : undefined);
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
