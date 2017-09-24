import {DriverBase, simulate} from 'test-drive-react';
import {SelectionList} from '../../src';
import listBaseStyle from '../../src/components/selection-list/selection-list.st.css';
import {elementHasStylableClassName, elementHasStylableState} from '../../test/utils/inspect-stylable';

export class SelectionListTestDriver extends DriverBase {
    public static ComponentClass = SelectionList;

    public focus(): void {
        simulate.focus(this.listView);
    }

    public blur(): void {
        simulate.blur(this.listView);
    }

    public get items(): Element[] {
        return Array.from(this.select('LIST').children);
    }

    public keyDown(keyCode: number): void {
        simulate.keyDown(this.listView, {keyCode});
    }

    public click(element: Element): void {
        simulate.click(element);
    }

    public get listView(): HTMLElement {
        return this.select('SELECTION_LIST_VIEW');
    }

    public isInFocusedState(): boolean {
        return elementHasStylableState(this.listView, listBaseStyle, 'focused')
    }

    public isItemInFocusedState(itemIndex: number): boolean {
        return elementHasStylableState(this.items[itemIndex], listBaseStyle, 'focused')
    }

    public isItemInSelectedState(itemIndex: number): boolean {
        return elementHasStylableState(this.items[itemIndex], listBaseStyle, 'selected')
    }



    public elementHasStylableClassName(element: Element, className: string): boolean {
        return elementHasStylableClassName(element, listBaseStyle, className);
    }
}
