import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';

export interface DatePickerDemoState {
    value: Date;
}

export class DatePickerDemo extends React.Component<Partial<DatePickerProps>, DatePickerDemoState> {
    public componentWillMount() {
        this.setState({ value: this.props.value ? this.props.value : new Date() });
    }

    public render() {
        return (
            <div>
                <h3>Basic DatePicker</h3>
                <span data-automation-id="CURRENT_DATE">
                    {this.state.value.toDateString()}
                </span>
                <DatePicker
                    placeholder="mm/dd/yyyy"
                    value={this.state.value}
                    onChange={this.onChange}
                    {...this.props}
                />
            </div>
        );
    }

    private onChange = (updatedDate: Date): void => {
        this.setState({value: updatedDate });
    }
}
