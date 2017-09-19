import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    private get portal(): Element | null {
        if (!this.select('ID_SPAN')) return null;
        const portalDomUniqueId =
            `[data-automation-id="${this.select('ID_SPAN').getAttribute('data-id')!}"]`;
        return document.querySelector(portalDomUniqueId);
    }

    public get portalRoot(): Element {
        return this.portal!;
    }

    public get content(): HTMLCollection {
        return this.portal!.children;
    }
}
