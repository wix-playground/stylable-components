import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { BirthDatePicker, BirthDatePickerDate } from '../../src';
import { BirthDatePickerDemo, initialValue as demoValue, minDate, maxDate} from '../../demo/birth-date-picker-demo';

describe('<BirthDatePicker />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup())

    it('Receives the date and allows changing it', async function() {
        const { select, waitForDom } = clientRenderer.render(<BirthDatePickerDemo />);
        const { year, month, day } = demoValue!;

        await waitForDom(() => {
            expect(select('BIRTH_DATE_PICKER')).to.be.present();
            expect(select('BIRTH_DATE_PICKER_YEAR')).to.have.value(year ? year.toString() : '');
            expect(select('BIRTH_DATE_PICKER_MONTH')).to.have.value(month ? month.toString() : '');
            expect(select('BIRTH_DATE_PICKER_DAY')).to.have.value('');
        });

        const monthInput = select('BIRTH_DATE_PICKER_MONTH') as HTMLInputElement;
        monthInput.focus();
        monthInput.value = '12';
        simulate.change(select('BIRTH_DATE_PICKER_MONTH'));

        return waitFor(() => {
            expect(select('BIRTH_DATE_PICKER_YEAR')).to.have.value(year ? year.toString() : '');
            expect(select('BIRTH_DATE_PICKER_MONTH')).to.have.value('12');
            expect(select('BIRTH_DATE_PICKER_DAY')).to.have.value('');
        });
    });

    it('Renders and is blank', function () {
        const { select, waitForDom } = clientRenderer.render(<BirthDatePicker />);

        return waitForDom(() => {
            expect(select('BIRTH_DATE_PICKER')).to.be.present();
            expect(select('BIRTH_DATE_PICKER_YEAR')).to.have.value('');
            expect(select('BIRTH_DATE_PICKER_MONTH')).to.have.value('');
            expect(select('BIRTH_DATE_PICKER_DAY')).to.have.value('');
        });
    });

    it('Displays a provided value', function() {
        const year = 1984, month = 6, day = 18;
        const { select, waitForDom } = clientRenderer.render(<BirthDatePicker value={{year, month, day}} />);

        return waitForDom(() => {
            expect(select('BIRTH_DATE_PICKER_YEAR')).to.have.value(year.toString());
            expect(select('BIRTH_DATE_PICKER_MONTH')).to.have.value(month.toString());
            expect(select('BIRTH_DATE_PICKER_DAY')).to.have.value(day.toString());
        });
    });

    it('Triggers onChange with updated value when one of the inputs is changed', async function() {
        const year = 1984, month = undefined, newMonth = 1, day = undefined;
        const onChange = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <BirthDatePicker value={{year, month, day}} onChange={onChange} />
        );

        await waitForDom(() => {
            expect(select('BIRTH_DATE_PICKER')).to.be.present();
        });

        const monthInput = select('BIRTH_DATE_PICKER_MONTH') as HTMLInputElement;
        monthInput.focus();
        monthInput.value = newMonth.toString();
        simulate.change(select('BIRTH_DATE_PICKER_MONTH'));
        
        return waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({year, month: newMonth, day});
        });
    });
});
