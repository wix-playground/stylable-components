import {autorun, computed, observable, reaction} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import style from './birthday-picker.st.css';

export function dateFromYearMonthDay(
    y: string,
    m: string,
    d: string
): Date | Error {
    if (/^\d\d\d\d-\d\d?-\d\d?$/.test(`${y}-${m}-${d}`)) {
        const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
        if (
            date.getUTCFullYear() === Number(y) &&
            date.getUTCMonth() + 1 === Number(m) &&
            date.getUTCDate() === Number(d)
        ) {
            return date;
        }
    }
    return new Error('Invalid date');
}

interface OptionData {
    value: string;
    label: string;
}

function numberRangeForSelectBox(min: number, max: number): OptionData[] {
    const digits = String(max).length;
    const options = [];
    for (let i = min; i <= max; i++) {
        options.push({value: String(i), label: `000${i}`.substr(-digits)});
    }
    return options;
}

function monthOptionsForSelectBox(locale: string): OptionData[] {
    const options = [];
    for (let i = 0; i < 12; i++) {
        options.push({
            label: new Date(2000, i).toLocaleString(locale, {month: 'long'}),
            value: String(i + 1)
        });
    }
    return options;
}

interface SelectProps {
    value?: string;
    placeholder?: string;
    options: OptionData[];
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
    automationId?: string;
}

const Select: React.SFC<SelectProps> = props => (
    <select
        value={props.value}
        onChange={props.onChange}
        data-automation-id={props.automationId}
    >
        <option value="" label={props.placeholder} />
        {props.options.map(({value, label}) =>
            <option key={value} value={value}>{label}</option>
        )}
    </select>
);

export interface BirthdayPickerProps extends FormInputProps<Date> {
    minDate?: Date;
    maxDate?: Date;
}

@SBComponent(style) @observer
export class BirthdayPicker extends React.Component<BirthdayPickerProps, {}> {
    public static defaultProps: Partial<BirthdayPickerProps> = {
        maxDate: new Date(),
        onChange: () => {}
    };

    @observable private year: string = '';
    @observable private month: string = '';
    @observable private day: string = '';

    @computed get currentValue() {
        return dateFromYearMonthDay(this.year, this.month, this.day);
    }

    private dayOptions = numberRangeForSelectBox(1, 31);
    private monthOptions = monthOptionsForSelectBox('en-US');
    @computed private get yearOptions() {
        const max = this.props.maxDate!.getUTCFullYear();
        const min = this.props.minDate
            ? this.props.minDate.getUTCFullYear()
            : max - 120;
        return numberRangeForSelectBox(min, max);
    }

    public componentWillMount() {
        autorun(() => {
            const date  = this.props.value;
            const valid = date && !Number.isNaN(date.getTime());
            this.year   = valid ? String(date!.getUTCFullYear())  : '';
            this.month  = valid ? String(date!.getUTCMonth() + 1) : '';
            this.day    = valid ? String(date!.getUTCDate())      : '';
        });

        reaction(
            () => this.currentValue,
            value => {
                if (value instanceof Date) {
                    this.props.onChange!({value});
                }
            }
        );
    }

    public render() {
        const rootProps = root(this.props, {'data-automation-id': 'BIRTHDAY_PICKER', 'className': ''});

        return (
            <span {...rootProps}>
                <Select
                    automationId="BIRTHDAY_PICKER_DAY"
                    value={this.day}
                    placeholder="Day"
                    options={this.dayOptions}
                    onChange={this.handleDayChange}
                />
                <Select
                    automationId="BIRTHDAY_PICKER_MONTH"
                    value={this.month}
                    placeholder="Month"
                    options={this.monthOptions}
                    onChange={this.handleMonthChange}
                />
                <Select
                    automationId="BIRTHDAY_PICKER_YEAR"
                    value={this.year}
                    placeholder="Year"
                    options={this.yearOptions}
                    onChange={this.handleYearChange}
                />
            </span>
        );
    }

    private handleYearChange = (event: React.FormEvent<HTMLSelectElement>) =>
        (this.year = event.currentTarget.value)
    private handleMonthChange = (event: React.FormEvent<HTMLSelectElement>) =>
        (this.month = event.currentTarget.value)
    private handleDayChange = (event: React.FormEvent<HTMLSelectElement>) =>
        (this.day = event.currentTarget.value)
}
