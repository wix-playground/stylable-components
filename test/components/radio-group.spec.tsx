import React = require('react');
import {expect, ClientRenderer, simulate} from 'test-drive-react';
import { RadioButton } from '../../src'
import { RadioGroupDemo } from '../../demo/radio-group-demo';

const radioGroup = 'RADIO_GROUP';
const radioButton = 'RADIO_BUTTON';

describe('<RadioGroup />', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('The radio group user', function () {
        it('clicks on a button and it is selected', async function () {
            const {select, waitForDom} = clientRenderer.render(<RadioGroupDemo/>);

            await waitForDom(() => { expect(select(radioGroup, radioButton + '_0')).to.be.present() });
            simulate.click(select(radioGroup, radioButton + '_0'));
            return await waitForDom(() => {
                expect(select('RADIO_GROUP_DEMO_VALUE')).to.have.text('This way!');
            });
        });
    });

    describe('<RadioButton />', function () {
        it('renders a radio button to the screen', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Shiva"/>);

            return waitForDom(() => {
                expect(select(radioButton)).to.be.present().and.to.have.attr('type', 'radio');
                expect(select(radioButton)).to.have.attr('value', 'Shiva');
            });
        });
    });


});

