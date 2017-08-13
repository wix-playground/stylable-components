import * as React from 'react';
import { ClientRenderer, expect, simulate } from 'test-drive-react';
import { Modal } from '../../src';
import { ModalDemo } from '../../demo/components/modal-demo';

describe('<Modal />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('A typical use case for the modal:', function() {
        it('is hidden at first, a user clicks on a button, and then the modal appears', async function() {
            const {select, waitForDom} = clientRenderer.render(<ModalDemo />);

            await waitForDom(() => expect(select('MODAL')!).to.be.absent());

            simulate.click(select('MODAL_BUTTON'));

            await waitForDom(() => expect(select('MODAL')!).to.be.present());
        });
    });

    it('renders to the screen', async function() {
        const {select, waitForDom} = clientRenderer.render(<Modal isOpen={true} />);

        await waitForDom(() => expect(select('MODAL')!).to.be.present());
    });

    it('renders any children passed as props', async function() {
        const childrenArray: Array<React.ReactElement<any>> = [
            <p data-automation-id="CHILD_1" key="1">child 1</p>,
            <p data-automation-id="CHILD_2" key="2">child 2</p>
        ];

        const {select, waitForDom} = clientRenderer.render(<Modal isOpen={true} children={childrenArray} />);

        await waitForDom(() => {
            expect(select('CHILD_1')).to.be.present();
            expect(select('CHILD_2')).to.be.present();
        });
    });

    it('takes the full width and height of the viewport', async function() {
        const {select, waitForDom} = clientRenderer.render(<Modal isOpen={true} />);

        await waitForDom(() => {
            expect(select('MODAL')!.clientHeight).to.equal(window.innerHeight);
            expect(select('MODAL')!.clientWidth).to.equal(window.innerWidth);
        });
    });

    it('sits above any elements already present', async function() {

    });
});
