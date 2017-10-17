import {DriverBase, simulate} from 'test-drive-react';
import {SelectionList} from '../../src';
import listBaseStyle from '../../src/components/selection-list/selection-list.st.css';
import {elementHasStylableClassName, elementHasStylableState} from '../utils';

export class SelectionListTestDriver extends DriverBase {
    public static ComponentClass = SelectionList;

    public focus(): void {
        simulate.focus(this.root);
    }

    public blur(): void {
        simulate.blur(this.root);
    }

    public get items(): Element[] {
        return Array.from(this.root.children);
    }

    public keyDown(keyCode: number): void {
        simulate.keyDown(this.root, {keyCode});
    }

    public click(element: Element): void {
        simulate.click(element);
    }

    public elementHasStylableState(
        element: Element,
        stateName: string,
        style = listBaseStyle
    ): boolean {
        return elementHasStylableState(element, style, stateName);
    }

    public elementHasStylableClassName(
        element: Element,
        className: string,
        style = listBaseStyle
    ): boolean {
        return elementHasStylableClassName(element, style, className);
    }
}
