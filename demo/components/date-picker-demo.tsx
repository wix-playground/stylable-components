import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';

export interface DatePickerDemoProps extends Partial<DatePickerProps> {}

export interface DatePickerDemoState {
    value: Date;
}

export class DatePickerDemo extends React.Component<DatePickerDemoProps, DatePickerDemoState> {
    componentWillMount () {
        this.setState({ value: this.props.value ? this.props.value : new Date() });
    }

    onChange = (updatedDate: Date): void => {
        this.setState({value: updatedDate });
    };

    render () {
        return <DatePicker placeholder="mm/dd/yyyy" value={this.state.value} onChange={this.onChange} {...this.props} />;
    }
}
