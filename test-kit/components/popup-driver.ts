import * as ReactDOM from 'react-dom';
import {Popup, Portal} from '../../src';
import {DriverBase} from 'test-drive-react';
import {PortalTestDriver} from './portal-driver';

export class PopupTestDriver extends DriverBase {
    public static ComponentClass = Popup;
    private portalDriver: PortalTestDriver;

    constructor(public readonly instance: Popup) {
        super(() => ReactDOM.findDOMNode(instance));
        this.portalDriver = new PortalTestDriver(instance.getPortal()!);
    }

    public get portal() {
        return this.portalDriver.portal;
    }

    public get content(): NodeList {
        return this.portalDriver.content;
    }
}
