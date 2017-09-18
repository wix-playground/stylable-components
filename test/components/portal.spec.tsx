import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ClientRenderer, expect, waitFor} from 'test-drive-react';
import {Portal} from '../../src';
import {PortalTestDriver} from '../../test-kit';

describe('<Portal />', function() {
    const clientRenderer = new ClientRenderer();

    afterEach(function() {clientRenderer.cleanup(); });

    it('displays the portal and renders its children', async function() {
        const {portal} = clientRenderer.render(
            <Portal>
                <span>Portal Body</span>
            </Portal>).withDriver(PortalTestDriver);

        await waitFor(() => {
            expect(portal.root).to.be.present();
            expect(portal.content[0]).to.be.present();
        });
    });

    it('applies supplied styles to the popup and updates them if changed', async function() {
        const {container, portal} = clientRenderer.render(
            <Portal style={{position: 'absolute'}}>
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect(portal.root).to.have.nested.property('style.position', 'absolute'));

        clientRenderer.render(
            <Portal style={{position: 'fixed'}}>
                <span>Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(portal.root).to.have.nested.property('style.position', 'fixed'));
    });

    it('applies supplied className and id to the popup and updates them if changed', async function() {
        const {container, result} = clientRenderer.render(
            <Portal className="my-test-class" id="my-test-id">
                <span>Portal Body</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect(portal.root).to.have.nested.property('className', 'my-test-class'));
        await waitFor(() => expect(portal.root).to.have.nested.property('id', 'my-test-id'));

        clientRenderer.render(
            <Portal className="another-test-class" id="another-test-id">
                <span>Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(portal.root).to.have.nested.property('className', 'another-test-class'));
        await waitFor(() => expect(portal.root).to.have.nested.property('id', 'another-test-id'));
    });

    it('removes the component when unmounting', async function() {
        const container = document.body.appendChild(document.createElement('div'));
        const {portal} = clientRenderer.render(
            <Portal>
                <span>Popup Body</span>
            </Portal>, container).withDriver(PortalTestDriver);

        await waitFor(() => expect(portal.root).to.be.present());

        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);

        await waitFor(() => expect(portal.isPresent).to.be.false);
    });

    it('updates the portal content if the children are changed', async function() {
        const initialText = 'Portal Body';
        const updatedText = 'Portal Body Updated';
        const {container, result} = clientRenderer.render(
            <Portal>
                <span>{initialText}</span>
            </Portal>
        );

        const portal = new PortalTestDriver(result as Portal);

        await waitFor(() => expect(portal.content[0]).to.have.text(initialText));

        clientRenderer.render(
            <Portal>
                <span>{updatedText}</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(portal.content[0]).to.have.text(updatedText));
    });

    it('renders the portal in the bottom of the DOM', async function() {
        const {container, portal} = clientRenderer.render(
            <Portal>
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => {
            /* tslint:disable:no-bitwise */
            expect(portal.root.compareDocumentPosition(portal.content[0]) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(portal.root) & Node.DOCUMENT_POSITION_FOLLOWING,
                'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });

    it('renders with a className passed as a prop', async function() {
        const {portal} = clientRenderer.render(
            <Portal className="test-class">
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect((portal.root as Element).className).to.contain('test-class'));
    });
});
