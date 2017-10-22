import {DriverBase} from 'test-drive-react';
import {Dialog} from '../../src';
import {ModalTestDriver} from './modal-driver';

export type DialogButtonType = 'CANCEL' | 'CLOSE' | 'PRIMARY';

export class DialogTestDriver extends DriverBase {
    public static ComponentClass = Dialog;
    private modalDriver: ModalTestDriver;

    constructor(getDialog: () => HTMLElement) {
        super(getDialog);
        this.modalDriver = new ModalTestDriver(getDialog);
    }

    public get root(): Element {
        return this.modalDriver.children[0];
    }

    public get title(): Element {
        return this.getDialogElement('DIALOG_TITLE');
    }

    public getButton(type: DialogButtonType) {
        return this.getDialogElement(`DIALOG_${type}`);
    }

    private getDialogElement(elem: string): Element {
        return this.select(this.root.getAttribute('data-automation-id')!, elem);
    }
}
