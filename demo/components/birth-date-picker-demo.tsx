import React = require("react");
import {BirthDatePicker} from "../../src";

export const initialValue = new Date("2001-09-11Z");
export const minDate = new Date("1900-06-06Z");
export const maxDate = new Date();

export class BirthDatePickerDemo extends React.Component<{}, {value: Date}> {
    constructor() {
        super();
        this.state = {value: initialValue};
    }

    handleChange = (newValue: Date) => {
        this.setState({value: newValue});
    };

    render() {
        return (
            <BirthDatePicker
                value={this.state.value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={this.handleChange}
            />
        );
    }
}
