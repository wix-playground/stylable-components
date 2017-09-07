import {DriverBase, selectDom, simulate, trigger} from 'test-drive-react';
import {DatePicker} from '../../src';

const bodySelect = selectDom(document.body);

export class DatePickerTestDriver extends DriverBase {
    public static ComponentClass = DatePicker;

    public get input(): HTMLInputElement {
        return this.select<HTMLInputElement>('DATE_PICKER_INPUT');
    }

    public changeDate(value: string): void {
        trigger.change(this.input, value);
        simulate.blur(this.input);
    }

    public clickInput(): void {
        simulate.mouseDown(this.input);
    }

    public get dropDown() {
        return bodySelect('DATE_PICKER_DROPDOWN');
    }

    public get year() {
        return bodySelect('DATE_PICKER_DROPDOWN', 'YEAR');
    }

}
