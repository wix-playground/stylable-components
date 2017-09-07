import * as ReactDOM from 'react-dom';
import {DriverBase} from 'test-drive-react';
import {Portal} from '../../src';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    constructor(public readonly instance: Portal) {
        super(() => ReactDOM.findDOMNode(instance));
    }

    public get portal() {
        return this.select('PORTAL').firstChild;
    }

    public get content() {
        return this.select('PORTAL').childNodes[0].childNodes;
    }
}
