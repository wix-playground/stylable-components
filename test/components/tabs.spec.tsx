import * as React from 'react';
import {ClientRenderer, expect, sinon} from 'test-drive-react';
import {Tab, Tabs} from '../../src';
import {TabsDriver} from '../../test-kit';

describe('<Tabs />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('should render a tabList and a tabPanel', () => {
        const {driver} = clientRenderer.render(
            <Tabs>
                <Tab label="Tab One">Tab One Content</Tab>
                <Tab label="Tab Two">Tab Two Content</Tab>
            </Tabs>
        ).withDriver(TabsDriver);

        const tabList = driver.tabList;
        const tabPanel = driver.tabPanel;

        expect(tabList).to.be.present();
        expect(tabPanel).to.be.present();
    });
});
