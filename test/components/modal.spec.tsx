import * as React from 'react';
import { ClientRenderer, expect, simulate, waitFor, selectDom } from 'test-drive-react';
import { ModalDemo } from '../../demo/components/modal-demo';
import { Modal } from '../../src';
import { ModalFixture } from '../fixtures/modal-fixture';

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
});
