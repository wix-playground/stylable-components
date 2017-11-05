import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ClientRenderer, expect, sinon, waitFor} from 'test-drive-react';
import {Portal} from '../../src';
import {PortalTestDriver} from '../../test-kit';

describe('<Portal />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {clientRenderer.cleanup(); });

    it('displays the portal and renders its children', async () => {
        const {driver} = clientRenderer.render(
            <Portal>
                <span>Portal Body</span>
            </Portal>).withDriver(PortalTestDriver);

        await waitFor(() => {
            expect(driver.portal).to.be.present();
            expect(driver.content[0]).to.be.present();
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
            <Portal>
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

    it('calls the onLayout callback after rendering with the correct layout', async () => {
        const onLayout = sinon.spy();
        const layout = {
            top: 0,
            left: 0,
            right: 102,
            bottom: 101,
            height: 101,
            width: 102
        };
        clientRenderer.render(
            <Portal style={{display: 'inline-block', position: 'absolute', top: '0', left: '0'}} onLayout={onLayout}>
                <div style={{height: '101px', width: '102px'}}>1</div>
            </Portal>
        );

        await waitFor(() => {
            expect(onLayout).to.have.been.calledOnce;
            expect(onLayout.getCall(0).args[0]).to.include(layout);
        });
    });
});
