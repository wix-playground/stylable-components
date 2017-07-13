import * as React from 'react';
import {expect, ClientRenderer, sinon, simulate, waitForDom, waitFor} from 'test-drive-react';
import {DatePicker, getDayNames, getMonthFromOffset, getDaysInMonth} from '../../src';
import {DatePickerDemo} from '../../demo/date-picker-demo';
import {KeyCodes} from '../../src/common/key-codes';

const datePickerId = 'DATE_PICKER';
const datePickerInputId = 'DATE_PICKER_INPUT';
const datePickerDropdownId = 'DATE_PICKER_DROPDOWN';

describe('The DatePicker component', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    const simulateChange = (domElememt: Element, value: string) => {
        (domElememt as HTMLInputElement).value = value;
        simulate.change(domElememt);
    };

    describe('A typical user', function () {
        it('writes into the date picker input field, presses enter, and expects the date picker input to have the proper value', () => {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo />);

            const datePickerInput = select(datePickerInputId);
            simulateChange(datePickerInput!, '2017-02-01');
            simulate.keyDown(datePickerInput, { keyCode: KeyCodes.ENTER });

            return waitForDom(() => expect(datePickerInput).to.have.value('Wed Feb 01 2017'));
        });

        it('writes into the date picker input field, focuses elsewhere, and expects the date picker input to have the proper value', () => {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo />);

            const datePickerInput = select(datePickerInputId);
            simulateChange(datePickerInput!, '2017-02-01');
            simulate.blur(datePickerInput);

            return waitForDom(() => expect(datePickerInput).to.have.value('Wed Feb 01 2017'));
        });

        it('clicks on the input, picks a date from the dropdown, and then expects the dropdown to close and the date to appear in the input', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker date={new Date(Date.UTC(2017, 0, 1))} />);
            const datePickerInput = select(datePickerInputId);

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());

            simulate.focus(datePickerInput);

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(select('DAY_4'));

            return await waitForDom(() => {
                expect(select(datePickerDropdownId)).to.be.absent();
                expect(datePickerInput).to.have.value('Wed Jan 04 2017')
            });
        });
    });

    describe('The Dropdown', function () {
        it('displays the year', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(Date.UTC(2017, 0, 1))} />);

            return waitForDom(() => expect(select('YEAR')).to.have.text('2017'));
        });

        it('displays the name of the month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(Date.UTC(2017, 0, 1))} />);

            return waitForDom(() => expect(select('MONTH_NAME')).to.have.text('January'));
        });

        it('displays the days of the week', function () {
            const dayNames = getDayNames();
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(Date.UTC(2017, 0, 1))} />);

            return waitForDom(() => {
               for (let i = 0; i < dayNames.length; i++) {
                   expect(select('DAY_NAME_' + dayNames[i])).to.have.text(dayNames[i]);
               }
            });
        });

        it('has a button which steps forward a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(Date.UTC(2017, 11, 1))} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('December');
            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2018');
                expect(select('MONTH_NAME')).to.have.text('January');
            });
        });

        it('has a button which steps back a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(Date.UTC(2017, 0, 1))} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('January');
            simulate.mouseDown(select('PREV_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2016');
                expect(select('MONTH_NAME')).to.have.text('December');
            });
        });

        it('should stay open when the next or previous month buttons are clicked', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} />);

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(select('PREV_MONTH_BUTTON'));

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());
        });
    });

    describe('The helper functions', function () {
        it('getMonthFromOffset should return the next month when the second argument is 1', function () {
            const currentDate = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(currentDate, 1);

            expect(nextMonth.getMonth()).to.equal(currentDate.getMonth() + 1);
        });

        it('getMonthFromOffset should return the previous month when the second argument is -1', function () {
            const currentDate = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(currentDate, -1);

            expect(nextMonth.getMonth()).to.equal(currentDate.getMonth() - 1);
        });

        it('getMonthFromOffset should handle the year changing when moving forward a month', function () {
            const currentDate = new Date('Dec 6 2016');
            const nextMonth = getMonthFromOffset(currentDate, 1);

            expect(nextMonth.getFullYear()).to.equal(currentDate.getFullYear() + 1);
            expect(nextMonth.getMonth()).to.equal(0);
        });

        it('getMonthFromOffset should handle the year changing when moving back a month', function () {
            const currentDate = new Date('Jan 6 2018');
            const nextMonth = getMonthFromOffset(currentDate, -1);

            expect(nextMonth.getFullYear()).to.equal(currentDate.getFullYear() - 1);
            expect(nextMonth.getMonth()).to.equal(11);
        });

        it('getDaysInMonth should return the number of days in a given month', function () {
            const dateOne = getDaysInMonth(new Date('Feb 18 2017'));
            const dateTwo = getDaysInMonth(new Date('Jun 5 2016'));
            const dateThree = getDaysInMonth(new Date('Jan 28, 2017'));

            expect(dateOne).to.equal(28);
            expect(dateTwo).to.equal(30);
            expect(dateThree).to.equal(31);
        });
    });
});
