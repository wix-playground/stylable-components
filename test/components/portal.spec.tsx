import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {Portal} from '../../src';
import {sleep} from '../utils/sleep';

const portal = 'PORTAL';

describe('<Portal />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(function() {clientRenderer.cleanup(); });

    it('displays the portal and renders its children if the open prop is given', async function() {
        clientRenderer.render(
            <Portal open={true}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        await waitFor(() => {
            expect(bodySelect(portal)).to.be.present();
            expect(bodySelect(portal, 'SPAN')).to.be.present();
        });
    });

    it('applies supplied styles to the popup', async function() {
        clientRenderer.render(
            <Portal open={true} style={{ position: 'absolute' }}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        await waitFor(() => expect((bodySelect(portal) as HTMLElement)!.style.position).to.equal('absolute'));
    });

    it('does not add the portal to the DOM if open is false', async function() {
        clientRenderer.render(
            <Portal open={false}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );
        await sleep(10);
        await waitFor(() => {
            expect(bodySelect(portal)).to.not.exist;
            expect(bodySelect(portal, 'SPAN')).to.not.exist;
        });
    });

    it('should unmount portal when open prop is changed to false', async function() {
        const {container} = clientRenderer.render(
            <Portal open={true}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect(bodySelect(portal)).to.be.present());

        clientRenderer.render(
            <Portal open={false}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(bodySelect(portal)).to.not.exist);
    });

    it('removes the component when unmounting', async function() {
        const div = document.body.appendChild(document.createElement('div'));
        clientRenderer.render(
            <Portal open={true}>
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
            <Portal open={true}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect(bodySelect('SPAN')).to.be.present());

        clientRenderer.render(
            <Portal open={true}>
                <span data-automation-id="UPDATED_SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(bodySelect('UPDATED_SPAN')).to.be.present());
    });
});
