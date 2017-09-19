import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    private get portal(): HTMLElement | null {
        return this.select('ID_SPAN') &&
               document.getElementById(this.select('ID_SPAN').getAttribute('data-id')!);
    }

    public get portalRoot(): Element {
        return this.portal!;
    }

    public get content(): HTMLCollection {
        return this.portal!.children;
    }

    public get isPresent(): boolean {
        return !!this.portal;
    }
}
