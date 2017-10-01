import { DriverBase } from 'test-drive-react';
import { RadioButton, RadioGroup } from '../../src';
export declare class RadioGroupDriver extends DriverBase {
    static ComponentClass: typeof RadioGroup;
    readonly items: HTMLCollection;
    getRadioButton(idx: number): RadioButtonDriver;
}
export declare class RadioButtonDriver extends DriverBase {
    static ComponentClass: typeof RadioButton;
    readonly nativeElement: HTMLInputElement;
    isChecked(): boolean;
    isDisabled(): boolean;
    isReadOnly(): boolean;
    readonly value: string;
    readonly name: string;
    readonly children: Array<Node | null>;
    readonly icon: SVGElement;
    click(): void;
}
