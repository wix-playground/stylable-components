import {DriverBase} from 'test-drive-react';
import {Modal} from '../../src';
import {PortalTestDriver} from './portal-driver';

export class ModalTestDriver extends DriverBase {
    public static ComponentClass = Modal;
    private portalDriver: PortalTestDriver;

    constructor(getModal: () => HTMLElement) {
        super(getModal);
        this.portalDriver = new PortalTestDriver(getModal);
    }

    public get root(): HTMLElement {
        return this.portalDriver.portal as HTMLElement;
    }

    public get content(): Element {
        return this.portalDriver.content[0];
    }

    public get children(): HTMLCollection {
        return this.portalDriver.content[0].children[0].children;
    }
}
