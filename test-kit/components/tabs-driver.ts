import {codes as KeyCodes} from 'keycode';
import {SyntheticEventData} from 'react-dom/test-utils';
import {DriverBase, simulate} from 'test-drive-react';

import {ContextProvider} from '../../src/components/context-provider';
import {Tabs} from '../../src/components/tabs';

export class BaseTabsDriver extends DriverBase {

    public get tabList() {
        return this.select('TAB_LIST');
    }

    public get tabPanel() {
        return this.select('TAB_PANEL');
    }

    public selectTabContent(selector: string) {
        return this.select('TAB_PANEL', selector);
    }

    public selectTabItem(selector: string) {
        return this.select('TAB_LIST', selector);
    }

    public tabListFocus() {
        simulate.focus(this.tabList);
    }

    public tabListBLur() {
        simulate.blur(this.tabList);
    }

    public tabListKeyDown(keyCode: number, opts?: SyntheticEventData) {
        simulate.keyDown(this.tabList, {keyCode, ...opts});
    }

    public tabListPressEnter() {
        this.tabListKeyDown(KeyCodes.enter);
    }
}

export class TabsDriver extends BaseTabsDriver {
    public static ComponentClass = Tabs;
}

export class RTLTabsDriver extends BaseTabsDriver {
    public static ComponentClass = ContextProvider;
}
