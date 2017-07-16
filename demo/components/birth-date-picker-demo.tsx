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
        const date = this.state.value;
        const formattedDate = date ? date.toISOString().substr(0, 10) : "";

        return (
            <section>
                <BirthDatePicker
                    value={date}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={this.handleChange}
                />
                <span data-automation-id="BIRTH_DATE_PICKER_DEMO_RESULT">
                    {date ? "Selected date: " + formattedDate : "Date not selected"}
                </span>
            </section>
        );
    }
}
