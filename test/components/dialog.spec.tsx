import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {DialogDemo} from '../../demo/components/dialog-demo';
import {Dialog} from '../../src';
import {DialogButtonType, DialogTestDriver} from '../../test-kit/components';

const dialogButtons = [
    {id: 'X', handler: 'onCancel', type: 'CLOSE'},
    {id: 'CANCEL', handler: 'onCancel', type: 'CANCEL'},
    {id: 'PRIMARY', handler: 'onOk', type: 'PRIMARY'}
];

class DialogDemoDriver extends DriverBase {
    public static ComponentClass = DialogDemo;
    public dialogDriver: DialogTestDriver;

    constructor(getDialogDemo: () => HTMLElement) {
        super(getDialogDemo);
        this.dialogDriver = new DialogTestDriver(getDialogDemo);
    }

    public get dialog(): Element {
        return this.dialogDriver.root;
    }

    public get showDialogButton(): Element {
        return this.select('DIALOG_BUTTON');
    }
}

describe('<Dialog />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    it('opens the dialog upon extra button click, and closes it upon clicking any of the buttons', async () => {
        const {driver: dialogDemo, waitForDom} =
            clientRenderer
                .render(<DialogDemo />)
                .withDriver(DialogDemoDriver);

        const showDialogBtn = dialogDemo.showDialogButton as HTMLButtonElement;
        showDialogBtn.click();

        const dialogDriver = dialogDemo.dialogDriver;

        await waitForDom(() => expect(dialogDemo.dialog).to.be.present());

        (dialogDriver.getButton('CLOSE') as HTMLButtonElement).click();

        await waitForDom(() => expect(dialogDriver.modalDriver.root).to.be.absent());
        showDialogBtn.click();

        (dialogDriver.getButton('CANCEL') as HTMLButtonElement).click();

        await waitForDom(() => expect(dialogDriver.modalDriver.root).to.be.absent());
        showDialogBtn.click();

        (dialogDriver.getButton('PRIMARY') as HTMLButtonElement).click();

        await waitForDom(() => expect(dialogDriver.modalDriver.root).to.be.absent());
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
