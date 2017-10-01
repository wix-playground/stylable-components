import { DriverBase } from 'test-drive-react';
import { Portal } from '../../src';
export declare class PortalTestDriver extends DriverBase {
    readonly instance: Portal;
    static ComponentClass: typeof Portal;
    constructor(instance: Portal);
    readonly root: Element;
    readonly content: HTMLCollection;
    readonly isPresent: boolean;
}
