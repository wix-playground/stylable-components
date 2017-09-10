import {DriverBase, selectDom, simulate, trigger} from 'test-drive-react';
import {DatePicker} from '../../src';
import {getDayNames} from '../../src/utils';

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

    public click(elem: Element): void {
        simulate.mouseDown(elem);
    }

    public get nextMonthLabel() {
        return bodySelect('NEXT_MONTH_BUTTON');
    }

    public get prevMonthLabel() {
        return bodySelect('PREV_MONTH_BUTTON');
    }

    public get dropDown() {
        return bodySelect(datePickerDropdown);
    }

    public getDay(day: number | string) {
        return bodySelect(datePickerDropdown, `DAY_${day}`);
    }

    public getPrevDay(day: number | string) {
        return bodySelect(datePickerDropdown, `PREV_DAY_${day}`);
    }

    public getNextDay(day: number | string) {
        return bodySelect(datePickerDropdown, `NEXT_DAY_${day}`);
    }

    public getDayName(dayName: number) {
        if (dayName < 0 || dayName > 6) {
            return null;
        }
        const dayNames: string[] = getDayNames();
        return bodySelect(datePickerDropdown, `DAY_NAME_${dayNames[dayName].toUpperCase()}`);
    }

    public get yearLabel() {
        return bodySelect(datePickerDropdown, 'YEAR');
    }

    public get monthLabel() {
        return bodySelect(datePickerDropdown, 'MONTH_NAME');
    }
}

