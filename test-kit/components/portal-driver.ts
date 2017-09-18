import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;

    private get portal(): HTMLElement | null {
        return document.getElementById(this.select('ID_SPAN').getAttribute('data-id')!);
    }

    public get root(): Element {
        return this.portal!.children[0];
    }

    public get content(): HTMLCollection {
        return this.portal!.children[0].children;
    }

    public get isPresent(): boolean {
        return !!this.portal;
    }
}
