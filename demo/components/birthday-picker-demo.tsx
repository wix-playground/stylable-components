import React = require("react");
import {observable} from "mobx";
import {observer} from "mobx-react";
import {BirthdayPicker} from "../../src";

export const initialValue = new Date("1969-07-26T00:00Z");
export const minDate = new Date("1900-06-06T00:00Z");
export const maxDate = new Date();

@observer
export class BirthdayPickerDemo extends React.Component<{}, {}> {
    @observable value: Date = initialValue;

    render() {
        const date = this.value;
        const formattedDate = date ? date.toISOString().substr(0, 10) : "";

        return (
            <section>
                <BirthdayPicker
                    value={date}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={newValue => this.value = newValue}
                />
                <span data-automation-id="BIRTHDAY_PICKER_DEMO_RESULT">
                    {date ? "Selected date: " + formattedDate : "Date not selected"}
                </span>
            </section>
        );
    }
}
