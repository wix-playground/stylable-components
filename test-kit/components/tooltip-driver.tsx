import {DriverBase} from 'test-drive-react';
import {Position, Tooltip} from '../../src';
import styles from '../../src/components/tooltip/tooltip.st.css';
import {PortalTestDriver} from './portal-driver';

const positions: Position[] = [
    'top', 'topLeft', 'topRight',
    'right', 'rightTop', 'rightBottom',
    'bottom', 'bottomRight', 'bottomLeft',
    'left', 'leftBottom', 'leftTop'
];

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
    public get position(): Position | null {
        const classList = this.content.classList;
        for (const position of positions) {
            if (classList.contains(styles.$get(position))) {
                return position;
            }
        }
        return null;
    }
}
