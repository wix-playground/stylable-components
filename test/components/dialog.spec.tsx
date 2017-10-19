import * as React from 'react';
import {ClientRenderer, expect, selectDom, sinon, waitFor} from 'test-drive-react';
import {DialogDemo} from '../../demo/components/dialog-demo';
import {Dialog} from '../../src';

const dialogButtons = [
    {id: 'X', handler: 'onCancel'},
    {id: 'CANCEL', handler: 'onCancel'},
    {id: 'PRIMARY', handler: 'onOk'}
];

describe('<Dialog />', () => {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(() => clientRenderer.cleanup());

    it('opens the dialog upon extra button click, and closes it upon clicking any of the buttons', async () => {
        const {select, waitForDom} = clientRenderer.render(<DialogDemo />);

        const showDialogBtn = select('DIALOG_BUTTON') as HTMLButtonElement;
        showDialogBtn.click();

        await waitForDom(() => expect(bodySelect('DIALOG_BODY')).to.be.present());

        (bodySelect('DIALOG_BODY', 'DIALOG_X') as HTMLButtonElement).click();

        await waitForDom(() => expect(bodySelect('DIALOG_BODY')).to.be.absent());
        showDialogBtn.click();

        (bodySelect('DIALOG_BODY', 'DIALOG_CANCEL') as HTMLButtonElement).click();

        await waitForDom(() => expect(bodySelect('DIALOG_BODY')).to.be.absent());
        showDialogBtn.click();

        (bodySelect('DIALOG_BODY', 'DIALOG_PRIMARY') as HTMLButtonElement).click();

        await waitForDom(() => expect(bodySelect('DIALOG_BODY')).to.be.absent());
    });

    it('displays the provided title', async () => {
        const testTitle = 'Do you accept this?';
        const {waitForDom} = clientRenderer.render(<Dialog isOpen title={testTitle} />);

        await waitForDom(() => expect(bodySelect('DIALOG_BODY', 'DIALOG_TITLE')).to.have.text(testTitle));

    });

    dialogButtons.forEach(button => {
        it(`invokes the callback handler provided for ${button.id} button`, async () => {
            const onClick = sinon.spy();

            const handlerProp = {
                [button.handler]: onClick
            };

            clientRenderer.render(<Dialog isOpen {...handlerProp} />);

            (bodySelect('DIALOG_BODY', `DIALOG_${button.id}`) as HTMLButtonElement).click();

            await waitFor(() => expect(onClick).to.have.been.calledOnce);
        });
    });

});
