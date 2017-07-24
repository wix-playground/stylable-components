import React = require('react');
import { expect, ClientRenderer, simulate } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';

const popup = 'POPUP';
const container = 'POPUP_DEMO_DIV';

describe('<Popup />', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(function () {
        clientRenderer.cleanup();
    });

    describe('The popup user', function () {
        it('clicks on the parent and the popup opens', async function () {
            const {select, waitForDom} = clientRenderer.render(<PopupDemo />);

            await waitForDom(() => {
                expect(select(container)).to.be.present();
                expect(select(container, popup)).to.be.absent()
            });
            simulate.click(select(container));
            return waitForDom(() => {
                expect(select(container, popup)).to.be.present();
            });
        });
    });

    it('renders the pop up in the default location', function () {
        
    })
});
