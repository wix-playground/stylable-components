import { DriverBase } from 'test-drive-react';
import { SelectionList } from '../../src';
export declare class SelectionListTestDriver extends DriverBase {
    static ComponentClass: typeof SelectionList;
    focus(): void;
    blur(): void;
    readonly items: Element[];
    keyDown(keyCode: number): void;
    click(element: Element): void;
    elementHasStylableState(element: Element, stateName: string): boolean;
    elementHasStylableClassName(element: Element, className: string): boolean;
}
