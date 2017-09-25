import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    private get portal(): Element | null {
        if (!this.select('PORTAL_REF')) {
            return null;
        }
        const portalRefSelector =
            `[data-automation-id="${this.select('PORTAL_REF').getAttribute('data-id')!}"]`;
        return document.querySelector(portalRefSelector);
    }

    public get content(): HTMLCollection {
        return this.portal!.children;
    }
}
