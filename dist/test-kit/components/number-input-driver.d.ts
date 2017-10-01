import { DriverBase } from 'test-drive-react';
import { NumberInput } from '../../src';
import { Modifiers } from '../../src/components/stepper';
export declare class NumberInputDriver extends DriverBase {
    static ComponentClass: typeof NumberInput;
    readonly nativeInput: Element;
    readonly stepper: Element;
    readonly increment: Element;
    readonly decrement: Element;
    readonly prefix: Element;
    readonly suffix: Element;
    clickIncrement(opts?: Modifiers): void;
    clickDecrement(opts?: Modifiers): void;
    pressUpKey(opts?: Modifiers): void;
    pressDownKey(opts?: Modifiers): void;
    pressEnter(): void;
    pressEsc(): void;
    typeIn(value: string): void;
    blur(): void;
}
