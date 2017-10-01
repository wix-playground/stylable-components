import { DriverBase } from 'test-drive-react';
import { CheckBox } from '../../src';
export declare class CheckBoxTestDriver extends DriverBase {
    static ComponentClass: typeof CheckBox;
    isChecked(): boolean;
    isIndeterminate(): boolean;
    click(): void;
    readonly children: HTMLCollection;
    readonly box: Element;
    readonly tickMark: Element;
    readonly indeterminateMark: Element;
    readonly nativeInput: HTMLInputElement;
}
