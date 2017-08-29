import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {RadioGroupDemo} from '../../demo/components/radio-group-demo';
import {RadioButton, RadioGroup} from '../../src';
import {noop} from '../../src/utils';
import {sleep} from '../utils';

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
                <RadioButton value="Ifrit" onChange={noop}/>
                <RadioButton value="Titan" onChange={noop}/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

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
                <RadioButton value="1" onChange={noop}/>
                <span>Surprise!</span>
                <RadioButton value="2" onChange={noop}/>
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
                <RadioButton value="Ultima" onChange={noop}/>
                <RadioButton value="Hades" onChange={noop}/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.attribute('name', 'kupo');
            expect(button1).to.have.attribute('name', 'kupo');
        });
    });

    it('renders a checked radio button if the checked prop is true', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup name="kupo">
                <RadioButton  value="Minerva" onChange={noop}/>
                <RadioButton checked value="Kitsune" onChange={noop}/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.property('checked', false);
            expect(button1).to.have.property('checked', true);
        });
    });

    it('renders calls the given onChange function on change', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={onChange}>
                <RadioButton value="Leviathan" onChange={noop}/>
                <RadioButton value="Quetzalcoatl" onChange={noop}/>
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
                <RadioButton value="Garuda" onChange={noop}/>
                <RadioButton value="Ramuh" onChange={noop}/>
            </RadioGroup>
        );

        await waitForDom(() => {
            expect(select(radioGroup, radioButton + '_0')).to.be.present();
        });

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

        button0.click();

        await waitForDom(() => {
            expect(button0).to.have.property('checked', true);
            expect(button1).to.have.property('checked', false);
        });
    });

    it('changes the selected button when clicking on a different one', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Diabolos" onChange={noop}/>
                <RadioButton value="Bahamut" onChange={noop}/>
            </RadioGroup>
        );

        await waitForDom(() => { expect(select(radioGroup, radioButton + '_0', 'NATIVE_INPUT')).to.be.present(); });

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

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
                    <RadioButton value="Siren" onChange={noop}/>
                    <RadioButton value="Cerberus" onChange={noop}/>
                </RadioGroup>
                <RadioGroup data-automation-id="GROUP_1">
                    <RadioButton value="Alexander" onChange={noop}/>
                    <RadioButton value="Odin" onChange={noop}/>
                </RadioGroup>
            </div>
        );

        const button0InGroup0 = select('GROUP_0', radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1InGroup1 = select('GROUP_1', radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

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
                <RadioButton value="Fafnir" onChange={noop}/>
                <RadioButton value="Sleipnir" onChange={noop}/>
            </RadioGroup>
        );

        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.have.attribute('disabled');
            expect(button1).to.have.attribute('disabled');
        });
    });

    it('renders children from the data source prop if given', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <RadioGroup
                dataSource={[{value: 'Child0', onChange: noop}, {value: 'Child1', onChange: noop}]}
            />
        );

        const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;
        const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;

        await waitForDom(() => {
            expect(button0).to.be.present();
            expect(button0).to.have.value('Child0');
            expect(button1).to.be.present();
            expect(button1).to.have.value('Child1');
        });
    });

    describe('Accessibility', () => {
        it('if no child is checked - gives tabindex to the first one and the rest get -1', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioGroup tabIndex={8}>
                    <RadioButton value="male" onChange={noop}/>
                    <RadioButton value="female" onChange={noop}/>
                    <RadioButton value="other" onChange={noop}/>
                </RadioGroup>
            );

            const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
            const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;
            const button2 = select(radioGroup, radioButton + '_2', 'NATIVE_INPUT') as HTMLInputElement;

            await waitForDom(() => {
                expect(button0, 'first child should have tabindex 8').to.have.attribute('tabIndex', '8');
                expect(button1, 'second child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                expect(button2, 'third child should have tabindex -1').to.have.attribute('tabIndex', '-1');
            });
        });

        it('if a child is checked - gives that child tabIndex and the rest get -1', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioGroup>
                    <RadioButton value="male" onChange={noop}/>
                    <RadioButton value="female" checked onChange={noop}/>
                    <RadioButton value="other" onChange={noop}/>
                </RadioGroup>
            );

            const button0 = select(radioGroup, radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;
            const button1 = select(radioGroup, radioButton + '_1', 'NATIVE_INPUT') as HTMLInputElement;
            const button2 = select(radioGroup, radioButton + '_2', 'NATIVE_INPUT') as HTMLInputElement;

            await waitForDom(() => {
                expect(button0, 'first child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                expect(button1, 'second child should have tabindex 0').to.have.attribute('tabIndex', '0');
                expect(button2, 'third child should have tabindex -1').to.have.attribute('tabIndex', '-1');
            });

            simulate.click(button2);

            await waitFor(() => {
                expect(button0, 'first child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                expect(button1, 'second child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                expect(button2, 'third child should have tabindex 0').to.have.attribute('tabIndex', '0');
            });
        });

        it('if a child is checked - gives that child tabIndex and the rest get -1', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioGroup name="yaya">
                    <RadioButton value="male" onChange={noop}/>
                </RadioGroup>
            );

            await waitForDom(() => {
                expect(select(radioGroup)).to.have.attribute('role', 'radiogroup');
            });
        });
    });

    describe('<RadioButton />', () => {
        it('renders a radio button to the screen', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Shiva" data-automation-id={radioButton + '_0'} name="" onChange={noop}/>
            );

            await waitForDom(() => {
                expect(select(radioButton + '_0', 'NATIVE_INPUT')).to.be.present();
                expect(select(radioButton + '_0', 'NATIVE_INPUT')).to.have.attribute('type', 'radio');
                expect(select(radioButton + '_0', 'NATIVE_INPUT')).to.have.value('Shiva');
                expect(select(radioButton + '_0', 'UNCHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('renders the label next to the radio button (right by default)', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Omega" data-automation-id={radioButton + '_0'} onChange={noop}/>
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
                <RadioButton
                    value="Tiamat"
                    labelLocation="left"
                    data-automation-id={radioButton + '_0'}
                    name=""
                    onChange={noop}
                />
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
                <RadioButton
                    value="Chocobo"
                    checked={true}
                    data-automation-id={radioButton + '_0'}
                    name=""
                    onChange={noop}
                />
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;

            await waitForDom(() => {
                expect(button).to.have.property('checked', true);
                expect(select(radioButton + '_0', 'CHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('set the radio buttons name to the given name', () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Moogle" data-automation-id={radioButton + '_0'} name="name" onChange={noop}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT') as HTMLInputElement;

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
                <RadioButton value="Tonberry" disabled data-automation-id={radioButton + '_0'} onChange={noop}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('disabled');
                expect(select(radioButton + '_0', 'UNCHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('does not call onChange when clicking disabled radio', async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled data-automation-id={radioButton + '_0'} onChange={onChange}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('disabled');
                expect(select(radioButton + '_0', 'UNCHECKED_RADIO_ICON')).to.be.present();
            });

            simulate.click(select(radioButton + '_0'));

            await sleep(500);
            expect(onChange).to.have.not.been.called;
        });

        it('renders a checked disabled radio button', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled checked data-automation-id={radioButton + '_0'} onChange={noop}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('disabled');
                expect(button).to.have.property('checked', true);
                expect(select(radioButton + '_0', 'CHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('renders a readOnly radio button', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly data-automation-id={radioButton + '_0'} onChange={noop}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('readOnly');
                expect(select(radioButton + '_0', 'UNCHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('does not call onChange when clicking readOnly radio', async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly data-automation-id={radioButton + '_0'} onChange={onChange}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('readOnly');
                expect(select(radioButton + '_0', 'UNCHECKED_RADIO_ICON')).to.be.present();
            });

            simulate.click(select(radioButton + '_0'));

            await sleep(500);
            expect(onChange).to.have.not.been.called;
        });

        it('renders a checked readOnly radio button', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly checked data-automation-id={radioButton + '_0'} onChange={noop}/>
            );

            const button = select(radioButton + '_0', 'NATIVE_INPUT');

            await waitForDom(() => {
                expect(button).to.have.attribute('readOnly');
                expect(button).to.have.property('checked', true);
                expect(select(radioButton + '_0', 'CHECKED_RADIO_ICON')).to.be.present();
            });
        });

        it('renders any children given to the component', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="" data-automation-id={radioButton + '_0'} onChange={noop}>
                    <span data-automation-id="CHILD">Offspring</span>
                </RadioButton>
            );

            const child = select(radioButton + '_0', 'CHILD') as HTMLElement;

            await waitForDom(() => {
                expect(child).to.be.present();
                expect(child).to.be.instanceOf(HTMLSpanElement);
            });

        });

        describe('Accessibility', () => {
            it('has tabIndex 0 by default', async () => {
                const {select, waitForDom} = clientRenderer.render(<RadioButton value="yaya" onChange={noop}/>);

                await waitForDom(() => {
                    expect(select('NATIVE_INPUT')).to.have.attribute('tabIndex', '0');
                });
            });

            it('gets tabIndex from the user', async () => {
                const {select, waitForDom} = clientRenderer.render(
                    <RadioButton value="yaya" tabIndex={666} onChange={noop}/>
                );

                await waitForDom(() => {
                    expect(select('NATIVE_INPUT')).to.have.attribute('tabIndex', '666');
                });
            });

            it('has aria-checked property when checked', async () => {
                const {select, waitForDom} = clientRenderer.render(<RadioButton value="yaya" checked onChange={noop}/>);

                await waitForDom(() => {
                    expect(select('RADIO_BUTTON_ROOT')).to.have.attribute('aria-checked', 'true');
                });
            });

            it('root has role - radio', async () => {
                const {select, waitForDom} = clientRenderer.render(<RadioButton value="yaya" checked onChange={noop}/>);

                await waitForDom(() => {
                    expect(select('RADIO_BUTTON_ROOT')).to.have.attribute('role', 'radio');
                });
            });
        });
    });

});
