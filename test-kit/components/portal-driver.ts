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

    public get root(): Element {
        return this.ref.getPortalContainer()!.children[0];
    }

    public get content(): HTMLCollection {
        return this.ref.getPortalContainer()!.children[0].children;
    }

    public get isPresent(): boolean {
        return !!this.ref.getPortalContainer();
    }
}
