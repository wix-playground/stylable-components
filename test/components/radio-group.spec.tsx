import React = require('react');
import {expect, ClientRenderer, simulate, waitFor, sinon} from 'test-drive-react';
import { RadioButton, RadioGroup } from '../../src'
import { RadioGroupDemo } from '../../demo/components/radio-group-demo';

const radioGroup = 'RADIO_GROUP';
const radioButton = 'RADIO_BUTTON';
const emptyFunction = () => {};

describe('<RadioGroup />', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('The radio group user', function () {
        it('clicks on a button and it is selected', async function () {
            const {select, waitForDom} = clientRenderer.render(<RadioGroupDemo/>);

            await waitForDom(() => { expect(select("RADIO_GROUP_DEMO", radioGroup, radioButton + '_0')).to.be.present() });
            const button0 = select(radioGroup, radioButton + '_0') as HTMLInputElement;
            button0.click();
            await waitForDom(() => {
                expect(select('RADIO_GROUP_DEMO_VALUE')).to.have.text('Value: This way!');
            });
        });
    });

    it('renders to the screen with unselected radio buttons as children', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction}>
                <RadioButton value="Ifrit"/>
                <RadioButton value="Titan"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
            const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

            expect(button0).to.be.present();
            expect(button0.checked).to.be.false;
            expect(button0.name).to.equal(button1.name);
            expect(button1).to.be.present();
            expect(button1.checked).to.be.false;
        });
    });

    it('renders other components as children', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction}>
                <RadioButton value="1"/>
                <span>Surprise!</span>
                <RadioButton value="2"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            const container = select(radioGroup) as HTMLDivElement;
            expect(container.children[1].tagName).to.equal('SPAN');
        });

    });

    it('renders the children with the given name value', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction} name="kupo">
                <RadioButton value="Ultima"/>
                <RadioButton value="Hades"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
            const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

            expect(button0.name).to.equal('kupo');
            expect(button1.name).to.equal('kupo');
        });
    });

    it('renders a checked radio button if the checked prop is true', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction} name="kupo">
                <RadioButton value="Minerva"/>
                <RadioButton checked={true} value="Kitsune"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

            expect(button1.checked).to.be.true;
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
        simulate.click(select(radioGroup, radioButton + '_1', 'INPUT'));
        return waitFor(() => {
            expect(onChange).to.have.been.calledWithMatch('Quetzalcoatl');
        })
    });

    it('sets the clicked radio button to be active on click', async function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction}>
                <RadioButton value="Garuda"/>
                <RadioButton value="Ramuh"/>
            </RadioGroup>
        );

        await waitForDom(() => { expect(select(radioGroup, radioButton + '_0')).to.be.present() });
        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        button0.click();
        return waitForDom(() => {
            const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;
            expect(button0.checked).to.be.true;
            expect(button1.checked).to.be.false;
        })
    });

    it('changes the selected button when clicking on a different one', async function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={emptyFunction}>
                <RadioButton value="Diabolos"/>
                <RadioButton value="Bahamut"/>
            </RadioGroup>
        );

        await waitForDom(() => { expect(select(radioGroup, radioButton + '_0', 'INPUT')).to.be.present() });
        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        button0.click();
        await waitForDom(() => { expect(button0.checked).to.be.true; });
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;
        button1.click();
        return waitForDom(() => {
            expect(button0.checked).to.be.false;
            expect(button1.checked).to.be.true;
        });
    });

    it('does not affect buttons in a different radio group', async function () {
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <div data-automation-id="DIV_0">
                    <RadioGroup onChange={emptyFunction}>
                        <RadioButton value="Siren"/>
                        <RadioButton value="Cerberus"/>
                    </RadioGroup>
                </div>
                <div data-automation-id="DIV_1">
                    <RadioGroup onChange={emptyFunction}>
                        <RadioButton value="Alexander"/>
                        <RadioButton value="Odin"/>
                    </RadioGroup>
                </div>
            </div>
        );

        await waitForDom(() => { expect(select('DIV_0', radioGroup, radioButton + '_0', 'INPUT')).to.be.present() });
        const button0 = select('DIV_0', radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        button0.click();
        await waitForDom(() => { expect(button0.checked).to.be.true; });
        const button1 = select('DIV_1', radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;
        button1.click();
        return waitForDom(() => {
            expect(button0.checked).to.be.true;
            expect(button1.checked).to.be.true;
        });
    });

    it('disabled all radio button children if the disabled prop is true', function () {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup disabled={true} onChange={emptyFunction}>
                <RadioButton value="Fafnir"/>
                <RadioButton value="Sleipnir"/>
            </RadioGroup>
        );

        return waitForDom(() => {
            const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
            const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

            expect(button0.disabled).to.be.true;
            expect(button1.disabled).to.be.true;
        });
    });

    describe('<RadioButton />', function () {
        it('renders a radio button to the screen', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Shiva" automationId={radioButton + '_0'} name=""/>);

            return waitForDom(() => {
                expect(select(radioButton + '_0', 'INPUT')).to.be.present().and.to.have.attr('type', 'radio');
                expect(select(radioButton + '_0', 'INPUT')).to.have.attr('value', 'Shiva');

            });
        });

        it('renders the label next to the radio button (right by default)', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Omega" automationId={radioButton + '_0'} name=""/>);

            return waitForDom(() => {
                const label = select(radioButton + '_0', 'LABEL');
                const button = select(radioButton + '_0', 'INPUT_CONTAINER');
                expect(label).to.have.text('Omega');
                expect([button, label]).to.be.horizontallyAligned;
                expect([button, label]).to.be.inHorizontalSequence();
            })
        });

        it('renders the label on the left side', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Tiamat" location="left" automationId={radioButton + '_0'} name=""/>);

            return waitForDom(() => {
                const label = select(radioButton + '_0', 'LABEL');
                const button = select(radioButton + '_0', 'INPUT_CONTAINER');
                expect([label, button]).to.be.horizontallyAligned;
                expect([label, button]).to.be.inHorizontalSequence();
            })
        });

        it('renders a checked button if the checked value is passed', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Chocobo" checked={true} automationId={radioButton + '_0'} name=""/>);

            return waitForDom(() => {
                const button = select(radioButton + '_0', 'INPUT') as HTMLInputElement;

                expect(button.checked).to.be.true;
            });
        });

        it('set the radio buttons name to the given name', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Moogle" automationId={radioButton + '_0'} name="name"/>);

            return waitForDom(() => {
                const button = select(radioButton + '_0', 'INPUT') as HTMLInputElement;
                expect(button.name).to.equal('name');
            });
        });

        it('calls the onClick function when clicked', async function () {
            const onClick = sinon.spy();
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Tonberry" onClick={onClick} automationId={radioButton + '_0'} name=""/>);

            await waitForDom(() => { expect(select(radioButton + '_0')).to.be.present() });
            simulate.click(select(radioButton + '_0'));
            return waitFor(() => {
                expect(onClick).to.have.been.calledWithMatch('Tonberry');
            })
        });

        it('renders a disabled radio button', function () {
            const { select, waitForDom } = clientRenderer.render(<RadioButton value="Tonberry" disabled={true} automationId={radioButton + '_0'} name=""/>);

            return waitForDom(() => {
                const button = select(radioButton + '_0', 'INPUT');
                expect(button).to.have.attr('disabled');
            });
        })
    });


});

