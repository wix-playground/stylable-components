import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, selectDom, simulate, sinon, trigger} from 'test-drive-react';
import {DatePickerDemo} from '../../demo/components/date-picker-demo';
import {DatePicker} from '../../src';
import {
    getDayNames,
    getDaysInMonth,
    getMonthFromOffset,
    getNumOfFollowingDays,
    getNumOfPreviousDays
} from '../../src/utils';

const currentDate = 'CURRENT_DATE';
const datePickerInputId = 'DATE_PICKER_INPUT';
const datePickerDropdownId = 'DATE_PICKER_DROPDOWN';

describe('The DatePicker Component', () => {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);
    afterEach(() => clientRenderer.cleanup());

    const JANUARY_FIRST = new Date(2017, 0, 1);
    const FEBRUARY_FIRST = new Date(2017, 1, 1);
    const MARCH_FIRST  = new Date(2017, 2, 1);
    const DECEMBER_FIRST = new Date(2017, 11, 1);

    describe('A Typical User', () => {
        it('writes into the date picker input field, presses enter, ' +
            'and expects the date picker input to have the proper value', async () => {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo />);

            const datePickerInput = select(datePickerInputId);
            trigger.change(datePickerInput!, '2017/02/01');
            simulate.keyDown(datePickerInput, {keyCode: keycode('enter')});

            await waitForDom(() => expect(select(currentDate)).to.have.text('Wed Feb 01 2017'));
        });

        it('clicks on the input, picks a date from the dropdown, ' +
            'and then expects the dropdown to close and the date to appear in the input', async () => {
            const {select, waitForDom} = clientRenderer.render(<DatePickerDemo value={JANUARY_FIRST} />);
            const datePickerInput = select(datePickerInputId);

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());

            simulate.focus(datePickerInput);

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(bodySelect('DAY_4'));

            await waitForDom(() => {
                expect(bodySelect(datePickerDropdownId)).to.be.absent();
                expect(select(currentDate)).to.have.text('Wed Jan 04 2017');
            });
        });
    });

    it('should only call onChange once', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DatePicker onChange={onChange} />);
        const datePickerInput = select(datePickerInputId);

        trigger.change(datePickerInput!, '2017/02/01');
        simulate.blur(datePickerInput);

        await waitForDom(() => expect(onChange).to.have.been.calledOnce);
    });

    it('should use a provided value', async () => {
        const {select, waitForDom} = clientRenderer.render(<DatePicker value={JANUARY_FIRST} />);

        await waitForDom(() => expect(select(datePickerInputId)).to.have.value(JANUARY_FIRST.toDateString()));
    });

    it('should not call onChange with an invalid date', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DatePicker onChange={onChange} />);
        const datePickerInput = select(datePickerInputId);

        trigger.change(datePickerInput!, '2sgsdfsdfw223');
        simulate.blur(datePickerInput);

        await waitForDom(() => expect(onChange).to.have.not.been.calledOnce);
    });

    it('should call onChange with the current input value when blurred', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DatePicker value={JANUARY_FIRST} onChange={onChange} />);
        const datePickerInput = select(datePickerInputId);

        trigger.change(datePickerInput!, '2017/02/01');
        simulate.blur(datePickerInput);

        await waitForDom(() => expect(onChange).to.have.been.calledWithMatch({value: FEBRUARY_FIRST}));
    });

    it('should use a provided placeholder', async () => {
        const {select, waitForDom} = clientRenderer.render(<DatePicker placeholder="mm/dd/yyyy" />);

        await waitForDom(() => expect(select(datePickerInputId)).to.have.attribute('placeholder', 'mm/dd/yyyy'));
    });

    it('should show and hide the dropdown when the input is clicked', async () => {
        const {select, waitForDom} = clientRenderer.render(<DatePicker />);
        const datePickerInput = select(datePickerInputId);

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());

        simulate.mouseDown(datePickerInput);

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());

        simulate.mouseDown(datePickerInput);

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());
    });

    it('should show and hide the dropdown when the calendar icon is clicked', async () => {
        const {select, waitForDom} = clientRenderer.render(<DatePicker />);
        const calendarIcon = select('CALENDAR_ICON');

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());

        simulate.click(calendarIcon);

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());

        simulate.click(calendarIcon);

        await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());
    });

    it('can be changed with the arrow keys', async function() {
        const {select, waitForDom} = clientRenderer.render(<DatePicker value={JANUARY_FIRST} openOnFocus={true} />);
        const datePickerInput = select(datePickerInputId);

        function simulateKeyPress(keyToPress: string) {
            simulate.focus(datePickerInput);
            simulate.keyDown(datePickerInput, {keyCode: keycode(keyToPress)});
            simulate.keyDown(datePickerInput, {keyCode: keycode('enter')});
        }

        // Advance one week
        simulateKeyPress('down');

        await waitForDom(() => expect(datePickerInput).to.have.value('Sun Jan 08 2017'));

        // Go back one week
        simulateKeyPress('up');

        await waitForDom(() => expect(datePickerInput).to.have.value('Sun Jan 01 2017'));

        // Go forward one day
        simulateKeyPress('right');

        await waitForDom(() => expect(datePickerInput).to.have.value('Mon Jan 02 2017'));

        // Go back one day
        simulateKeyPress('left');

        await waitForDom(() => expect(datePickerInput).to.have.value('Sun Jan 01 2017'));
    });

    describe('The Dropdown', () => {
        const dayNames: string[] = getDayNames();
        const days: string[] = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28'
        ];

        it('should display the days for a fixed month', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={FEBRUARY_FIRST}
                />
            );

            await waitForDom(() => {
                dayNames.forEach(
                    dayName => expect(bodySelect(`DAY_NAME_${dayName.toUpperCase()}`)).to.have.text(dayName));
                days.forEach(dayNumeric => expect(bodySelect(`DAY_${dayNumeric}`)).to.have.text(dayNumeric));
            });
        });

        it('should show the next and previous month buttons horizontally aligned with the month and year', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            await waitForDom(() => {
                const headerContents = [
                    bodySelect('PREV_MONTH_BUTTON'),
                    bodySelect('MONTH_NAME'),
                    bodySelect('YEAR'),
                    bodySelect('NEXT_MONTH_BUTTON')
                ];
                expect(headerContents).to.be.verticallyAligned('center', 1);
            });
        });

        it('should display the day names in horizontal sequence, and vertically aligned', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            const dayNameIds = dayNames.map(name => 'DAY_NAME_' + name.toUpperCase());

            await waitForDom(() => {
                const dayNameElements = dayNameIds.map((name, index) => {
                    const element: Element = bodySelect(name)!;
                    expect(element).to.have.text(dayNames[index]);
                    return element;
                });

                expect(dayNameElements).to.be.inHorizontalSequence();
                expect(dayNameElements).to.be.verticallyAligned('center', 1.5);
            });
        });

        function elementsInRow(row: number) {
            const rowElements = [];
            const select = selectDom(document.body);

            for (let i = 1; i < 7; i++) {
                rowElements.push(select('DAY_' + (((row - 1) * 7) + i)));
            }

            return rowElements;
        }

        function elementsInColumn(column: number) {
            const columnElements = [];
            const select = selectDom(document.body);

            for (let i = 1; i <= 5; i++) {
                columnElements.push(select('DAY_' + ((7 * (i - 1)) + column)));
            }

            return columnElements;
        }

        it('should display the days in a grid', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    value={JANUARY_FIRST}
                    showDropdownOnInit={true}
                />
            );

            await waitForDom(() => {
                // Check that the days are displayed in rows (checking that each row is in horizontal sequence
                expect(elementsInRow(1)).to.be.inHorizontalSequence();
                expect(elementsInRow(1)).to.be.verticallyAligned('center');

                // Check that the days are displayed in columns
                expect(elementsInColumn(1)).to.be.inVerticalSequence();
                expect(elementsInColumn(1)).to.be.horizontallyAligned('center');
            });
        });

        it('should show the days starting on the correct day of the week', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    value={MARCH_FIRST}
                    showDropdownOnInit={true}
                />
            );

            await waitForDom(() => expect([
                bodySelect('DAY_1'),
                bodySelect('DAY_NAME_WED')
            ]).to.be.horizontallyAligned('center'));
        });

        it('should show the trailing days from the last and next months', function() {
            clientRenderer.render(
                <DatePicker
                    value={MARCH_FIRST}
                    showDropdownOnInit={true}
                />
            );

            expect(bodySelect('PREV_DAY_26')).to.be.present();
            expect(bodySelect('PREV_DAY_27')).to.be.present();
            expect(bodySelect('PREV_DAY_28')).to.be.present();
            expect(bodySelect('NEXT_DAY_1')).to.be.present();

        });

        it('displays the year', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            await waitForDom(() => expect(bodySelect('YEAR')).to.have.text('2017'));
        });

        it('displays the name of the month', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            await waitForDom(() => expect(bodySelect('MONTH_NAME')).to.have.text('January'));
        });

        it('displays the days of the week', async () => {
            const daysOfTheWeek = getDayNames();
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            await waitForDom(() => {
                for (const day of daysOfTheWeek) {
                    expect(bodySelect('DAY_NAME_' + day.toUpperCase())).to.have.text(day);

                }
            });
        });

        it('has a button which steps forward a month', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={DECEMBER_FIRST}
                />
            );

            expect(bodySelect('YEAR')).to.have.text('2017');
            expect(bodySelect('MONTH_NAME')).to.have.text('December');
            simulate.mouseDown(bodySelect('NEXT_MONTH_BUTTON'));

            await waitForDom(() => {
                expect(bodySelect('YEAR')).to.have.text('2018');
                expect(bodySelect('MONTH_NAME')).to.have.text('January');
            });
        });

        it('has a button which steps back a month', async () => {
            const {waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            );

            expect(bodySelect('YEAR')).to.have.text('2017');
            expect(bodySelect('MONTH_NAME')).to.have.text('January');
            simulate.mouseDown(bodySelect('PREV_MONTH_BUTTON'));

            await waitForDom(() => {
                expect(bodySelect('YEAR')).to.have.text('2016');
                expect(bodySelect('MONTH_NAME')).to.have.text('December');
            });
        });

        it('should stay open when the next or previous month buttons are clicked', async () => {
            const {waitForDom} = clientRenderer.render(<DatePicker showDropdownOnInit={true} />);

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(bodySelect('PREV_MONTH_BUTTON'));

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());

            simulate.mouseDown(bodySelect('NEXT_MONTH_BUTTON'));

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());
        });

        it('should appear when the Enter key is pressed and the openOnFocus property is set to false', async () => {
            const {waitForDom} = clientRenderer.render(<DatePicker openOnFocus={false} />);

            simulate.focus(bodySelect(datePickerInputId));

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());

            simulate.keyDown(bodySelect(datePickerInputId), {keyCode: keycode('enter')});

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());
        });

        it('should appear when the Spacebar is pressed and the openOnFocus property is set to false', async () => {
            const {waitForDom} = clientRenderer.render(<DatePicker openOnFocus={false} />);

            simulate.focus(bodySelect(datePickerInputId));

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.absent());

            simulate.keyDown(bodySelect(datePickerInputId), {keyCode: keycode('space')});

            await waitForDom(() => expect(bodySelect(datePickerDropdownId)).to.be.present());
        });
    });

    describe('The Helper Functions', function() {
        it('getMonthFromOffset should return the next month when the second argument is 1', () => {
            const date = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(date, 1);

            expect(nextMonth.getMonth()).to.equal(date.getMonth() + 1);
        });

        it('getMonthFromOffset should return the previous month when the second argument is -1', function() {
            const date = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(date, -1);

            expect(nextMonth.getMonth()).to.equal(date.getMonth() - 1);
        });

        it('getMonthFromOffset should handle the year changing when moving forward a month', function() {
            const date = new Date('Dec 6 2016');
            const nextMonth = getMonthFromOffset(date, 1);

            expect(nextMonth.getFullYear()).to.equal(date.getFullYear() + 1);
            expect(nextMonth.getMonth()).to.equal(0);
        });

        it('getMonthFromOffset should handle the year changing when moving back a month', function() {
            const date = new Date('Jan 6 2018');
            const nextMonth = getMonthFromOffset(date, -1);

            expect(nextMonth.getFullYear()).to.equal(date.getFullYear() - 1);
            expect(nextMonth.getMonth()).to.equal(11);
        });

        it('getDaysInMonth should return the number of days in a given month', () => {
            expect(getDaysInMonth(new Date('Feb 18 2017'))).to.equal(28);
            expect(getDaysInMonth(new Date('Jun 5 2016'))).to.equal(30);
            expect(getDaysInMonth(new Date('Jan 28, 2017'))).to.equal(31);
        });

        it('getNumOfPreviousDays should return the number of days to display for the previous month', () => {
            // Sunday is the default starting day
            expect(getNumOfPreviousDays(new Date('Feb 18 2017'))).to.equal(3);
            expect(getNumOfPreviousDays(new Date('Jun 5 2017'))).to.equal(4);
            expect(getNumOfPreviousDays(new Date('July 5 2017'))).to.equal(6);
            expect(getNumOfPreviousDays(new Date('September 5 2019'))).to.equal(0);
        });

        it('getNumOfPreviousDays should handle starting on different days of the week', () => {
            const dateToTest = new Date('July 5 2017');
            const secondDateToTest = new Date('September 5 2017');
            const thirdDateToTest = new Date('October 5 2017');
            const fourthDateToTest = new Date('August 5 2019');

            expect(getNumOfPreviousDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
            expect(getNumOfPreviousDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(4);
            expect(getNumOfPreviousDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            expect(getNumOfPreviousDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
            expect(getNumOfPreviousDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(1);
            expect(getNumOfPreviousDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(0);

            expect(getNumOfPreviousDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(4);
            expect(getNumOfPreviousDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(3);
            expect(getNumOfPreviousDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(2);
            expect(getNumOfPreviousDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
            expect(getNumOfPreviousDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(0);
            expect(getNumOfPreviousDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);

            expect(getNumOfPreviousDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
            expect(getNumOfPreviousDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(5);
            expect(getNumOfPreviousDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(4);
            expect(getNumOfPreviousDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(3);
            expect(getNumOfPreviousDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
            expect(getNumOfPreviousDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(1);

            expect(getNumOfPreviousDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(3);
            expect(getNumOfPreviousDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            expect(getNumOfPreviousDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
            expect(getNumOfPreviousDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(0);
            expect(getNumOfPreviousDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(6);
            expect(getNumOfPreviousDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(5);
        });

        it('getNumOfFollowingDays should return the number of days to display for the next month', () => {
            // Sunday is the default starting day
            expect(getNumOfFollowingDays(new Date('Feb 18 2017'))).to.equal(4);
            expect(getNumOfFollowingDays(new Date('Jun 5 2017'))).to.equal(1);
            expect(getNumOfFollowingDays(new Date('July 5 2017'))).to.equal(5);
            expect(getNumOfFollowingDays(new Date('September 5 2019'))).to.equal(5);
        });

        it('getNumOfFollowingDays should handle starting on different days of the week', () => {
            const dateToTest = new Date('July 5 2017');
            const secondDateToTest = new Date('September 5 2017');
            const thirdDateToTest = new Date('October 5 2017');
            const fourthDateToTest = new Date('August 5 2019');

            expect(getNumOfFollowingDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
            expect(getNumOfFollowingDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(0);
            expect(getNumOfFollowingDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
            expect(getNumOfFollowingDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
            expect(getNumOfFollowingDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(3);
            expect(getNumOfFollowingDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(4);

            expect(getNumOfFollowingDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
            expect(getNumOfFollowingDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            expect(getNumOfFollowingDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            expect(getNumOfFollowingDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
            expect(getNumOfFollowingDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
            expect(getNumOfFollowingDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);

            expect(getNumOfFollowingDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
            expect(getNumOfFollowingDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(6);
            expect(getNumOfFollowingDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(0);
            expect(getNumOfFollowingDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
            expect(getNumOfFollowingDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
            expect(getNumOfFollowingDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(3);

            expect(getNumOfFollowingDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
            expect(getNumOfFollowingDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            expect(getNumOfFollowingDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            expect(getNumOfFollowingDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
            expect(getNumOfFollowingDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
            expect(getNumOfFollowingDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);
        });
    });
});
