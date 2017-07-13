import * as React from "react";
import { ClientRenderer, expect, sinon, waitFor, change } from "test-drive-react";
import { BirthDatePicker, dateFromYearMonthDay } from "../../src";
import { BirthDatePickerDemo } from "../../demo/components/birth-date-picker-demo";

describe("<BirthDatePicker />", () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it("Displays the provided date and allows changing it", async function() {
        const { select, waitForDom } = clientRenderer.render(<BirthDatePickerDemo />);

        await waitForDom(() => {
            expect(select("BIRTH_DATE_PICKER")).to.be.present();
        });

        const yearInput = select("BIRTH_DATE_PICKER_YEAR");
        const monthInput = select("BIRTH_DATE_PICKER_MONTH");
        const dayInput = select("BIRTH_DATE_PICKER_DAY");

        expect(yearInput).to.have.value("2001");
        expect(monthInput).to.have.value("9");
        expect(dayInput).to.have.value("11");

        change(yearInput, "2002");
        change(monthInput, "10");
        change(dayInput, "12");

        return waitFor(() => {
            expect(yearInput).to.have.value("2002");
            expect(monthInput).to.have.value("10");
            expect(dayInput).to.have.value("12");
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
        const value = new Date("1987-04-26Z");
        const { select, waitForDom } = clientRenderer.render(<BirthDatePicker value={value} />);

        return waitForDom(() => {
            expect(select("BIRTH_DATE_PICKER_YEAR")).to.have.value("1987");
            expect(select("BIRTH_DATE_PICKER_MONTH")).to.have.value("4");
            expect(select("BIRTH_DATE_PICKER_DAY")).to.have.value("26");
        });
    });


    it("Emits onChange when going from valid to invalid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={new Date()} onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_MONTH"), "");
            expect(onChange).to.have.been.calledOnce.and.calledWith(undefined);
        });
    });

    it("Emits onChange when going from invalid to valid state", function() {
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker onChange={onChange} />
        );

        return waitForDom(() => {
            change(select("BIRTH_DATE_PICKER_YEAR"), "1987");
            change(select("BIRTH_DATE_PICKER_MONTH"), "04");
            change(select("BIRTH_DATE_PICKER_DAY"), "26");
            expect(onChange).to.have.been.calledOnce.and.calledWith(new Date("1987-04-26Z"));
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
