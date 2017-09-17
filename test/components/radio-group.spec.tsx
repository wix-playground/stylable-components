import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {RadioGroupDemo} from '../../demo/components/radio-group-demo';
import {RadioButton, RadioGroup} from '../../src';
import {RadioButtonDriver, RadioGroupDriver} from '../../test-kit/components/radio-group-driver';
import {sleep} from '../utils';

class RadioGroupDemoTestDriver extends DriverBase {
    public static ComponentClass = RadioGroupDemo;

    public group: RadioGroupDriver = new RadioGroupDriver(() => this.select('GROUP_1_GROUP'));

    public get result(): string | null {
        return this.select('GROUP_1_RESULT').textContent;
    }
}

describe('<RadioGroup />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('The radio group user', () => {
        it('clicks on a button and it is selected', async () => {
            const {driver: demo, waitForDom} = clientRenderer.render(
                <RadioGroupDemo/>
            ).withDriver(RadioGroupDemoTestDriver);

            const button0 = demo.group.getRadioButton(0);

            await waitForDom(() => { expect(button0.root).to.be.present(); });

            button0.click();

            await waitForDom(() => {
                expect(demo.result).to.equal('Value: This way!');
            });
        });
    });

    it('renders to the screen with unselected radio buttons as children', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Ifrit"/>
                <RadioButton value="Titan"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        const button0 = group.getRadioButton(0);
        const button1 = group.getRadioButton(1);

        await waitForDom(() => {
            expect(button0.root).to.be.present();
            expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
            expect(button0.value).to.equal('Ifrit');
            expect(button0.nativeElement).to.have.attribute('name', button1.nativeElement.name);
            expect(button1.root).to.be.present();
            expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
            expect(button1.value).to.equal('Titan');

        });
    });

    it('renders non RadioButton components as children', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="1"/>
                <span>Surprise!</span>
                <RadioButton value="2"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.items, 'expected RadioGroup to have 3 children').to.have.length(3);
            expect(group.items[1]).to.be.instanceOf(HTMLSpanElement);
        });

    });

    it('renders the children with the given name value', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup name="kupo">
                <RadioButton value="Ultima"/>
                <RadioButton value="Hades"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.getRadioButton(0).name).to.equal('kupo');
            expect(group.getRadioButton(1).name).to.equal('kupo');
        });
    });

    it('uses "value" prop to determine checked child', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup value="Sleipnir">
                <RadioButton value="Fafnir"/>
                <RadioButton value="Sleipnir"/>
                <RadioButton value="Snepnir"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
        });
    });

    it('"value" prop on the group overrides "checked"  on child', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup value="Sleipnir">
                <RadioButton value="Fafnir" checked/>
                <RadioButton value="Sleipnir"/>
                <RadioButton value="Snepnir"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.getRadioButton(0).isChecked(), 'expected radio to be unchecked').to.equal(false);
            expect(group.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
        });
    });

    it('renders calls the given onChange function on change', async () => {
        const onChange = sinon.spy();
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup onChange={onChange}>
                <RadioButton value="Leviathan"/>
                <RadioButton value="Quetzalcoatl"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        const button1 = group.getRadioButton(1);

        await waitForDom(() => {
            expect(button1.root).to.be.present();
        });

        button1.click();

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'Quetzalcoatl'});
        });
    });

    it('sets the clicked radio button to be active on click', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Garuda"/>
                <RadioButton value="Ramuh"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        const button0 = group.getRadioButton(0);
        const button1 = group.getRadioButton(1);

        await waitForDom(() => {
            expect(button0.root).to.be.present();
        });

        button0.click();

        await waitForDom(() => {
            expect(button0.isChecked(), 'expected radio to be checked').to.equal(true);
            expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
        });
    });

    it('changes the selected button when clicking on a different one', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Diabolos"/>
                <RadioButton value="Bahamut"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        const button0 = group.getRadioButton(0);
        const button1 = group.getRadioButton(1);

        await waitForDom(() => { expect(button0.root).to.be.present(); });

        button0.click();

        await waitForDom(() => { expect(button0.isChecked(), 'expected radio to be checked').to.equal(true); });

        button1.click();

        await waitForDom(() => {
            expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
            expect(button1.isChecked(), 'expected radio to be checked').to.equal(true);
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

        const group0 = new RadioGroupDriver(() => select('GROUP_0')!);
        const group1 = new RadioGroupDriver(() => select('GROUP_1')!);

        const button0InGroup0 = group0.getRadioButton(0);
        const button1InGroup1 = group1.getRadioButton(1);

        await waitForDom(() => {
            expect(button0InGroup0.root).to.be.present();
            expect(button1InGroup1.root).to.be.present();
        });

        button0InGroup0.click();

        await waitForDom(() => { expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true); });

        button1InGroup1.click();

        await waitForDom(() => {
            expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true);
            expect(button1InGroup1.isChecked(), 'expected radio to be checked').to.equal(true);
        });
    });

    it('disabled all radio button children if the disabled prop is true', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup disabled>
                <RadioButton value="Fafnir"/>
                <RadioButton value="Sleipnir"/>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.getRadioButton(0).isDisabled(), 'expected radio to be disabled').to.equal(true);
            expect(group.getRadioButton(1).isDisabled(), 'expected radio to be disabled').to.equal(true);
        });
    });

    it('Displays radio button children', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup>
                <RadioButton value="Fafnir">
                    YO
                    <span>IMA SPAN</span>
                </RadioButton>
                <RadioButton value="Sleipnir">MO</RadioButton>
            </RadioGroup>
        ).withDriver(RadioGroupDriver);

        const button0 = group.getRadioButton(0);
        const button1 = group.getRadioButton(1);

        await waitForDom(() => {
            expect(button0.children[0]!.textContent).to.equal('YO');
            expect(button0.children[1]!.textContent).to.equal('IMA SPAN');
            expect(button0.children[1]!).to.be.instanceOf(HTMLSpanElement);
            expect(button1.children[0]!.textContent).to.equal('MO');
        });
    });

    it('renders children from the data source prop if given', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup
                value="Child1"
                dataSource={[{value: 'Child0'}, {value: 'Child1'}, {value: 'Child2'}]}
            />
        ).withDriver(RadioGroupDriver);

        const button0 = group.getRadioButton(0);
        const button1 = group.getRadioButton(1);
        const button2 = group.getRadioButton(2);

        await waitForDom(() => {
            expect(button0.root).to.be.present();
            expect(button0.value).to.equal('Child0');
            expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
            expect(button1.root).to.be.present();
            expect(button1.value).to.equal('Child1');
            expect(button1.isChecked(), 'expected radio to be checked').to.equal(true);
            expect(button2.root).to.be.present();
            expect(button2.value).to.equal('Child2');
            expect(button2.isChecked(), 'expected radio to be unchecked').to.equal(false);
        });
    });

    it('renders data source item children (supplied in prop)', async () => {
        const {driver: group, waitForDom} = clientRenderer.render(
            <RadioGroup
                value="Child1"
                dataSource={[{value: 'BTN0'}, {value: 'BTN1', children: <span>IMA SPAN</span>}]}
            />
        ).withDriver(RadioGroupDriver);

        await waitForDom(() => {
            expect(group.getRadioButton(1).children[0]!.textContent).to.equal('IMA SPAN');
        });
    })

    describe('Accessibility', () => {
        it('if no child is checked - gives tabindex to the first one and the rest get -1', async () => {
            const {driver: group, waitForDom} = clientRenderer.render(
                <RadioGroup tabIndex={8}>
                    <RadioButton value="male"/>
                    <RadioButton value="female"/>
                    <RadioButton value="other"/>
                </RadioGroup>
            ).withDriver(RadioGroupDriver);

            const button0 = group.getRadioButton(0);
            const button1 = group.getRadioButton(1);
            const button2 = group.getRadioButton(2);

            await waitForDom(() => {
                expect(button0.nativeElement, 'first child should have tabindex 8').to.have.attribute('tabIndex', '8');
                expect(
                    button1.nativeElement, 'second child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
                expect(
                    button2.nativeElement, 'third child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
            });
        });

        it('if a child is checked - gives that child tabIndex and the rest get -1', async () => {
            const {driver: group, waitForDom} = clientRenderer.render(
                <RadioGroup value="female">
                    <RadioButton value="male"/>
                    <RadioButton value="female"/>
                    <RadioButton value="other"/>
                </RadioGroup>
            ).withDriver(RadioGroupDriver);

            const button0 = group.getRadioButton(0);
            const button1 = group.getRadioButton(1);
            const button2 = group.getRadioButton(2);

            await waitForDom(() => {
                expect(
                    button0.nativeElement, 'first child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
                expect(
                    button1.nativeElement, 'second child should have tabindex 0').to.have.attribute('tabIndex', '0');
                expect(
                    button2.nativeElement, 'third child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
            });

            button2.click();

            await waitFor(() => {
                expect(
                    button0.nativeElement, 'first child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
                expect(
                    button1.nativeElement, 'second child should have tabindex -1'
                ).to.have.attribute('tabIndex', '-1');
                expect(
                    button2.nativeElement, 'third child should have tabindex 0'
                ).to.have.attribute('tabIndex', '0');
            });
        });

        it('Group has attribute role = radiogroup', async () => {
            const {driver: group, waitForDom} = clientRenderer.render(
                <RadioGroup name="yaya">
                    <RadioButton value="male"/>
                </RadioGroup>
            ).withDriver(RadioGroupDriver);

            await waitForDom(() => {
                expect(group.root).to.have.attribute('role', 'radiogroup');
            });
        });
    });

    describe('<RadioButton />', () => {
        it('renders a radio button to the screen', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Shiva" />
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.root).to.be.present();
                expect(radio.nativeElement).to.have.attribute('type', 'radio');
                expect(radio.value).to.equal('Shiva');
                expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            });
        });

        it('renders the label next to the radio button (right by default)', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton><span>Omega</span></RadioButton>
            ).withDriver(RadioButtonDriver);

            const child = radio.children[0];

            await waitForDom(() => {
                expect(child).to.to.be.instanceOf(HTMLSpanElement);
                expect(child).to.have.text('Omega');
                expect([radio.icon, child]).to.be.horizontallyAligned;
                expect([radio.icon, child]).to.be.inHorizontalSequence({distance: 5});
            });
        });

        it('renders a checked button if the checked value is passed', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton
                    value="Chocobo"
                    checked
                />
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.nativeElement).to.have.property('checked', true);
                expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
            });
        });

        it('set the radio buttons name to the given name', () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Moogle" name="mog"/>
            ).withDriver(RadioButtonDriver);

            return waitForDom(() => {
                expect(radio.name).to.equal('mog');
            });
        });

        it('calls the onClick function when clicked', async () => {
            const onChange = sinon.spy();
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" onChange={onChange}/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.root).to.be.present();
            });

            radio.click();

            return waitFor(() => {
                expect(onChange).to.have.been.calledWithMatch({value: 'Tonberry'});
            });
        });

        it('renders a disabled radio button', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled />
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            });
        });

        it('does not call onChange when clicking disabled radio', async () => {
            const onChange = sinon.spy();
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled onChange={onChange}/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            });

            radio.click();

            await sleep(10);

            expect(onChange).to.have.not.been.called;
            expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
        });

        it('renders a checked disabled radio button', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" disabled checked/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
            });
        });

        it('renders a readOnly radio button', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            });
        });

        it('does not call onChange when clicking readOnly radio', async () => {
            const onChange = sinon.spy();
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly onChange={onChange}/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            });

            radio.click();

            await sleep(10);

            expect(onChange).to.have.not.been.called;
            expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
        });

        it('renders a checked readOnly radio button', async () => {
            const {driver: radio, waitForDom} = clientRenderer.render(
                <RadioButton value="Tonberry" readOnly checked/>
            ).withDriver(RadioButtonDriver);

            await waitForDom(() => {
                expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
            });
        });

        it('renders any children given to the component', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <RadioButton value="">
                    <span data-automation-id="CHILD">Offspring</span>
                </RadioButton>
            );

            const child = select('CHILD') as HTMLSpanElement;

            await waitForDom(() => {
                expect(child).to.be.present();
                expect(child).to.be.instanceOf(HTMLSpanElement);
            });

        });

        describe('Accessibility', () => {
            it('has tabIndex 0 by default', async () => {
                const {driver: radio, waitForDom} = clientRenderer.render(
                    <RadioButton value="yaya"/>
                ).withDriver(RadioButtonDriver);

                await waitForDom(() => {
                    expect(radio.nativeElement).to.have.attribute('tabIndex', '0');
                });
            });

            it('gets tabIndex from the user', async () => {
                const {driver: radio, waitForDom} = clientRenderer.render(
                    <RadioButton value="yaya" tabIndex={666}/>
                ).withDriver(RadioButtonDriver);

                await waitForDom(() => {
                    expect(radio.nativeElement).to.have.attribute('tabIndex', '666');
                });
            });

            it('has aria-checked property when checked', async () => {
                const {driver: radio, waitForDom} = clientRenderer.render(
                    <RadioButton value="yaya" checked/>
                ).withDriver(RadioButtonDriver);

                await waitForDom(() => {
                    expect(radio.root).to.have.attribute('aria-checked', 'true');
                });
            });

            it('root has role - radio', async () => {
                const {driver: radio, waitForDom} = clientRenderer.render(
                    <RadioButton value="yaya" checked/>
                ).withDriver(RadioButtonDriver);

                await waitForDom(() => {
                    expect(radio.root).to.have.attribute('role', 'radio');
                });
            });
        });
    });

});
