import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup())

    it('outputs an input element with type="number" by default', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<NumberInput data-automation-id="NUMBER_INPUT" />);

        await waitForDom(() => {
            const numberInput = select('NUMBER_INPUT') as HTMLInputElement;

            expect(numberInput).to.be.present();
            // expect(numberInput).to.be.instanceOf(HTMLInputElement);
            expect(numberInput.tagName).to.equal('INPUT');
            expect(numberInput).to.have.attribute('type', 'number');
        });
    });
});



