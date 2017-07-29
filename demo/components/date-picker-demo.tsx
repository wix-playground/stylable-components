import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

export interface DatePickerDemoProps extends Partial<DatePickerProps> {}

@observer
export class DatePickerDemo extends React.Component<DatePickerDemoProps, {}> {
    @observable date: Date = this.props.value ? this.props.value : new Date();

    @action
    onChange = (updatedDate: Date): void => {
        this.date = updatedDate;
    };

    render () {
        return <DatePicker placeholder="mm/dd/yyyy" value={this.date} onChange={this.onChange} {...this.props} />;
    }
}
