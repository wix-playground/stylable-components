import {codes as KeyCodes} from 'keycode';
import {DriverBase, simulate} from 'test-drive-react';
import {NumberInput} from '../../src';
import {Modifiers} from '../../src/components/stepper';
import {simulateKeyInput} from '../utils';

export class NumberInputDriver extends DriverBase {
    public static ComponentClass = NumberInput;
    public get nativeInput() {
        return this.select('NATIVE_INPUT_NUMBER');
    }

    public get stepper() {
        return this.select('NUMBER_INPUT_STEPPER');
    }

    public get increment() {
        return this.select('STEPPER_INCREMENT');
    }

    public get decrement() {
        return this.select('STEPPER_DECREMENT');
    }

    public get prefix() {
        return this.select('PREFIX');
    }

    public get suffix() {
        return this.select('SUFFIX');
    }

    public clickIncrement(opts?: Modifiers) {
        simulate.click(this.increment, opts);
    }

    public clickDecrement(opts?: Modifiers) {
        simulate.click(this.decrement, opts);
    }

    public pressUpKey(opts?: Modifiers) {
        simulate.keyDown(this.nativeInput, {keyCode: KeyCodes.up, ...opts});
    }

    public pressDownKey(opts?: Modifiers) {
        simulate.keyDown(this.nativeInput, {keyCode: KeyCodes.down, ...opts});
    }

    public pressEnter() {
        simulate.keyDown(this.nativeInput, {keyCode: KeyCodes.enter});
    }

    public pressEsc() {
        simulate.keyDown(this.nativeInput, {keyCode: KeyCodes.esc});
    }

    public typeIn(value: string) {
        simulateKeyInput(this.nativeInput as HTMLInputElement, value);
    }

    public blur() {
        simulate.blur(this.nativeInput);
    }
}
