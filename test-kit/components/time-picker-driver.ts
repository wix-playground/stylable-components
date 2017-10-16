import * as keycode from 'keycode';
import {DriverBase, simulate} from 'test-drive-react';
import {TimePicker} from '../../src';
import {Modifiers} from '../../src/components/stepper';
import styles from '../../src/components/time-picker/time-picker.st.css';

export class TimePickerDriver extends DriverBase {
    public static ComponentClass = TimePicker;
    public get hoursInput(): HTMLInputElement {
        return this.select('TIME_PICKER_INPUT_HH');
    }
    public get minutesInput(): HTMLInputElement {
        return this.select('TIME_PICKER_INPUT_MM');
    }
    public get ampm() {
        return this.select('TIME_PICKER_AMPM');
    }
    public get placeholder() {
        return this.select('TIME_PICKER_PLACEHOLDER');
    }
    public get increment() {
        return this.select('STEPPER_INCREMENT');
    }
    public get decrement() {
        return this.select('STEPPER_DECREMENT');
    }
    public clickIncrement(opts?: Modifiers) {
        simulate.click(this.increment, opts);
    }
    public clickDecrement(opts?: Modifiers) {
        simulate.click(this.decrement, opts);
    }

    public changeHours(value: string) {
        this.change(this.hoursInput, value);
    }
    public changeMinutes(value: string) {
        this.change(this.minutesInput, value);
    }
    public focusMinutes() {
        simulate.click(this.minutesInput);
        simulate.focus(this.minutesInput);
    }
    public focusHours() {
        simulate.click(this.hoursInput);
        simulate.focus(this.hoursInput);
    }

    public keydownMinutes(key: string, opts?: object) {
        this.keydown(this.minutesInput, key, opts);
    }
    public keydownHours(key: string, opts?: object) {
        this.keydown(this.hoursInput, key, opts);
    }
    public keydownAmpm(key: string, opts?: object) {
        this.keydown(this.ampm as HTMLInputElement, key, opts);
    }

    public getCssState(state: string): boolean {
        const mapping = styles.$stylesheet.cssStates({[state]: true});
        const attr = Object.keys(mapping)[0];
        return this.select('TIME_PICKER').hasAttribute(attr);
    }

    private change(input: HTMLInputElement, value: string) {
        simulate.focus(input);
        input.value = value;
        simulate.change(input);
    }
    private keydown(input: HTMLInputElement, key: string, opts?: object) {
        simulate.focus(input);
        simulate.click(input);
        simulate.keyDown(input, {keyCode: keycode(key), ...opts});
    }
}
