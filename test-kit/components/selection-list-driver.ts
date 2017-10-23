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

    public keyDown(keyCode: number): void {
        simulate.keyDown(this.root, {keyCode});
    }

    public click(element: Element): void {
        simulate.click(element);
    }

    public isDivider(element: Element): boolean {
        return elementHasStylableClassName(element, dividerBaseStyle, 'root');
    }

    public optionHasStylableState(element: Element, stateName: string): boolean {
        return elementHasStylableState(element, optionBaseStyle, stateName);
    }

    public hasStylableState(stateName: string): boolean {
        return elementHasStylableState(this.root, listBaseStyle, stateName);
    }
}
