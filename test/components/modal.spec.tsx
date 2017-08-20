import * as React from 'react';
import { ClientRenderer, expect, selectDom, simulate, waitFor, sinon } from 'test-drive-react';
import { ModalDemo } from '../../demo/components/modal-demo';
import { Modal } from '../../src';

describe('<Modal />', () => {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(() => clientRenderer.cleanup());

    describe('A typical use case for the modal:', function() {
        it('is hidden at first, a user clicks on a button, and then the modal appears', async function() {
            clientRenderer.render(<ModalDemo />);

            await waitFor(() => expect(bodySelect('MODAL')!).to.be.absent());

            simulate.click(bodySelect('MODAL_BUTTON'));

            await waitFor(() => expect(bodySelect('MODAL')!).to.be.present());
        });
    });

    it('renders to the screen', async function() {
        clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => expect(bodySelect('MODAL')!).to.be.present());
    });

    it('renders any children passed as props', async function() {
        clientRenderer.render(
            <Modal isOpen={true}>
                <p data-automation-id="CHILD_1">child 1</p>
                <p data-automation-id="CHILD_2">child 2</p>
            </Modal>
        );

        await waitFor(() => {
            expect(bodySelect('CHILD_1')).to.be.present();
            expect(bodySelect('CHILD_2')).to.be.present();
        });
    });

    it('takes the full width and height of the viewport', async function() {
        clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => {
            expect(bodySelect('MODAL')!.clientHeight).to.equal(window.innerHeight);
            expect(bodySelect('MODAL')!.clientWidth).to.equal(window.innerWidth);
        });
    });

    it('is centered in the viewport', async function() {
        clientRenderer.render(<Modal isOpen={true} />);

        function checkIfCentered(element: Element) {
            const rects = element.getBoundingClientRect();
            return rects.top === 0
                && rects.left === 0
                && rects.right === window.innerWidth
                && rects.bottom === window.innerHeight;
        }

        await waitFor(() => expect(checkIfCentered(bodySelect('MODAL')!)).to.equal(true));
    });

    it('renders one child in the center of the viewport', async function() {
        clientRenderer.render(
            <Modal isOpen={true}>
                <p data-automation-id="CHILD_1">child 1</p>
            </Modal>
        );

        await waitFor(() => {
            const child = bodySelect('CHILD_1');
            const modal = bodySelect('MODAL');
            expect([child, modal]).to.be.horizontallyAligned('center');
            expect([child, modal]).to.be.verticallyAligned('center');
        });
    });

    it('renders children in horizontal alignment', async function() {
        clientRenderer.render(
            <Modal isOpen={true}>
                <p data-automation-id="CHILD_1">child 1</p>
                <p data-automation-id="CHILD_2">child 2</p>
            </Modal>
        );

        await waitFor(() => {
            const childOne = bodySelect('CHILD_1');
            const childTwo = bodySelect('CHILD_2');
            const modal = bodySelect('MODAL');
            expect([childOne, childTwo, modal]).to.be.horizontallyAligned('center');
        });
    });

    it('adds overflow: hidden to the body when opened and removes it when closed', async function() {
        clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => {
            expect(window.getComputedStyle(document.body).overflow).to.equal('hidden');
        });

        clientRenderer.render(<Modal isOpen={false} />);

        await waitFor(() => {
            expect(window.getComputedStyle(document.body).overflow).to.not.equal('hidden');
        });
    });

    it('appears centered even when the page is scrolled', async function() {
        const scroll = document.createElement('div');
        scroll.style.height = '1000vh';
        scroll.style.width = '1000vw';
        document.body.appendChild(scroll);
        window.scrollTo(0, 2 * window.innerHeight);
        clientRenderer.render(<Modal isOpen={true} />);

        await waitFor(() => {
            expect(bodySelect('MODAL')!.getBoundingClientRect().top).to.equal(0);
        });

        document.body.removeChild(scroll);
    });

    it('calls onRequestClose with "backdrop" when the backdrop is clicked', async function() {
        const onRequestClose = sinon.spy();
        clientRenderer.render(<Modal isOpen={true} onRequestClose={onRequestClose} />);

        simulate.click(bodySelect('MODAL')!);

        await waitFor(() => expect(onRequestClose).to.have.been.calledWith('backdrop'));
    });
});
