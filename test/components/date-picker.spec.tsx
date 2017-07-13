import * as React from 'react';
import {expect, ClientRenderer, sinon, simulate, waitForDom, waitFor} from 'test-drive-react';
import {DatePicker, getDayNames} from '../../src';
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
            const {select, waitForDom} = clientRenderer.render(<DatePicker date={new Date(2017, 0, 1)} />);
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
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(2017, 0, 1)} />);

            return waitForDom(() => expect(select('YEAR')).to.have.text('2017'));
        });

        it('displays the name of the month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(2017, 0, 1)} />);

            return waitForDom(() => expect(select('MONTH_NAME')).to.have.text('January'));
        });

        it('displays the days of the week', function () {
            const dayNames = getDayNames();
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(2017, 0, 1)} />);

            return waitForDom(() => {
               for (let i = 0; i < dayNames.length; i++) {
                   expect(select('DAY_NAME_' + dayNames[i])).to.have.text(dayNames[i]);
               }
            });
        });

        it('has a button which steps forward a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(2017, 11, 1)} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('December');
            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2018');
                expect(select('MONTH_NAME')).to.have.text('January');
            });
        });

        it('has a button which steps back a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={new Date(2017, 0, 1)} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('January');
            simulate.mouseDown(select('PREV_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2016');
                expect(select('MONTH_NAME')).to.have.text('December');
            });
        });
    });
});
