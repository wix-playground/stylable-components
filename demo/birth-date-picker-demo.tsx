import React = require('react');
import {BirthDatePicker, BirthDatePickerDate} from '../src';

export const initialValue = { year: 2001, month: 9, day: undefined };
export const minDate = new Date("1900-01-01Z");
export const maxDate = new Date();

export class BirthDatePickerDemo extends React.Component<{}, {value: BirthDatePickerDate}> {
    constructor() {
        super();
        this.state = {value: initialValue};
    }

    handleChange = (newValue: BirthDatePickerDate) => {
        this.setState({value: newValue});
    };

    render() {
        return <BirthDatePicker value={this.state.value} minDate={minDate} maxDate={maxDate} onChange={this.handleChange} />;
    }
}
