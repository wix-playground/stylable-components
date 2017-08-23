import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ClientRenderer, expect, selectDom, waitFor} from 'test-drive-react';
import {Portal} from '../../src';

const portalId = 'PORTAL';

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
            expect(bodySelect(portalId)).to.be.present();
            expect(bodySelect(portalId, 'SPAN')).to.be.present();
        });
    });

    it('applies supplied styles to the popup and updates them if changed', async function() {
        const {container} = clientRenderer.render(
            <Portal style={{position: 'absolute'}}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect(bodySelect(portalId)).to.have.nested.property('style.position', 'absolute'));

        clientRenderer.render(
            <Portal style={{position: 'fixed'}}>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(bodySelect(portalId)).to.have.nested.property('style.position', 'fixed'));
    });

    it('removes the component when unmounting', async function() {
        const container = document.body.appendChild(document.createElement('div'));
        clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Popup Body</span>
            </Portal>, container);

        await waitFor(() => expect(bodySelect(portalId)).to.be.present());

        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);

        await waitFor(() => {
            expect(bodySelect(portalId)).to.be.absent();
            expect(bodySelect('SPAN')).to.be.absent();
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

    it('renders the portal in the bottom of the DOM', async function() {
        const {container} = clientRenderer.render(
            <Portal>
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => {
            const portal = bodySelect<HTMLElement>(portalId)!;
            const children = bodySelect<HTMLElement>('SPAN')!;

            /* tslint:disable:no-bitwise */
            expect(portal.compareDocumentPosition(children) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(portal) & Node.DOCUMENT_POSITION_FOLLOWING,
                'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });

    it('renders with a className passed as a prop', async function() {
        clientRenderer.render(
            <Portal className="test-class">
                <span data-automation-id="SPAN">Portal Body</span>
            </Portal>
        );

        await waitFor(() => expect(bodySelect(portalId).className).to.contain('test-class'));
    });
});
