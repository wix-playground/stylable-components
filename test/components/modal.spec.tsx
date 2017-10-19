import * as React from 'react';
import {ClientRenderer, expect, selectDom, simulate, sinon, waitFor} from 'test-drive-react';
import {ModalDemo} from '../../demo/components/modal-demo';
import {Modal} from '../../src';
import {ModalTestDriver} from '../../test-kit/components';

describe('<Modal />', () => {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(() => clientRenderer.cleanup());

    describe('A typical use case for the modal:', () => {
        it('is hidden at first, a user clicks on a button, the modal appears,' +
            'and then the user clicks on the background and the model closes', async () => {
            clientRenderer.render(<ModalDemo />);

            await waitFor(() => expect(bodySelect('MODAL')).to.be.absent());

            simulate.click(bodySelect('MODAL_BUTTON'));

            await waitFor(() => expect(bodySelect('MODAL')).to.be.present());

            simulate.click(bodySelect('MODAL')!);

            await waitFor(() => expect(bodySelect('MODAL')).to.be.absent());
        });
    });

    it('renders to the screen', async () => {
        const {driver: modal} = clientRenderer.render(<Modal isOpen />).withDriver(ModalTestDriver);

        await waitFor(() => expect(modal.content).to.be.present());
    });

    it('renders any children passed as props', async () => {
        const {driver: modal} = clientRenderer.render(
            <Modal isOpen={true}>
                <p>child 1</p>
                <p>child 2</p>
            </Modal>
        ).withDriver(ModalTestDriver);

        await waitFor(() => {
            expect(modal.children[0]).to.be.present();
            expect(modal.children[0]).to.have.text('child 1');
            expect(modal.children[1]).to.be.present();
            expect(modal.children[1]).to.have.text('child 2');
        });
    });

    it('takes the full width and height of the viewport and is centered in the viewport', async () => {
        const {driver: modal} = clientRenderer.render(<Modal isOpen={true} />).withDriver(ModalTestDriver);

        function checkIfAlignedToScreen(element: Element) {
            const rects = element.getBoundingClientRect();
            return rects.top === 0 && rects.left === 0;
        }

        await waitFor(() => {
            expect(checkIfAlignedToScreen(modal.content), 'The modal wasn\'t centered').to.equal(true);
            expect(modal.content.clientHeight).to.equal(window.innerHeight);
            expect(modal.content.clientWidth).to.equal(window.innerWidth);
        });
    });

    it('renders one child in the center of the viewport', async () => {
        const {driver: modal} = clientRenderer.render(
            <Modal isOpen={true}>
                <p style={{width: '50px', height: '50px'}}>child 1</p>
            </Modal>
        ).withDriver(ModalTestDriver);

        await waitFor(() => {
            expect([modal.children[0], modal.content]).to.be.horizontallyAligned('center', 1);
            expect([modal.children[0], modal.content]).to.be.verticallyAligned('center', 1);
        });
    });

    it('renders children in horizontal alignment', async () => {
        const {driver: modal} = clientRenderer.render(
            <Modal isOpen={true}>
                <p style={{width: '50px', height: '50px'}}>child 1</p>
                <p style={{width: '50px', height: '50px'}}>child 2</p>
            </Modal>
        ).withDriver(ModalTestDriver);

        await waitFor(() =>
            expect([modal.children[0], modal.children[1], modal.content])
                .to.be.horizontallyAligned('center', 1));
    });

    it('adds overflow: hidden to the body when opened and removes it when closed', async () => {
        const {container} = clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => expect(window.getComputedStyle(document.body).overflow).to.equal('hidden'));

        clientRenderer.render(<Modal isOpen={false} />, container);

        await waitFor(() => expect(window.getComputedStyle(document.body).overflow).to.not.equal('hidden'));

        clientRenderer.render(<Modal isOpen={true} />, container);

        await waitFor(() => expect(window.getComputedStyle(document.body).overflow).to.equal('hidden'));
    });

    it('appears aligned with the viewport even when the page was scrolled', async () => {
        const scroll = document.createElement('div');
        scroll.style.height = '1000vh';
        scroll.style.width = '1000vw';
        document.body.appendChild(scroll);
        window.scrollTo(0, 2 * window.innerHeight);
        clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => {
            expect(bodySelect('MODAL')!.getBoundingClientRect().top).to.equal(0);
        });

        window.scrollTo(0, 0);
        document.body.removeChild(scroll);
    });

    it('calls onRequestClose with source equal to backdrop when the backdrop is clicked', async () => {
        const onRequestClose = sinon.spy();
        clientRenderer.render(<Modal isOpen={true} onRequestClose={onRequestClose} />);

        simulate.click(bodySelect('MODAL'));

        await waitFor(() => expect(onRequestClose).to.have.been.calledWithMatch({source: 'backdrop'}));
    });

    it('calls onRequestClose with source equal to children when the child is clicked', async () => {
        const onRequestClose = sinon.spy();

        clientRenderer.render(
            <Modal isOpen={true} onRequestClose={onRequestClose}>
                <p data-slot="child" data-automation-id="CHILD_1">child 1</p>
            </Modal>
        );

        simulate.click(bodySelect('CHILD_1'));

        await waitFor(() => expect(onRequestClose.getCall(0)).to.have.been.calledWithMatch({source: 'child'}));
    });

    it('renders the modal to the bottom of the DOM', async () => {
        const {container} = clientRenderer.render(
            <Modal isOpen={true}>
                <p data-automation-id="CHILD_1">child 1</p>
            </Modal>
        );

        await waitFor(() => {
            const modal = bodySelect<HTMLElement>('MODAL')!;
            const children = bodySelect<HTMLElement>('CHILD_1')!;

            /* tslint:disable:no-bitwise */
            expect(modal.compareDocumentPosition(children) & Node.DOCUMENT_POSITION_CONTAINED_BY,
                'children contained in modal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
            expect(container.compareDocumentPosition(modal) & Node.DOCUMENT_POSITION_FOLLOWING,
                'modal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
            /* tslint:enable:no-bitwise */
        });
    });
});
