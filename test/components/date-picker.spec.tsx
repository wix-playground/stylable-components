import * as React from 'react';
import {expect, ClientRenderer, simulate, selectDom} from 'test-drive-react';
import {DatePicker, getDayNames, getMonthFromOffset, getDaysInMonth} from '../../src';
import {DatePickerDemo} from '../../demo/date-picker-demo';
import {KeyCodes} from '../../src/common/key-codes';

const datePickerId = 'DATE_PICKER';
const datePickerInputId = 'DATE_PICKER_INPUT';
const datePickerDropdownId = 'DATE_PICKER_DROPDOWN';

describe('The DatePicker Component', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    const JANUARY_FIRST = new Date(2017, 0, 1);
    const FEBRUARY_FIRST = new Date(2017, 1, 1);
    const MARCH_FIRST  = new Date(2017, 2, 1);
    const DECEMBER_FIRST = new Date(2017, 11, 1);

    const simulateChange = (domElememt: Element, value: string) => {
        (domElememt as HTMLInputElement).value = value;
        simulate.change(domElememt);
    };

    describe('A Typical User', function () {
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
            const {select, waitForDom} = clientRenderer.render(<DatePicker date={JANUARY_FIRST} />);
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

    it('should use a provided value', function () {
        const {select, waitForDom} = clientRenderer.render(<DatePicker date={JANUARY_FIRST} />);

        return waitForDom(() => expect(select(datePickerInputId)).to.have.value(JANUARY_FIRST.toDateString()));
    });

    it('should use a provided placeholder', function () {
        const {select, waitForDom} = clientRenderer.render(<DatePicker placeholder="mm/dd/yyyy" />);

        return waitForDom(() => expect(select(datePickerInputId)).to.have.attribute('placeholder', 'mm/dd/yyyy'));
    });

    it('should show and hide the dropdown when the input is clicked', async function () {
        const {select, waitForDom} = clientRenderer.render(<DatePicker />);
        const datePickerInput = select(datePickerInputId);

        await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());

        simulate.mouseDown(datePickerInput);

        await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

        simulate.mouseDown(datePickerInput);

        return await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());
    });

    it('should defualt to the current date if an initial date is not provided', function () {
        const expectedDate = new Date().toDateString();
        const {result} = clientRenderer.render(<DatePicker />);
        const datePickerInstance = result as DatePicker;
        const defaultDate = new Date(datePickerInstance.currentDate).toDateString();

        expect(defaultDate).to.equal(expectedDate);
    });

    describe('The Dropdown', function () {
        const dayNames: Array<string> = getDayNames();
        const days: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

        it('should display the days properly for a fixed month', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={FEBRUARY_FIRST} />);

            await waitForDom(() => dayNames.forEach(name => expect(select(datePickerDropdownId)).to.contain.text(name)));
            return await waitForDom(() => days.forEach(day => expect(select(datePickerDropdownId)).to.contain.text(day)));
        });

        it('should display the day names in horizontal sequence, and vertically aligned', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={JANUARY_FIRST} />);

            const dayNameIds = dayNames.map(name => 'DAY_NAME_' + name);

            return waitForDom(() => {
                const dayNameElements = dayNameIds.map((name, index) => {
                    const element: Element = select(name)!;
                    expect(element).to.have.text(dayNames[index]);
                    return element;
                });

                expect(dayNameElements).to.be.inHorizontalSequence();
                expect(dayNameElements).to.be.verticallyAligned('center', 1.5);
            });
        });

        function elementsInRow (row: number) {
            const rowElements = [];
            for (let i = 1; i <= 7; i++) {
                rowElements.push(selectDom(document.body, 'DAY_' + (((row - 1) * 7) + i - 1)));
            }
            return rowElements;
        }

        function elementsInColumn (column: number) {
            const columnElements = [];
            for (let i = 1; i <= 5; i++) {
                const elementSelector = 'DAY_' + ((7 * (i - 1)) + column - 1);
                columnElements.push(selectDom(document.body, elementSelector));
            }
            return columnElements;
        }

        it('should display the days in a grid', function () {
            clientRenderer.render(<DatePicker date={MARCH_FIRST} showDropdown={true}/>);

            // Check that the days are displayed in 5 rows (checking that each row is in horizontal sequence
            expect(elementsInRow(1)).to.be.inHorizontalSequence();
            expect(elementsInRow(2)).to.be.inHorizontalSequence();
            expect(elementsInRow(3)).to.be.inHorizontalSequence();
            expect(elementsInRow(4)).to.be.inHorizontalSequence();
            expect(elementsInRow(5)).to.be.inHorizontalSequence();
            expect(elementsInRow(1)).to.be.verticallyAligned('center');
            expect(elementsInRow(2)).to.be.verticallyAligned('center');
            expect(elementsInRow(3)).to.be.verticallyAligned('center');
            expect(elementsInRow(4)).to.be.verticallyAligned('center');
            expect(elementsInRow(5)).to.be.verticallyAligned('center');

            // Check that the days are displayed in 7 columns
            expect(elementsInColumn(1)).to.be.inVerticalSequence();
            expect(elementsInColumn(2)).to.be.inVerticalSequence();
            expect(elementsInColumn(3)).to.be.inVerticalSequence();
            expect(elementsInColumn(4)).to.be.inVerticalSequence();
            expect(elementsInColumn(5)).to.be.inVerticalSequence();
            expect(elementsInColumn(6)).to.be.inVerticalSequence();
            expect(elementsInColumn(7)).to.be.inVerticalSequence();
            expect(elementsInColumn(1)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(2)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(3)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(4)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(5)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(6)).to.be.horizontallyAligned('center');
            expect(elementsInColumn(7)).to.be.horizontallyAligned('center');
        });


        it('displays the year', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={JANUARY_FIRST} />);

            return waitForDom(() => expect(select('YEAR')).to.have.text('2017'));
        });

        it('displays the name of the month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={JANUARY_FIRST} />);

            return waitForDom(() => expect(select('MONTH_NAME')).to.have.text('January'));
        });

        it('displays the days of the week', function () {
            const dayNames = getDayNames();
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={JANUARY_FIRST} />);

            return waitForDom(() => {
               for (let i = 0; i < dayNames.length; i++) {
                   expect(select('DAY_NAME_' + dayNames[i])).to.have.text(dayNames[i]);
               }
            });
        });

        it('has a button which steps forward a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={DECEMBER_FIRST} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('December');
            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2018');
                expect(select('MONTH_NAME')).to.have.text('January');
            });
        });

        it('has a button which steps back a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePicker showDropdown={true} date={JANUARY_FIRST} />);

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

    describe('The Helper Functions', function () {
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
