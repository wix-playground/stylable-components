import React = require('react');
import {expect, ClientRenderer, simulate, waitFor, sinon} from 'test-drive-react';
import { RadioButton, RadioGroup } from '../../src'
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

            await waitForDom(() => { expect(select("RADIO_GROUP_DEMO", radioGroup, radioButton + '_0')).to.be.present() });
            simulate.click(select(radioGroup, radioButton + '_0'));
            return await waitForDom(() => {
                expect(select('RADIO_GROUP_DEMO_VALUE')).to.have.text('Value: This way!');
            });
        });
    });

    it('renders to the screen with radio buttons as children', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Ifrit"/>
                <RadioButton value="Titan"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            expect(select(radioGroup, radioButton + '_0')).to.be.present();
            expect(select(radioGroup, radioButton + '_1')).to.be.present();
        });
    });

    it('renders calls the given onChange function on change', async function () {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={onChange}>
                <RadioButton value="Leviathan"/>
                <RadioButton value="Quetzalcoatl"/>
            </RadioGroup>
        );

        await waitForDom(() => { expect(select(radioGroup, radioButton + '_1')).to.be.present() });
        simulate.click(select(radioGroup, radioButton + '_1'));
        return await waitFor(() => {
            expect(onChange).to.have.been.calledWithMatch({data: 'Quetzalcoatl'});
        })
    });


    describe('<RadioButton />', function () {
        it('renders a radio button to the screen', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Shiva" automationId={radioButton + '_0'}/>);

            return waitForDom(() => {
                expect(select(radioButton + '_0')).to.be.present().and.to.have.attr('type', 'radio');
                expect(select(radioButton + '_0')).to.have.attr('value', 'Shiva');
            });
        });
    });


});

