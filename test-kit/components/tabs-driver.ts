import {DriverBase} from 'test-drive-react';
import {Tabs} from '../../src';

export class TabsDriver extends DriverBase {
    public static ComponentClass = Tabs;

    public get tabList() {
        return this.select('TAB_LIST');
    }

    public get tabPanel() {
        return this.select('TAB_PANEL');
    }
}
