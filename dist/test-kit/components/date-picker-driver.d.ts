import { DriverBase } from 'test-drive-react';
import { DatePicker } from '../../src';
export declare class DatePickerTestDriver extends DriverBase {
    static ComponentClass: typeof DatePicker;
    readonly input: HTMLInputElement;
    readonly selectedDate: string;
    changeDate(value: string): void;
    focus(): void;
    clickOnDatePicker(): void;
    clickOnDay(day: number): void;
    clickOnNextMonth(): void;
    clickOnPrevMonth(): void;
    openCalender(): void;
    isOpen(): boolean;
    keyPress(keyCode: number): void;
    readonly nextMonthLabel: HTMLSpanElement | null;
    readonly prevMonthLabel: HTMLSpanElement | null;
    readonly dropDown: HTMLDivElement | null;
    getDay(day: number | string): HTMLSpanElement | null;
    getPrevDay(day: number | string): HTMLSpanElement | null;
    getNextDay(day: number | string): HTMLSpanElement | null;
    getDayName(dayName: number): HTMLSpanElement | null;
    readonly yearLabel: HTMLSpanElement | null;
    readonly monthLabel: HTMLSpanElement | null;
}
