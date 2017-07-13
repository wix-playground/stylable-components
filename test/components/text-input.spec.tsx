import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { TextInput } from '../../src';

describe('<TextInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const simulateChange = (domElememt: Element, value: string) => {
        (domElememt as HTMLInputElement).value = value;
        simulate.change(domElememt);
    };

    it('outputs an input element with type="text" by default', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<TextInput data-automation-id="TEXT_INPUT" />);

        await waitForDom(() => {
            const textInput = select('TEXT_INPUT') as HTMLInputElement;

            expect(textInput).to.be.present();
            expect(textInput.tagName).to.equal('INPUT');
            expect(textInput).to.have.attribute('type', 'text');
        });
    });
});
