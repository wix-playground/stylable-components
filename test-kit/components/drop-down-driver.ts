import { DriverBase, selectDom, simulate} from 'test-drive-react';
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

    public selectItem(idx: number): void {
        if (this.items) {
            this.items[idx] && this.click(this.items![idx]);
        }
    }

    public get list(): HTMLDivElement | null {
        return bodySelect('LIST');
    }

    public get items(): HTMLCollection | null {
        return this.list ? this.list.children : null;
    }

    public focus(): void {
        return simulate.focus(this.root);
    }

    public click(element?: Element): void {
        element ? simulate.click(element) : simulate.click(this.select('DROP_DOWN_INPUT'));
    }

    public keyDown(keyCode: number): void {
        simulate.keyDown(this.root, {keyCode});
    }
}
