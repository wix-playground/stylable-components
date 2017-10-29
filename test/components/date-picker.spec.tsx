import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {DatePickerDemo} from '../../demo/components/date-picker-demo';
import {DatePicker} from '../../src';
import {DatePickerTestDriver} from '../../test-kit';
import {sleep} from '../utils';

class DatePickerDemoDriver extends DriverBase {
    public static ComponentClass = DatePickerDemo;
    public datePicker = new DatePickerTestDriver(() => this.select('DATE_PICKER_DEMO', 'DATE_PICKER'));

    public get date(): HTMLSpanElement {
        return this.select('DATE_PICKER_DEMO', 'CURRENT_DATE');
    }
}

describe('<DatePicker />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const JANUARY_FIRST = new Date(2017, 0, 1);
    const FEBRUARY_FIRST = new Date(2017, 1, 1);

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

    it('should call onInput when the input is changed', async () => {
        const onInput = sinon.spy();
        const {driver: datePicker, waitForDom} = clientRenderer.render(
            <DatePicker onInput={onInput} />
        ).withDriver(DatePickerTestDriver);

        datePicker.simulateInput();

        await waitForDom(() => expect(onInput).to.have.been.called);
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

    it('should set the tabindex attribute', () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker tabIndex={123} />)
            .withDriver(DatePickerTestDriver);

        return waitForDom(() => expect(datePicker.input).to.have.attribute('tabindex', '123'));
    });

    it('should set the name attribute', () => {
        const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker name="test" />)
            .withDriver(DatePickerTestDriver);

        return waitForDom(() => expect(datePicker.input).to.have.attribute('name', 'test'));
    });

    it('should focus automatically on the datepicker when autoFocus is provided', async () => {
        const {driver: datePicker} = clientRenderer.render(<DatePicker autoFocus />)
            .withDriver(DatePickerTestDriver);

        await waitFor(() => expect(document.activeElement).to.equal(datePicker.input));
    });

    describe('When Disabled', () => {
        it('should not show the dropdown when the icon is clicked', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker disabled />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.openCalender();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not show the dropdown when the input is clicked', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker disabled />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.clickOnDatePicker();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not show the dropdown when the date picker is focused and openOnFocus is set to true', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker openOnFocus disabled />
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.focus();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not allow the input value to be changed', async () => {
            const onChange = sinon.spy();
            const {driver: datePicker} = clientRenderer.render(
                <DatePicker onChange={onChange} disabled />
            ).withDriver(DatePickerTestDriver);

            datePicker.changeDate('2017/02/01');

            await sleep(20);
            expect(onChange).to.have.not.been.called;
        });
    });

    describe('When readOnly', () => {
        it('should not show the dropdown when the icon is clicked', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker readOnly />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.openCalender();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not show the dropdown when the input is clicked', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(<DatePicker readOnly />)
                .withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.clickOnDatePicker();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not show the dropdown when the date picker is focused and openOnFocus is set to true', async () => {
            const {driver: datePicker, waitForDom} = clientRenderer.render(
                <DatePicker openOnFocus readOnly />
            ).withDriver(DatePickerTestDriver);

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);

            datePicker.focus();

            await waitForDom(() => expect(datePicker.isOpen()).to.be.false);
        });

        it('should not allow the input value to be changed', async () => {
            const onChange = sinon.spy();
            const {driver: datePicker} = clientRenderer.render(
                <DatePicker onChange={onChange} readOnly />
            ).withDriver(DatePickerTestDriver);

            datePicker.changeDate('2017/02/01');

            await sleep(20);
            expect(onChange).to.have.not.been.called;
        });
    });
});
