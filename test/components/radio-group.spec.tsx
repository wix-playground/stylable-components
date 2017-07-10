import React = require('react');
import { expect, ClientRenderer } from 'test-drive-react';
import { RadioButton } from '../../src'

const radioButton = 'RADIO_BUTTON';

describe('<RadioButton />', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('renders the radio button to the screen', function () {
        const { select, waitForDom } = clientRenderer.render(<RadioButton value="Superman" />);

        return waitForDom(() => {
            expect(select(radioButton)).to.be.present().and.to.have.text('Superman');
        });
    })
});
