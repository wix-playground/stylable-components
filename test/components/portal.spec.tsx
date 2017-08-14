import React = require('react');
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {Portal} from '../../src';
import sleep from '../../src/common/sleep';

const portal = 'PORTAL';

describe('<Portal />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(function() {clientRenderer.cleanup(); });

    it('displays the portal and renders its children if the open prop is given', function() {
        clientRenderer.render(
            <Portal
                open={true}
            >
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        return waitFor(() => {
            expect(bodySelect(portal)).to.be.present();
            expect(bodySelect(portal, 'SPAN')).to.be.present();
        });
    });

    it('does not add the portal to the DOM if open is false', function() {
        clientRenderer.render(
            <Portal
                open={false}
            >
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        return waitFor(() => {
            expect(bodySelect(portal)).to.not.exist;
            expect(bodySelect(portal, 'SPAN')).to.not.exist;
        });
    });

    // it('removes the component when unmounting', async function() {
    //
    //     clientRenderer.render(
    //         <Portal
    //             open={true}
    //         >
    //             <span data-automation-id="SPAN">Popup Body</span>
    //         </Portal>);

        // await waitFor(() => {expect(bodySelect(popup)).to.be.present(); });
        // ReactDOM.unmountComponentAtNode(bodySelect(popup)!.parentElement!);
        // return waitFor(() => {expect(bodySelect(popup)).to.not.exist; });
    // });
});
