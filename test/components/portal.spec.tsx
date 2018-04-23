import {OverlayManager} from 'html-overlays';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ClientRenderer, expect, selectDom, waitFor} from 'test-drive-react';
import {overlays, Portal} from '../../src';
import {PortalTestDriver} from '../../test-kit';

describe('<Portal />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('displays the portal and renders its children', async () => {
        const {driver} = clientRenderer.render(
            <Portal style={{width: '100px', height: '100px'}}>
                <span>Portal Body</span>
            </Portal>).withDriver(PortalTestDriver);

        await waitFor(() => {
            expect(driver.portal).to.be.present();
            expect(driver.content[0]).to.be.present();

            expect(driver.portal, 'portal should be clickable').to.have.nested.property('style.pointerEvents', 'all');
            expect(driver.portal, 'portal should be visible').to.have.nested.property('style.visibility', 'visible');
        });
    });

    it('applies supplied styles to the popup and updates them if changed', async () => {
        const {container, driver} = clientRenderer.render(
            <Portal style={{position: 'absolute'}}>
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect(driver.portal).to.have.nested.property('style.position', 'absolute'));

        clientRenderer.render(
            <Portal style={{position: 'fixed'}}>
                <span>Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(driver.portal).to.have.nested.property('style.position', 'fixed'));
    });

    it('applies supplied className and id to the popup and updates them if changed', async () => {
        const {container, driver} = clientRenderer.render(
            <Portal className="my-test-class" id="my-test-id">
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect(driver.portal).to.have.nested.property('className', 'my-test-class'));
        await waitFor(() => expect(driver.portal).to.have.nested.property('id', 'my-test-id'));

        clientRenderer.render(
            <Portal className="another-test-class" id="another-test-id">
                <span>Portal Body</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(driver.portal).to.have.nested.property('className', 'another-test-class'));
        await waitFor(() => expect(driver.portal).to.have.nested.property('id', 'another-test-id'));
    });

    it('removes the component when unmounting', async () => {
        const container = document.body.appendChild(document.createElement('div'));
        const {driver} = clientRenderer.render(
            <Portal style={{width: '100px', height: '100px'}}>
                <span>Popup Body</span>
            </Portal>, container).withDriver(PortalTestDriver);

        await waitFor(() => expect(driver.portal).to.be.present());

        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);

        await waitFor(() => expect(driver.portal).to.be.absent());
    });

    it('updates the portal content if the children are changed', async () => {
        const initialText = 'Portal Body';
        const updatedText = 'Portal Body Updated';
        const {container, driver} = clientRenderer.render(
            <Portal>
                <span>{initialText}</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect(driver.content[0]).to.have.text(initialText));

        clientRenderer.render(
            <Portal>
                <span>{updatedText}</span>
            </Portal>,
            container
        );

        await waitFor(() => expect(driver.content[0]).to.have.text(updatedText));
    });

    it('renders the portal in the bottom of the DOM', async () => {
        // make sure overlayManager doesn't already exist. When a new one is created - it should be after the content:

        const {container, driver} = clientRenderer.render(
            <Portal>
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => {
            /* tslint:disable:no-bitwise */
            expect(driver.portal!.compareDocumentPosition(driver.content[0]) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(driver.portal!) & Node.DOCUMENT_POSITION_FOLLOWING,
                'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });

    it('renders the portal in the bottom of the DOM', async () => {
        // make sure overlayManager doesn't already exist. When a new one is created - it should be after the content:

        const {container, driver} = clientRenderer.render(
            <Portal>
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => {
            /* tslint:disable:no-bitwise */
            expect(driver.portal!.compareDocumentPosition(driver.content[0]) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(driver.portal!) & Node.DOCUMENT_POSITION_FOLLOWING,
                'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });

    it('renders with a className passed as a prop', async () => {
        const {driver} = clientRenderer.render(
            <Portal className="test-class">
                <span>Portal Body</span>
            </Portal>
        ).withDriver(PortalTestDriver);

        await waitFor(() => expect(driver.portal as Element).to.have.attribute('class', 'test-class'));
    });

    describe('overlay manager', () => {
        it('creates overlayManager, if no overlayManager was supplied', async () => {
            const selectBody = selectDom(document.body);

            overlays.clearAll();  // Make sure we don't have an existing overlay manager
            expect(selectBody('portal-root')).to.be.equal(null);

            clientRenderer.render(
                <Portal style={{position: 'absolute'}}>
                    <span>Portal Body 1</span>
                </Portal>
            );

            await waitFor(() => {
                expect(document.body.querySelectorAll('.portal-root').length,
                    'portal-root should exist').to.be.equal(1);
            });
        });

        it('reuses global overlayManager, if no overlayManager was supplied and one is available', async () => {
            clientRenderer.render(
                <div>
                            <Portal style={{position: 'absolute'}}>
                                <span>Portal Body 1</span>
                            </Portal>
                            <Portal style={{position: 'absolute'}}>
                                <span>Portal Body 2</span>
                            </Portal>
                        </div>
            );

            await waitFor(() => {
                expect(document.body.querySelectorAll('.portal-root').length,
                    'only one portal-root should exist').to.be.equal(1);
            });
        });

        it('uses given overlayManager if supplied with one', async () => {
            const overlayManager = new OverlayManager(document.body);
            clientRenderer.render(
                <Portal style={{position: 'absolute'}} overlayManager={overlayManager}>
                    <span>Portal Body 1</span>
                </Portal>
            );

            expect(overlayManager.getContentLayer()).not.to.be.equal(null);

            overlayManager.removeSelf(); // We've added an additional OverlayManager to body. remove it
        });
    });
});
