import {DriverBase, simulate} from 'test-drive-react';
import {SelectionList} from '../../src';
import dividerBaseStyle from '../../src/components/selection-list/divider.st.css';
import optionBaseStyle from '../../src/components/selection-list/option.st.css';
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

    public get focusedIndex() {
        const id = this.root.getAttribute('aria-activedescendant');
        return id ? this.items.findIndex(element => element.id === id) : -1;
    }

    public keyDown(eventData: object): void {
        simulate.keyDown(this.root, eventData);
    }

    public mouseDown(element: Element): void {
        simulate.mouseDown(element, {button: 0});
    }

    public click(element: Element): void {
        simulate.click(element, {button: 0});
    }

    public selectItem(index: number) {
        simulate.click(this.items[index], {button: 0});
    }

    public isDivider(element: Element): boolean {
        return elementHasStylableClassName(element, dividerBaseStyle, 'root');
    }

    public itemHasStylableState(index: number, stateName: string): boolean {
        return elementHasStylableState(this.items[index], optionBaseStyle, stateName);
    }

    public hasStylableState(stateName: string): boolean {
        return elementHasStylableState(this.root, listBaseStyle, stateName);
    }
}
