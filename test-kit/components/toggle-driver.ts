import {DriverBase, simulate} from 'test-drive-react';
import {Toggle} from '../../src';

export class ToggleDriver extends DriverBase {
    public static ComponentClass = Toggle;
    public get nativeInput() {
        return this.select('NATIVE_INPUT');
    }
    public click() {
        const input = this.nativeInput;
        if (input) {
            simulate.focus(input);
            simulate.change(input);
        }
    }
}
