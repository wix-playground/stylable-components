import * as ReactDOM from 'react-dom';
import {DriverBase} from 'test-drive-react';
import {Portal} from '../../src';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;
    private ref: Portal;

    constructor(public readonly instance: Portal) {
        super(() => ReactDOM.findDOMNode(instance));
        this.ref = instance;
    }

    public get portal() {
        return this.ref.getPortalContainer()!.firstChild;
    }

    public get content(): NodeList {
        return this.ref.getPortalContainer()!.firstChild!.childNodes;
    }
}
