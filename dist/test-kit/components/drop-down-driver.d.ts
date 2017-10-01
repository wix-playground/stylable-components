import { DriverBase } from 'test-drive-react';
import { DropDown } from '../../src/components/drop-down/drop-down';
export declare class DropDownDriver extends DriverBase {
    static ComponentClass: typeof DropDown;
    readonly selection: string | null;
    isOpen(): boolean;
    clickOnItem(idx: number): void;
    readonly list: HTMLDivElement | null;
    readonly items: HTMLCollection | null;
    focus(): void;
    clickOnDropDown(): void;
    keyDown(keyCode: number): void;
}
