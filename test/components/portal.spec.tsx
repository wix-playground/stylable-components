import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {Portal} from '../../src';

const portal = 'PORTAL';

describe('<Portal />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(function() {clientRenderer.cleanup(); });

    it('displays the portal and renders its children', async function() {
        clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        await waitFor(() => {
            expect(bodySelect(portal)).to.be.present();
            expect(bodySelect(portal, 'SPAN')).to.be.present();
        });
    });

    it('applies supplied styles to the popup and updates them if changed', async function() {
        const {container} = clientRenderer.render(
            <Portal style={{ position: 'absolute' }}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect((bodySelect(portal) as HTMLElement)!.style.position).to.equal('absolute'));

        clientRenderer.render(
            <Portal style={{ position: 'fixed' }}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect((bodySelect(portal) as HTMLElement)!.style.position).to.equal('fixed'));

    });

    it('removes the component when unmounting', async function() {
        const div = document.body.appendChild(document.createElement('div'));
        clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Popup Body</span>
            </Portal>, div);

        await waitFor(() => expect(bodySelect(portal)).to.be.present());
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        await waitFor(() => {
            expect(bodySelect(portal)).to.not.exist;
            expect(bodySelect('SPAN')).to.not.exist;
        });
    });

    it('updates the portal content if the children are changed', async function() {
        const {container} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect(bodySelect('SPAN')).to.be.present());

        clientRenderer.render(
            <Portal>
                <span data-automation-id="UPDATED_SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(bodySelect('UPDATED_SPAN')).to.be.present());
    });
});
