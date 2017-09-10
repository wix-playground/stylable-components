import * as ReactDOM from 'react-dom';
import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;
    private ref: Portal;

    constructor(public readonly instance: Portal) {
        super(() => ReactDOM.findDOMNode(instance));
        this.ref = instance;
    }

    public get root() {
        return this.ref.getPortalContainer()!.firstChild as Element;
    }

    public get content(): NodeList {
        return this.ref.getPortalContainer()!.firstChild!.childNodes;
    }

    public get isPresent() {
        return !!this.ref.getPortalContainer();
    }
}
