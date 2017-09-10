import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ClientRenderer, expect, waitFor} from 'test-drive-react';
import {Portal} from '../../src';
import {PortalTestDriver} from '../../test-kit';

describe('<Portal />', function() {
    const clientRenderer = new ClientRenderer();

    afterEach(function() {clientRenderer.cleanup(); });

    it('displays the portal and renders its children', async function() {
        const {result} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>);

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => {
            expect(portal.root).to.be.present();
            expect(portal.content[0]).to.be.present();
        });
    });

    it('applies supplied styles to the popup and updates them if changed', async function() {
        const {container, result} = clientRenderer.render(
            <Portal style={{position: 'absolute'}}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect(portal.root).to.have.nested.property('style.position', 'absolute'));

        clientRenderer.render(
            <Portal style={{position: 'fixed'}}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(portal.root).to.have.nested.property('style.position', 'fixed'));
    });

    it('removes the component when unmounting', async function() {
        const container = document.body.appendChild(document.createElement('div'));
        const {result} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Popup Body</span>
            </Portal>, container);

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect(portal.root).to.be.present());

        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);

        await waitFor(() => expect(portal.isPresent).to.be.false);
    });

    it('updates the portal content if the children are changed', async function() {
        const {container, result} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect(portal.content[0]).to.be.present());

        clientRenderer.render(
            <Portal>
                <span data-automation-id="UPDATED_SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(portal.content[0]).to.be.present());
    });

    it('renders the portal in the bottom of the DOM', async function() {
        const {container, result} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => {
            const portalRoot = portal.root!;
            const children = portal.content[0];

            /* tslint:disable:no-bitwise */
            expect(portalRoot.compareDocumentPosition(children) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(portalRoot) & Node.DOCUMENT_POSITION_FOLLOWING,
                'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });

    it('renders with a className passed as a prop', async function() {
        const {result} = clientRenderer.render(
            <Portal className="test-class">
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect((portal.root as Element).className).to.contain('test-class'));
    });
});
