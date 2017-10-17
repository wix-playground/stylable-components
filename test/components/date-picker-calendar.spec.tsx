import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';
import {DatePicker} from '../../src';
import {getDayNames} from '../../src/utils';
import {DatePickerTestDriver} from '../../test-kit';

describe('The Dropdown', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const JANUARY_FIRST = new Date(2017, 0, 1);
    const FEBRUARY_FIRST = new Date(2017, 1, 1);
    const MARCH_FIRST  = new Date(2017, 2, 1);
    const DECEMBER_FIRST = new Date(2017, 11, 1);

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
