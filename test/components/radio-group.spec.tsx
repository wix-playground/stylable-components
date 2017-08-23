import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {RadioGroupDemo} from '../../demo/components/radio-group-demo';
import {RadioButton, RadioGroup} from '../../src';

const radioGroup = 'RADIO_GROUP';
const radioButton = 'RADIO_BUTTON';

describe('<RadioGroup />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('The radio group user', () => {
        it('clicks on a button and it is selected', async () => {
            const {select, waitForDom} = clientRenderer.render(<RadioGroupDemo/>);

            await waitForDom(() => {
                expect(
                    select('RADIO_GROUP_DEMO', 'GROUP_1', radioGroup, radioButton + '_0')
                ).to.be.present();
            });

            const button0 = select('GROUP_1', radioGroup, radioButton + '_0') as HTMLInputElement;

            button0.click();

            await waitForDom(() => {
                expect(select('GROUP_1', 'RADIO_GROUP_DEMO_VALUE')).to.have.text('Value: This way!');
            });
        });
    });

    it('renders to the screen with unselected radio buttons as children', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Ifrit"/>
                <RadioButton value="Titan"/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.be.present();
            expect(button0).to.have.property('checked', false);
            expect(button0).to.have.value('Ifrit');
            expect(button0).to.have.attribute('name', button1.name);
            expect(button1).to.be.present();
            expect(button1).to.have.property('checked', false);
            expect(button1).to.have.value('Titan');

        });
    });

    it('renders non RadioButton components as children', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="1"/>
                <span>Surprise!</span>
                <RadioButton value="2"/>
            </RadioGroup>
        );

        const container = select(radioGroup) as HTMLDivElement;

        await waitForDom(() => {
            expect(container.children.length, 'expected RadioGroup to have 3 children').to.equal(3);
            expect(container.children[1]).to.be.instanceOf(HTMLSpanElement);
        });

    });

    it('renders the children with the given name value', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup name="kupo">
                <RadioButton value="Ultima"/>
                <RadioButton value="Hades"/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.attribute('name', 'kupo');
            expect(button1).to.have.attribute('name', 'kupo');
        });
    });

    it('renders a checked radio button if the checked prop is true', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup name="kupo">
                <RadioButton  value="Minerva"/>
                <RadioButton checked value="Kitsune"/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.property('checked', false);
            expect(button1).to.have.property('checked', true);
        });
    });

    it('renders calls the given onChange function on change', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={onChange}>
                <RadioButton value="Leviathan"/>
                <RadioButton value="Quetzalcoatl"/>
            </RadioGroup>
        );

        const button1 = select(radioGroup, radioButton + '_1');

        await waitForDom(() => {
            expect(button1).to.be.present();
        });

        simulate.click(button1);

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'Quetzalcoatl'});
        });
    });

    it('sets the clicked radio button to be active on click', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Garuda"/>
                <RadioButton value="Ramuh"/>
            </RadioGroup>
        );

        await waitForDom(() => {
            expect(select(radioGroup, radioButton + '_0')).to.be.present();
        });

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        button0.click();

        await waitForDom(() => {
            expect(button0).to.have.property('checked', true);
            expect(button1).to.have.property('checked', false);
        });
    });

    it('changes the selected button when clicking on a different one', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Diabolos"/>
                <RadioButton value="Bahamut"/>
            </RadioGroup>
        );

        await waitForDom(() => { expect(select(radioGroup, radioButton + '_0', 'INPUT')).to.be.present(); });

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        button0.click();

        await waitForDom(() => {
            expect(button0).to.have.property('checked', true);
        });

        button1.click();

        await waitForDom(() => {
            expect(button0).to.have.property('checked', false);
            expect(button1).to.have.property('checked', true);
        });
    });

    it('does not affect buttons in a different radio group', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <RadioGroup data-automation-id="GROUP_0">
                    <RadioButton value="Siren"/>
                    <RadioButton value="Cerberus"/>
                </RadioGroup>
                <RadioGroup data-automation-id="GROUP_1">
                    <RadioButton value="Alexander"/>
                    <RadioButton value="Odin"/>
                </RadioGroup>
            </div>
        );

        const button0InGroup0 = select('GROUP_0', radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1InGroup1 = select('GROUP_1', radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0InGroup0).to.be.present();
        });

        button0InGroup0.click();

        await waitForDom(() => {
            expect(button0InGroup0).to.have.property('checked', true);
        });

        button1InGroup1.click();

        await waitForDom(() => {
            expect(button0InGroup0).to.have.property('checked', true);
            expect(button1InGroup1).to.have.property('checked', true);
        });
    });

    it('disabled all radio button children if the disabled prop is true', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup disabled>
                <RadioButton value="Fafnir"/>
                <RadioButton value="Sleipnir"/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.attribute('disabled');
            expect(button1).to.have.attribute('disabled');
        });
    });

    it('renders children from the data source prop if given', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup
                dataSource={[{value: 'Child0'}, {value: 'Child1'}]}
            />
        );

        const button1 = select(radioGroup, radioButton + '_1', 'INPUT') as HTMLInputElement;
        const button0 = select(radioGroup, radioButton + '_0', 'INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.be.present();
            expect(button0).to.have.value('Child0');
            expect(button1).to.be.present();
            expect(button1).to.have.value('Child1');
        });
    });

    describe('<RadioButton />', () => {
        it('renders a radio button to the screen', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Shiva" data-automation-id={radioButton + '_0'} name=""/>
            );

            await waitForDom(() => {
                expect(select(radioButton + '_0', 'INPUT')).to.be.present().and.to.have.attribute('type', 'radio');
                expect(select(radioButton + '_0', 'INPUT')).to.have.value('Shiva');

            });
        });

        it('renders the label next to the radio button (right by default)', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Omega" data-automation-id={radioButton + '_0'} name=""/>
            );

            const label = select(radioButton + '_0', 'LABEL');
            const button = select(radioButton + '_0', 'INPUT_CONTAINER');

            await waitForDom(() => {
                expect(label).to.have.text('Omega');
                expect([button, label]).to.be.horizontallyAligned;
                expect([button, label]).to.be.inHorizontalSequence({distance: 10});
            });
        });

        it('renders the label on the left side', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tiamat" location="left" data-automation-id={radioButton + '_0'} name=""/>
            );

            const label = select(radioButton + '_0', 'LABEL');
            const button = select(radioButton + '_0', 'INPUT_CONTAINER');

            await waitForDom(() => {
                expect([label, button]).to.be.horizontallyAligned;
                expect([label, button]).to.be.inHorizontalSequence({distance: 10});
            });
        });

        it('renders a checked button if the checked value is passed', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Chocobo" checked={true} data-automation-id={radioButton + '_0'} name=""/>
            );

            const button = select(radioButton + '_0', 'INPUT') as HTMLInputElement;

            await waitForDom(() => {
                expect(button).to.have.property('checked', true);
            });
        });

        it('set the radio buttons name to the given name', () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Moogle" data-automation-id={radioButton + '_0'} name="name"/>
            );

            const button = select(radioButton + '_0', 'INPUT') as HTMLInputElement;

            return waitForDom(() => {
                expect(button).to.have.attribute('name', 'name');
            });
        });

        it('calls the onClick function when clicked', async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" onChange={onChange} data-automation-id={radioButton + '_0'}/>
            );

            const button = select(radioButton + '_0');

            await waitForDom(() => { expect(button).to.be.present(); });

            simulate.click(button);

            return waitFor(() => {
                expect(onChange).to.have.been.calledWithMatch({value: 'Tonberry'});
            });
        });

        it('renders a disabled radio button', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled data-automation-id={radioButton + '_0'}/>
            );

            const button = select(radioButton + '_0', 'INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('disabled');
            });
        });

        it('renders any children given to the component', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="" data-automation-id={radioButton + '_0'}>
                    <span data-automation-id="CHILD">Offspring</span>
                </RadioButton>
            );

            const child = select(radioButton + '_0', 'CHILD') as HTMLElement;

            await waitForDom(() => {
                expect(child).to.be.present();
                expect(child).to.be.instanceOf(HTMLSpanElement);
            });

        });
    });

});
