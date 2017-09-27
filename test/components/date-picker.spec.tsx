import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon} from 'test-drive-react';
import {DatePickerDemo} from '../../demo/components/date-picker-demo';
import {DatePicker} from '../../src';
import {
    getDayNames,
    getDaysInMonth,
    getMonthFromOffset,
    getNumOfFollowingDays,
    getNumOfPreviousDays
} from '../../src/utils';
import {dateToDateInputFormat} from '../../src/utils/date-helpers';
import {DatePickerTestDriver} from '../../test-kit';
import {sleep} from '../utils';

class DatePickerDemoDriver extends DriverBase {
    public static ComponentClass = DatePickerDemo;
    public datePicker = new DatePickerTestDriver(() => this.select('DATE_PICKER_DEMO', 'DATE_PICKER'));

    public get date(): HTMLSpanElement {
        return this.select('DATE_PICKER_DEMO', 'CURRENT_DATE');
    }
}

describe('The DatePicker Component', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const JANUARY_FIRST = new Date(2017, 0, 1);
    const FEBRUARY_FIRST = new Date(2017, 1, 1);
    const MARCH_FIRST  = new Date(2017, 2, 1);
    const DECEMBER_FIRST = new Date(2017, 11, 1);

    describe('A Typical User', () => {
        it('writes into the date picker input field, presses enter, ' +
            'and expects the date picker input to have the proper value', async () => {
            const {driver: datePickerDemo , waitForDom} = clientRenderer.render(<DatePickerDemo />)
                .withDriver(DatePickerDemoDriver);

            datePickerDemo.datePicker.changeDate('2017/02/01');

            await waitForDom(() => expect(datePickerDemo.date).to.have.text('Wed Feb 01 2017'));
        });

        it('clicks on the icon, picks a date from the dropdown, ' +
            'and then expects the dropdown to close and the date to have been selected', async () => {
            const {driver: datePickerDemo, waitForDom} = clientRenderer.render(
                <DatePickerDemo value={JANUARY_FIRST} />).withDriver(DatePickerDemoDriver);

            const datePicker = datePickerDemo.datePicker;

            await waitForDom(() => expect(datePicker.dropDown).to.be.absent());
            // simulate.click(select('CALENDAR_ICON'));

            datePicker.openCalender();

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());

            datePicker.clickOnDay(4);

            await waitForDom(() => {
                expect(datePicker.dropDown).to.be.absent();
                expect(datePickerDemo.date).to.have.text('Wed Jan 04 2017');
            });
        });
    });

    it('should only call onChange once', async () => {
        const onChange = sinon.spy();
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker onChange={onChange} />)
            .withDriver(DatePickerTestDriver);

        datePicker.changeDate('2017/02/01');

        await waitForDom(() => expect(onChange).to.have.been.calledOnce);
    });

    it('should use a provided value', async () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker value={JANUARY_FIRST} />)
            .withDriver(DatePickerTestDriver);

        await waitForDom(() => expect(datePicker.selectedDate).to.equal(JANUARY_FIRST.toDateString()));
    });

    it('should not call onChange with an invalid date', async () => {
        const onChange = sinon.spy();
        const {driver: datePicker} = clientRenderer.render(<DatePicker onChange={onChange} />)
            .withDriver(DatePickerTestDriver);

        datePicker.changeDate('2sgsdfsdfw223');
        await sleep(20);
        expect(onChange).to.have.not.been.called;
    });

    it('should call onChange with the current input value when blurred', async () => {
        const onChange = sinon.spy();
        const {driver: datePicker, waitForDom} = clientRenderer.render(
            <DatePicker value={JANUARY_FIRST} onChange={onChange} />
        ).withDriver(DatePickerTestDriver);

        datePicker.changeDate('2017/02/01');

        await waitForDom(() => expect(onChange).to.have.been.calledWithMatch({value: FEBRUARY_FIRST}));
    });

    it('should use a provided placeholder', async () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker placeholder="mm/dd/yyyy" />)
            .withDriver(DatePickerTestDriver);

        await waitForDom(() => expect(datePicker.input).to.have.attribute('placeholder', 'mm/dd/yyyy'));
    });

    it('should show and hide the dropdown when the input is clicked', async () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker />)
            .withDriver(DatePickerTestDriver);

        await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

        datePicker.clickOnDatePicker();

        await waitForDom(() => expect(datePicker.isOpen()).to.be.true);

        datePicker.clickOnDatePicker();

        await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
    });

    it('should show and hide the dropdown when focused and openOnFocus is true', async () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker openOnFocus />)
            .withDriver(DatePickerTestDriver);

        await waitForDom(() => expect(datePicker.dropDown).to.be.absent());

        datePicker.focus();

        await waitForDom(() => expect(datePicker.dropDown).to.be.present());
    });

    it('can be changed with the arrow keys', async () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker value={JANUARY_FIRST} openOnFocus/>)
            .withDriver(DatePickerTestDriver);

        function simulateKeyPress(keyToPress: string) {
            datePicker.openCalender();
            datePicker.keyPress(keycode(keyToPress));
            datePicker.keyPress(keycode('enter'));
        }

        // Advance one week
        simulateKeyPress('down');

        await waitForDom(() => expect(datePicker.selectedDate).to.equal('Sun Jan 08 2017'));

        // Go back one week
        simulateKeyPress('up');

        await waitForDom(() => expect(datePicker.selectedDate).to.equal('Sun Jan 01 2017'));

        // Go forward one day
        simulateKeyPress('right');

        await waitForDom(() => expect(datePicker.selectedDate).to.equal('Mon Jan 02 2017'));

        // Go back one day
        simulateKeyPress('left');

        await waitForDom(() => expect(datePicker.selectedDate).to.equal('Sun Jan 01 2017'));
    });

    describe('The Dropdown', () => {
        const dayNames = getDayNames();
        const days: string[] = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28'
        ];

        it('should display the days for a fixed month', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={FEBRUARY_FIRST}
                />
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => {
                dayNames.forEach((dayName, index) => expect(datePicker.getDayName(index)).to.have.text(dayName));
                days.forEach(day => expect(datePicker.getDay(day)).to.have.text(day));
            });
        });

        it('should show the next and previous month buttons horizontally aligned with the month and year', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker showDropdownOnInit value={JANUARY_FIRST}/>
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => {
                const headerContents = [
                    datePicker.prevMonthLabel,
                    datePicker.monthLabel,
                    datePicker.yearLabel,
                    datePicker.nextMonthLabel
                ];
                expect(headerContents).to.be.verticallyAligned('center', 1);
            });
        });

        it('should display the day names in horizontal sequence, and vertically aligned', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker showDropdownOnInit value={JANUARY_FIRST}/>
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => {
                const dayNameElements = dayNames.map((name, index) => {
                    return datePicker.getDayName(index);
                });

                expect(dayNameElements).to.be.inHorizontalSequence();
                expect(dayNameElements).to.be.verticallyAligned('center', 1.5);
            });
        });

        it('should display the days in a grid', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker value={JANUARY_FIRST} showDropdownOnInit/>
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => {
                const firstRow = [];
                const firstColumn = [];

                for (let i = 1; i < 7; i++) {
                    firstRow.push(datePicker.getDay(i));
                }

                for (let i = 1; i <= 5; i++) {
                    firstColumn.push(datePicker.getDay((7 * (i - 1)) + 1));
                }

                // Check that the days are displayed in rows (checking that each row is in horizontal sequence
                expect(firstRow).to.be.inHorizontalSequence();
                expect(firstRow).to.be.verticallyAligned('center');

                // Check that the days are displayed in columns
                expect(firstColumn).to.be.inVerticalSequence();
                expect(firstColumn).to.be.horizontallyAligned('center');
            });
        });

        it('should show the days starting on the correct day of the week', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker value={MARCH_FIRST} showDropdownOnInit/>
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => expect([
                datePicker.getDay(1),
                datePicker.getDayName(3)
            ]).to.be.horizontallyAligned('center'));
        });

        it('should show the trailing days from the last and next months', () => {
            const {driver: datePicker} = clientRenderer.render(<DatePicker value={MARCH_FIRST} showDropdownOnInit/>)
                .withDriver(DatePickerTestDriver);

            expect(datePicker.getPrevDay(26)).to.be.present();
            expect(datePicker.getPrevDay(27)).to.be.present();
            expect(datePicker.getPrevDay(28)).to.be.present();
            expect(datePicker.getNextDay(1)).to.be.present();

        });

        it('displays the year', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker showDropdownOnInit value={JANUARY_FIRST}/>
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.yearLabel).to.have.text('2017'));
        });

        it('displays the name of the month', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker
                    showDropdownOnInit={true}
                    value={JANUARY_FIRST}
                />
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.monthLabel).to.have.text('January'));
        });

        it('has a button which steps forward a month', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker showDropdownOnInit value={DECEMBER_FIRST}/>
            ).withDriver(DatePickerTestDriver);

            expect(datePicker.yearLabel).to.have.text('2017');
            expect(datePicker.monthLabel).to.have.text('December');
            datePicker.clickOnNextMonth();

            await waitForDom(() => {
                expect(datePicker.yearLabel).to.have.text('2018');
                expect(datePicker.monthLabel).to.have.text('January');
            });
        });

        it('has a button which steps back a month', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker showDropdownOnInit value={JANUARY_FIRST}/>
            ).withDriver(DatePickerTestDriver);

            expect(datePicker.yearLabel).to.have.text('2017');
            expect(datePicker.monthLabel).to.have.text('January');
            datePicker.clickOnPrevMonth();

            await waitForDom(() => {
                expect(datePicker.yearLabel).to.have.text('2016');
                expect(datePicker.monthLabel).to.have.text('December');
            });
        });

        it('should stay open when the next or previous month buttons are clicked', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker showDropdownOnInit/>)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());

            datePicker.clickOnPrevMonth();

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());

            datePicker.clickOnNextMonth();

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());
        });

        it('should appear when the Enter key is pressed and the openOnFocus property is set to false', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker openOnFocus={false} />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.dropDown).to.be.absent());

            datePicker.keyPress(keycode('enter'));

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());
        });

        it('should appear when the Spacebar is pressed and the openOnFocus property is set to false', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker openOnFocus={false} />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.dropDown).to.be.absent());

            datePicker.keyPress(keycode('space'));

            await waitForDom(() => expect(datePicker.dropDown).to.be.present());
        });
    });

    describe('The Helper Functions', () => {
        it('getMonthFromOffset should return the next month when the second argument is 1', () => {
            const date = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(date, 1);

            expect(nextMonth.getMonth()).to.equal(date.getMonth() + 1);
        });

        it('getMonthFromOffset should return the previous month when the second argument is -1', () => {
            const date = new Date('Mar 6 2017');
            const nextMonth = getMonthFromOffset(date, -1);

            expect(nextMonth.getMonth()).to.equal(date.getMonth() - 1);
        });

        it('getMonthFromOffset should handle the year changing when moving forward a month', () => {
            const date = new Date('Dec 6 2016');
            const nextMonth = getMonthFromOffset(date, 1);

            expect(nextMonth.getFullYear()).to.equal(date.getFullYear() + 1);
            expect(nextMonth.getMonth()).to.equal(0);
        });

        it('getMonthFromOffset should handle the year changing when moving back a month', () => {
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

        it('dateToDateInputFormat returns date formatted for native form submit', () => {
            expect(dateToDateInputFormat(new Date('Feb 18 2017'))).to.equal('2017-02-18');
            expect(dateToDateInputFormat(null)).to.equal(undefined);
        });
    });
});
