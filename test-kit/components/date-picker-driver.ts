import {DriverBase, selectDom, simulate, trigger} from 'test-drive-react';
import {DatePicker} from '../../src';

const bodySelect = selectDom(document.body);
const datePickerDropdown = 'DATE_PICKER_DROPDOWN';

export class DatePickerTestDriver extends DriverBase {
    public static ComponentClass = DatePicker;

    public get input(): HTMLInputElement {
        return this.select<HTMLInputElement>('DATE_PICKER_INPUT');
    }

    public changeDate(value: string): void {
        trigger.change(this.input, value);
        simulate.blur(this.input);
    }

    public nextMonth(): void {
        simulate.mouseDown(bodySelect('NEXT_MONTH_BUTTON'));
    }

    public previousMonth(): void {
        simulate.mouseDown(bodySelect('PREV_MONTH_BUTTON'));
    }

    public get dropDown() {
        return bodySelect(datePickerDropdown);
    }

    public get yearLabel() {
        return bodySelect(datePickerDropdown, 'YEAR');
    }

    public get monthLabel() {
        return bodySelect(datePickerDropdown, 'MONTH_NAME');
    }
}
