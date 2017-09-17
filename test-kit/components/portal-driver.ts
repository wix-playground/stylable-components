import * as ReactDOM from 'react-dom';
import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    constructor(public readonly instance: Portal) {
        super(() => ReactDOM.findDOMNode(instance));
    }

    public get root(): Element {
        return this.instance.getPortalContainer()!.children[0];
    }

    public get content(): HTMLCollection {
        return this.instance.getPortalContainer()!.children[0].children;
    }

    public get isPresent(): boolean {
        return !!this.instance && !!this.instance.getPortalContainer();
    }
}
