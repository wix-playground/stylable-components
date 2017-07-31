import * as React from 'react';
import {expect, ClientRenderer, simulate, selectDom} from 'test-drive-react';
import {getDayNames, getMonthFromOffset, getDaysInMonth, getNumOfPreviousDays, getNumOfFollowingDays} from '../../src/common/date-helpers';
import {DatePickerDemo} from '../../demo/components/date-picker-demo';
import {KeyCodes} from '../../src/common/key-codes';
import {debug} from "util";

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

            const datePickerInput = select('BASIC_DATEPICKER', datePickerInputId);
            simulateChange(datePickerInput!, '2017-02-01');
            simulate.keyDown(datePickerInput, { keyCode: KeyCodes.ENTER });

            return waitForDom(() => expect(datePickerInput).to.have.value('Wed Feb 01 2017'));
        });

        it('writes into the date picker input field, focuses elsewhere, and expects the date picker input to have the proper value', () => {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo />);

            const datePickerInput = select('BASIC_DATEPICKER', datePickerInputId);
            simulateChange(datePickerInput!, '2017-02-01');
            simulate.blur(datePickerInput);

            return waitForDom(() => expect(datePickerInput).to.have.value('Wed Feb 01 2017'));
        });

        it('clicks on the input, picks a date from the dropdown, and then expects the dropdown to close and the date to appear in the input', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} openOnFocus={true} />);
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

        it('clicks on the input, navigates to a date using the arrow keys, and then expects the dropdown to close and the date to appear in the input', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} openOnFocus={true} />);
            const datePickerInput = select(datePickerInputId);

            simulate.focus(datePickerInput);

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            // Advance one week
            simulate.keyDown(datePickerInput, { keyCode: KeyCodes.DOWN });
            simulate.keyDown(datePickerInput, { keyCode: KeyCodes.ENTER });

            return await waitForDom(() => {
                expect(select(datePickerDropdownId)).to.be.absent();
                expect(datePickerInput).to.have.value('Sun Jan 08 2017')
            });
        });
    });

    it('should use a provided value', function () {
        const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} />);

        return waitForDom(() => expect(select(datePickerInputId)).to.have.value(JANUARY_FIRST.toDateString()));
    });

    it('should use a provided placeholder', function () {
        const {select, waitForDom} = clientRenderer.render(<DatePickerDemo placeholder="mm/dd/yyyy" />);

        return waitForDom(() => expect(select(datePickerInputId)).to.have.attribute('placeholder', 'mm/dd/yyyy'));
    });

    it('should show and hide the dropdown when the input is clicked', async function () {
        const {select, waitForDom} = clientRenderer.render(<DatePickerDemo />);
        const datePickerInput = select(datePickerInputId);

        await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());

        simulate.click(datePickerInput);

        await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

        simulate.click(datePickerInput);

        return await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());
    });

    describe('The Dropdown', function () {
        const dayNames: Array<string> = getDayNames();
        const days: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

        it('should display the days for a fixed month', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={FEBRUARY_FIRST} showDropdownOnInit={true} />);

            await waitForDom(() => dayNames.forEach(name => expect(select(datePickerDropdownId)).to.contain.text(name)));
            return await waitForDom(() => days.forEach(day => expect(select(datePickerDropdownId)).to.contain.text(day)));
        });

        it('should show the next and previous month buttons horizontally aligned with the month and year', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} showDropdownOnInit={true} />);

            return waitForDom(() => {
               expect([select('PREV_MONTH_BUTTON'), select('MONTH_NAME'), select('YEAR'), select('NEXT_MONTH_BUTTON')]).to.be.verticallyAligned('center', 1);
            });
        });

        it('should display the day names in horizontal sequence, and vertically aligned', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} showDropdownOnInit={true} />);

            const dayNameIds = dayNames.map(name => 'DAY_NAME_' + name.toUpperCase());

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
            const select = selectDom(document.body);

            for (let i = 1; i < 7; i++) {
                rowElements.push(select('DAY_' + (((row - 1) * 7) + i)));
            }

            return rowElements;
        }

        function elementsInColumn (column: number) {
            const columnElements = [];
            const select = selectDom(document.body);

            for (let i = 1; i <= 5; i++) {
                columnElements.push(select('DAY_' + ((7 * (i - 1)) + column)));
            }

            return columnElements;
        }

        it('should display the days in a grid', function () {
            clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} showDropdownOnInit={true}/>);

            // Check that the days are displayed in rows (checking that each row is in horizontal sequence
            expect(elementsInRow(1)).to.be.inHorizontalSequence();
            expect(elementsInRow(1)).to.be.verticallyAligned('center');

            // Check that the days are displayed in columns
            expect(elementsInColumn(1)).to.be.inVerticalSequence();
            expect(elementsInColumn(1)).to.be.horizontallyAligned('center');
        });

        it('should show the days starting on the correct day of the week', function () {
            const {select} = clientRenderer.render(<DatePickerDemo value={MARCH_FIRST} showDropdownOnInit={true} />);

            expect([select('DAY_1'), select('DAY_NAME_WED')]).to.be.horizontallyAligned('center');
        });

        it('should show the trailing days from the last and next months', function () {
            const {select} = clientRenderer.render(<DatePickerDemo value={MARCH_FIRST} showDropdownOnInit={true} />);

            expect(select('PREV_DAY_26')).to.be.present();
            expect(select('PREV_DAY_27')).to.be.present();
            expect(select('PREV_DAY_28')).to.be.present();
            expect(select('NEXT_DAY_1')).to.be.present();

        });

        it('displays the year', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} value={JANUARY_FIRST} />);

            return waitForDom(() => expect(select('YEAR')).to.have.text('2017'));
        });

        it('displays the name of the month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} value={JANUARY_FIRST} />);

            return waitForDom(() => expect(select('MONTH_NAME')).to.have.text('January'));
        });

        it('displays the days of the week', function () {
            const dayNames = getDayNames();
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} value={JANUARY_FIRST} />);

            return waitForDom(() => {
               for (let i = 0; i < dayNames.length; i++) {
                   expect(select('DAY_NAME_' + dayNames[i].toUpperCase())).to.have.text(dayNames[i]);
               }
            });
        });

        it('has a button which steps forward a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} value={DECEMBER_FIRST} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('December');
            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2018');
                expect(select('MONTH_NAME')).to.have.text('January');
            });
        });

        it('has a button which steps back a month', function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} value={JANUARY_FIRST} />);

            expect(select('YEAR')).to.have.text('2017');
            expect(select('MONTH_NAME')).to.have.text('January');
            simulate.mouseDown(select('PREV_MONTH_BUTTON'));

            return waitForDom(() => {
                expect(select('YEAR')).to.have.text('2016');
                expect(select('MONTH_NAME')).to.have.text('December');
            });
        });

        it('should stay open when the next or previous month buttons are clicked', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo showDropdownOnInit={true} />);

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(select('PREV_MONTH_BUTTON'));

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(select('NEXT_MONTH_BUTTON'));

            return await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());
        });

        it('should appear when the Enter key is pressed and the openOnFocus property is set to false', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo openOnFocus={false} />);

            simulate.focus(select(datePickerInputId));

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());

            simulate.keyDown(select(datePickerInputId), { keyCode: KeyCodes.ENTER });

            return await waitForDom(() => expect(select(datePickerDropdownId)).to.be.present());
        });

        it('should appear when the Spacebar is pressed and the openOnFocus property is set to false', async function () {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo openOnFocus={false} />);

            simulate.focus(select(datePickerInputId));

            await waitForDom(() => expect(select(datePickerDropdownId)).to.be.absent());

            simulate.keyDown(select(datePickerInputId), { keyCode: KeyCodes.SPACE });

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

        it('getNumOfPreviousDays should return the number of days to display for the previous month', function () {
            // Sunday is the default starting day
            const dateOne = getNumOfPreviousDays(new Date('Feb 18 2017'));
            const dateTwo = getNumOfPreviousDays(new Date('Jun 5 2017'));
            const dateThree = getNumOfPreviousDays(new Date('July 5 2017'));
            const dateFour = getNumOfPreviousDays(new Date('September 5 2019'));

            expect(dateOne).to.equal(3);
            expect(dateTwo).to.equal(4);
            expect(dateThree).to.equal(6);
            expect(dateFour).to.equal(0);
        });

        it('getNumOfPreviousDays should handle starting on different days of the week', function () {
            const dateToTest = new Date('July 5 2017');
            const secondDateToTest = new Date('September 5 2017');
            const thirdDateToTest = new Date('October 5 2017');
            const fourthDateToTest = new Date('August 5 2019');

            const mondayStart = getNumOfPreviousDays(dateToTest, 1);
            const tuesdayStart = getNumOfPreviousDays(dateToTest, 2);
            const wednesdayStart = getNumOfPreviousDays(dateToTest, 3);
            const thursdayStart = getNumOfPreviousDays(dateToTest, 4);
            const fridayStart = getNumOfPreviousDays(dateToTest, 5);
            const saturdayStart = getNumOfPreviousDays(dateToTest, 6);

            const mondayStart2 = getNumOfPreviousDays(secondDateToTest, 1);
            const tuesdayStart2 = getNumOfPreviousDays(secondDateToTest, 2);
            const wednesdayStart2 = getNumOfPreviousDays(secondDateToTest, 3);
            const thursdayStart2 = getNumOfPreviousDays(secondDateToTest, 4);
            const fridayStart2 = getNumOfPreviousDays(secondDateToTest, 5);
            const saturdayStart2 = getNumOfPreviousDays(secondDateToTest, 6);

            const mondayStart3 = getNumOfPreviousDays(thirdDateToTest, 1);
            const tuesdayStart3 = getNumOfPreviousDays(thirdDateToTest, 2);
            const wednesdayStart3 = getNumOfPreviousDays(thirdDateToTest, 3);
            const thursdayStart3 = getNumOfPreviousDays(thirdDateToTest, 4);
            const fridayStart3 = getNumOfPreviousDays(thirdDateToTest, 5);
            const saturdayStart3 = getNumOfPreviousDays(thirdDateToTest, 6);

            const mondayStart4 = getNumOfPreviousDays(fourthDateToTest, 1);
            const tuesdayStart4 = getNumOfPreviousDays(fourthDateToTest, 2);
            const wednesdayStart4 = getNumOfPreviousDays(fourthDateToTest, 3);
            const thursdayStart4 = getNumOfPreviousDays(fourthDateToTest, 4);
            const fridayStart4 = getNumOfPreviousDays(fourthDateToTest, 5);
            const saturdayStart4 = getNumOfPreviousDays(fourthDateToTest, 6);


            expect(mondayStart).to.equal(5);
            expect(tuesdayStart).to.equal(4);
            expect(wednesdayStart).to.equal(3);
            expect(thursdayStart).to.equal(2);
            expect(fridayStart).to.equal(1);
            expect(saturdayStart).to.equal(0);

            expect(mondayStart2).to.equal(4);
            expect(tuesdayStart2).to.equal(3);
            expect(wednesdayStart2).to.equal(2);
            expect(thursdayStart2).to.equal(1);
            expect(fridayStart2).to.equal(0);
            expect(saturdayStart2).to.equal(6);

            expect(mondayStart3).to.equal(6);
            expect(tuesdayStart3).to.equal(5);
            expect(wednesdayStart3).to.equal(4);
            expect(thursdayStart3).to.equal(3);
            expect(fridayStart3).to.equal(2);
            expect(saturdayStart3).to.equal(1);

            expect(mondayStart4).to.equal(3);
            expect(tuesdayStart4).to.equal(2);
            expect(wednesdayStart4).to.equal(1);
            expect(thursdayStart4).to.equal(0);
            expect(fridayStart4).to.equal(6);
            expect(saturdayStart4).to.equal(5);
        });

        it('getNumOfFollowingDays should return the number of days to display for the next month', function () {
            // Sunday is the default starting day
            const dateOne = getNumOfFollowingDays(new Date('Feb 18 2017'));
            const dateTwo = getNumOfFollowingDays(new Date('Jun 5 2017'));
            const dateThree = getNumOfFollowingDays(new Date('July 5 2017'));
            const dateFour = getNumOfFollowingDays(new Date('September 5 2019'));

            expect(dateOne).to.equal(4);
            expect(dateTwo).to.equal(1);
            expect(dateThree).to.equal(5);
            expect(dateFour).to.equal(5);
        });

        it('getNumOfFollowingDays should handle starting on different days of the week', function () {
            const dateToTest = new Date('July 5 2017');
            const secondDateToTest = new Date('September 5 2017');
            const thirdDateToTest = new Date('October 5 2017');
            const fourthDateToTest = new Date('August 5 2019');

            const mondayStart = getNumOfFollowingDays(dateToTest, 1);
            const tuesdayStart = getNumOfFollowingDays(dateToTest, 2);
            const wednesdayStart = getNumOfFollowingDays(dateToTest, 3);
            const thursdayStart = getNumOfFollowingDays(dateToTest, 4);
            const fridayStart = getNumOfFollowingDays(dateToTest, 5);
            const saturdayStart = getNumOfFollowingDays(dateToTest, 6);

            const mondayStart2 = getNumOfFollowingDays(secondDateToTest, 1);
            const tuesdayStart2 = getNumOfFollowingDays(secondDateToTest, 2);
            const wednesdayStart2 = getNumOfFollowingDays(secondDateToTest, 3);
            const thursdayStart2 = getNumOfFollowingDays(secondDateToTest, 4);
            const fridayStart2 = getNumOfFollowingDays(secondDateToTest, 5);
            const saturdayStart2 = getNumOfFollowingDays(secondDateToTest, 6);

            const mondayStart3 = getNumOfFollowingDays(thirdDateToTest, 1);
            const tuesdayStart3 = getNumOfFollowingDays(thirdDateToTest, 2);
            const wednesdayStart3 = getNumOfFollowingDays(thirdDateToTest, 3);
            const thursdayStart3 = getNumOfFollowingDays(thirdDateToTest, 4);
            const fridayStart3 = getNumOfFollowingDays(thirdDateToTest, 5);
            const saturdayStart3 = getNumOfFollowingDays(thirdDateToTest, 6);

            const mondayStart4 = getNumOfFollowingDays(fourthDateToTest, 1);
            const tuesdayStart4 = getNumOfFollowingDays(fourthDateToTest, 2);
            const wednesdayStart4 = getNumOfFollowingDays(fourthDateToTest, 3);
            const thursdayStart4 = getNumOfFollowingDays(fourthDateToTest, 4);
            const fridayStart4 = getNumOfFollowingDays(fourthDateToTest, 5);
            const saturdayStart4 = getNumOfFollowingDays(fourthDateToTest, 6);


            expect(mondayStart).to.equal(6);
            expect(tuesdayStart).to.equal(0);
            expect(wednesdayStart).to.equal(1);
            expect(thursdayStart).to.equal(2);
            expect(fridayStart).to.equal(3);
            expect(saturdayStart).to.equal(4);

            expect(mondayStart2).to.equal(1);
            expect(tuesdayStart2).to.equal(2);
            expect(wednesdayStart2).to.equal(3);
            expect(thursdayStart2).to.equal(4);
            expect(fridayStart2).to.equal(5);
            expect(saturdayStart2).to.equal(6);

            expect(mondayStart3).to.equal(5);
            expect(tuesdayStart3).to.equal(6);
            expect(wednesdayStart3).to.equal(0);
            expect(thursdayStart3).to.equal(1);
            expect(fridayStart3).to.equal(2);
            expect(saturdayStart3).to.equal(3);

            expect(mondayStart4).to.equal(1);
            expect(tuesdayStart4).to.equal(2);
            expect(wednesdayStart4).to.equal(3);
            expect(thursdayStart4).to.equal(4);
            expect(fridayStart4).to.equal(5);
            expect(saturdayStart4).to.equal(6);
        });
    });
});
