import {DriverBase, selectDom, simulate} from 'test-drive-react';
import {DropDown} from '../../src/components/drop-down/drop-down';

const bodySelect = selectDom(document.body);

export class DropDownDriver extends DriverBase {
    public static ComponentClass = DropDown;

    public get selection(): string | null {
        return this.root.textContent;
    }

    public isOpen(): boolean {
        return !!this.list;
    }

    // Refactor using selectionList driver.
    public clickOnItem(idx: number): void {
        if (this.items) {
            this.items[idx] && simulate.click(this.items![idx], {button: 0});
        }
    }

    // Refactor using selectionList driver.
    public get list(): HTMLDivElement | null {
        return bodySelect('LIST');
    }

    // Refactor using selectionList driver.
    public get items(): HTMLCollection | null {
        return this.list ? this.list.children : null;
    }

    public focus(): void {
        return simulate.focus(this.root);
    }

    public clickOnDropDown(): void {
        simulate.click(this.select('DROP_DOWN_INPUT'));
    }

    public keyDown(keyCode: number): void {
        simulate.keyDown(this.root, {keyCode});
    }
}
