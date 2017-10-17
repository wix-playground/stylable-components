import {DriverBase, simulate} from 'test-drive-react';
import {CheckBox} from '../../src';
import baseStyle from '../../src/components/checkbox/checkbox.st.css';
import {elementHasStylableState} from '../utils';

export class CheckBoxTestDriver extends DriverBase {

    public static ComponentClass = CheckBox;

    public isChecked(): boolean {
        return !!this.select('CHECKBOX_TICKMARK');
    }

    public isIndeterminate(): boolean {
        return !!this.select('CHECKBOX_INDETERMINATE');
    }

    public click(): void {
        simulate.click(this.root);
    }

    public focus(): void {
        simulate.focus(this.nativeInput);
    }

    public get children(): HTMLCollection {
        return this.select('CHECKBOX_CHILD_CONTAINER').children;
    }

    public get box(): Element {
        return this.select('CHECKBOX_BOX');
    }

    public get tickMark(): Element {
        return this.select('CHECKBOX_TICKMARK');
    }

    public get indeterminateMark(): Element {
        return this.select('CHECKBOX_INDETERMINATE');
    }

    public get nativeInput(): HTMLInputElement {
        return this.select('NATIVE_CHECKBOX');
    }

    public elementHasStylableState(stateName: string): boolean {
        return elementHasStylableState(this.root, baseStyle, stateName);
    }
}
