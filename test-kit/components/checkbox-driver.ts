import {DriverBase, simulate} from 'test-drive-react';
import {CheckBox} from '../../src';

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
}
