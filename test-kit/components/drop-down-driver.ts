import {DriverBase, simulate} from 'test-drive-react';
import {DropDown} from '../../src/components/drop-down/drop-down';
import {PortalTestDriver} from './portal-driver';

export class DropDownDriver extends DriverBase {
    public static ComponentClass = DropDown;
    private portalDriver: PortalTestDriver;

    constructor(getDropdown: () => HTMLElement) {
        super(getDropdown);
        this.portalDriver = new PortalTestDriver(getDropdown);
    }

    public get selection(): string | null {
        return this.root.textContent;
    }

    public isOpen(): boolean {
        return !!this.portalDriver.portal;
    }

    // Refactor using selectionList driver.
    public clickOnItem(idx: number): void {
        if (this.items) {
            this.items[idx] && simulate.click(this.items![idx], {button: 0});
        }
    }

    // Refactor using selectionList driver.
    public get list(): HTMLDivElement | null {
        return this.portalDriver.portal as HTMLDivElement;
    }

    // Refactor using selectionList driver.
    public get items(): HTMLCollection | null {
        return this.list ? this.list.children[0].children : null;
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
