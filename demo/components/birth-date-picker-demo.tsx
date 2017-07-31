import React = require("react");
import {observable} from "mobx";
import {observer} from "mobx-react";
import {BirthDatePicker} from "../../src";

export const initialValue = new Date("1969-07-26T00:00Z");
export const minDate = new Date("1900-06-06T00:00Z");
export const maxDate = new Date();

@observer
export class BirthDatePickerDemo extends React.Component<{}, {}> {
    @observable value: Date = initialValue;

    render() {
        const date = this.value;
        const formattedDate = date ? date.toISOString().substr(0, 10) : "";

        return (
            <section>
                <BirthDatePicker
                    value={date}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={newValue => this.value = newValue}
                />
                <span data-automation-id="BIRTH_DATE_PICKER_DEMO_RESULT">
                    {date ? "Selected date: " + formattedDate : "Date not selected"}
                </span>
            </section>
        );
    }
}
