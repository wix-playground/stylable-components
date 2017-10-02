import * as ReactDOM from 'react-dom';
import {DriverBase} from 'test-drive-react';
import {Popup} from '../../src';
import {PortalTestDriver} from './portal-driver';

export class PopupTestDriver extends DriverBase {
    public static ComponentClass = Popup;
    private portalDriver: PortalTestDriver;

    constructor(getPopup: () => HTMLElement) {
        super(getPopup);
        this.portalDriver = new PortalTestDriver(getPopup);
    }

    public get root(): HTMLElement {
        return this.portalDriver.portal as HTMLElement;
    }

    public get content(): HTMLCollection {
        return this.portalDriver.content;
    }
}
