import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';

export interface DatePickerDemoProps extends Partial<DatePickerProps> {}

export class DatePickerDemo extends React.Component<DatePickerDemoProps, {}> {
    date: Date = this.props.value ? this.props.value : new Date();

    onChange = (updatedDate: Date): void => {
        this.date = updatedDate;
    };

    render () {
        return <DatePicker placeholder="mm/dd/yyyy" value={this.date} onChange={this.onChange} {...this.props} />;
    }
}
