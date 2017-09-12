import {DriverBase, simulate} from 'test-drive-react';
import {SelectionList} from '../../src';
import listBaseStyle from '../../src/components/selection-list/selection-list.st.css';
import {elementHasStylableClassName, elementHasStylableState} from '../../test/utils/inspect-stylable';

export class SelectionListTestDriver extends DriverBase {
    public static ComponentClass = SelectionList;

    public focus() {
        simulate.focus(this.root);
    }

    public blur() {
        simulate.blur(this.root);
    }

    public get items() {
        return Array.from(this.root.children);
    }

    public keyDown(keyCode: number) {
        simulate.keyDown(this.root, {keyCode});
    }

    public click(element: Element) {
        simulate.click(element);
    }

    public elementHasStylableState(element: Element, stateName: string) {
        return elementHasStylableState(element, listBaseStyle, stateName);
    }

    public elementHasStylableClassName(element: Element, className: string): boolean {
        return elementHasStylableClassName(element, listBaseStyle, className);
    }
}
