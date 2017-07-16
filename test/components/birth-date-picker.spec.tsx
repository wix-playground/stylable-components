import * as React from "react";
import { ClientRenderer, expect, sinon, waitFor, change } from "test-drive-react";
import { BirthDatePicker, dateFromYearMonthDay } from "../../src";
import { BirthDatePickerDemo } from "../../demo/components/birth-date-picker-demo";

describe("<BirthDatePicker />", () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it("Displays the date and allows changing it", async function() {
        const { select, waitForDom } = clientRenderer.render(<BirthDatePickerDemo />);

        await waitForDom(() => {
            expect(select("BIRTH_DATE_PICKER")).to.be.present();
        });

        change(select("BIRTH_DATE_PICKER_YEAR"), "2002");
        change(select("BIRTH_DATE_PICKER_MONTH"), "10");
        change(select("BIRTH_DATE_PICKER_DAY"), "12");

        await waitFor(() => {
            expect(select("BIRTH_DATE_PICKER_DEMO_RESULT")).to.contain.text("Selected date: 2002-10-12");
        });

        change(select("BIRTH_DATE_PICKER_DAY"), "");
        await waitFor(() => {
            expect(select("BIRTH_DATE_PICKER_DEMO_RESULT")).to.contain.text("Selected date: 2002-10-12");
        });
    });

    it("Renders with default props", function () {
        const { select, waitForDom } = clientRenderer.render(<BirthDatePicker />);

        return waitForDom(() => {
            expect(select("BIRTH_DATE_PICKER")).to.be.present();
            expect(select("BIRTH_DATE_PICKER_YEAR")).to.have.value("");
            expect(select("BIRTH_DATE_PICKER_MONTH")).to.have.value("");
            expect(select("BIRTH_DATE_PICKER_DAY")).to.have.value("");
        });
    });

    it("Displays the provided date", function() {
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={new Date("1986-04-26Z")} />
        );

        return waitForDom(() => {
            expect(select("BIRTH_DATE_PICKER_YEAR")).to.have.value("1986");
            expect(select("BIRTH_DATE_PICKER_MONTH")).to.have.value("4");
            expect(select("BIRTH_DATE_PICKER_DAY")).to.have.value("26");
        });
    });

    it("Does not emit onChange for initial value", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={new Date()} onChange={onChange} />
        );

        return waitForDom(() => {
            expect(onChange).to.have.not.been.called;
        });
    });

    it("Emits onChange when going from valid to valid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={new Date("1986-04-26Z")} onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_DAY"), "27");
            expect(onChange).to.have.been.calledOnce.and.calledWith(new Date("1986-04-27Z"));
        });
    });

    it("Does not emit onChange when going from valid to invalid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={new Date()} onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_MONTH"), "");
            expect(onChange).to.have.not.been.called;
        });
    });

    it("Does not emit onChange when going from invalid to invalid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_MONTH"), "03");
            expect(onChange).to.have.not.been.called;
        });
    });

    it("Emits onChange when going from invalid to valid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_YEAR"), "1986");
            change(select("BIRTH_DATE_PICKER_MONTH"), "04");
            change(select("BIRTH_DATE_PICKER_DAY"), "26");
            expect(onChange).to.have.been.calledOnce.and.calledWith(new Date("1986-04-26Z"));
        });
    });

    describe("Validates the date", function() {
        it("Supports full range of dates", function() {
            expect(dateFromYearMonthDay("1000", "01", "01")).to.be.instanceOf(Date);
            expect(dateFromYearMonthDay("9999", "12", "31")).to.be.instanceOf(Date);
        });

        it("Supports leap years", function() {
            expect(dateFromYearMonthDay("1984", "02", "29")).to.be.instanceOf(Date);
        });

        it("Allows to omit leading zeroes for month and day, but not for year", function() {
            expect(dateFromYearMonthDay("1987", "4", "6")).to.be.instanceOf(Date);
            expect(dateFromYearMonthDay("17", "04", "26")).to.be.undefined;
        });

        it("Doesn't round up out-of-range dates to the next month", function() {
            expect(dateFromYearMonthDay("1987", "02", "29")).to.be.undefined;
            expect(dateFromYearMonthDay("1987", "04", "31")).to.be.undefined;
        });

        it("Doesn't attempt to correct invalid data", function() {
            expect(dateFromYearMonthDay("1987", "4.5", "26")).to.be.undefined;
            expect(dateFromYearMonthDay("1987", "-4", "26")).to.be.undefined;
            expect(dateFromYearMonthDay("1987", "4x", "26")).to.be.undefined;
        });
    });
});
