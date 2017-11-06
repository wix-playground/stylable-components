import {DriverBase} from 'test-drive-react';
import {Tooltip} from '../../src';
import {PortalTestDriver} from './portal-driver';

export class TooltipDriver extends DriverBase {
    public static ComponentClass = Tooltip;
    private portalDriver: PortalTestDriver;
    constructor(getPopup: () => HTMLElement) {
        super(getPopup);
        this.portalDriver = new PortalTestDriver(getPopup);
    }
    public get root(): HTMLElement {
        return this.portalDriver.portal as HTMLElement;
    }
    public get content(): HTMLElement {
        return this.select('TOOLTIP');
    }
    public get tail(): HTMLElement {
        return this.select('TOOLTIP_TAIL');
    }
}
