import * as React from 'react';
import {ClientRenderer, expect, selectDom, sinon, waitFor} from 'test-drive-react';
import {DialogDemo} from '../../demo/components/dialog-demo';
import {Dialog} from '../../src';
import {DialogButtonType, DialogTestDriver} from '../../test-kit/components';

const dialogButtons = [
    {id: 'X', handler: 'onCancel', type: 'CLOSE'},
    {id: 'CANCEL', handler: 'onCancel', type: 'CANCEL'},
    {id: 'PRIMARY', handler: 'onOk', type: 'PRIMARY'}
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

        (bodySelect('DIALOG_BODY', 'DIALOG_CLOSE') as HTMLButtonElement).click();

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
        const {driver: dialog, waitForDom} = clientRenderer
            .render(<Dialog isOpen title={testTitle} />)
            .withDriver(DialogTestDriver);

        await waitForDom(() => expect(dialog.title).to.have.text(testTitle));

    });

    dialogButtons.forEach(button => {
        it(`invokes the callback handler provided for ${button.id} button`, async () => {
            const onClick = sinon.spy();

            const handlerProp = {
                [button.handler]: onClick
            };

            const {driver: dialog} = clientRenderer
                                        .render(<Dialog isOpen {...handlerProp} />)
                                        .withDriver(DialogTestDriver);

            const getButton: Element = dialog.getButton(button.type as DialogButtonType);

            (getButton as HTMLButtonElement).click();

            await waitFor(() => expect(onClick).to.have.been.calledOnce);
        });
    });

});
