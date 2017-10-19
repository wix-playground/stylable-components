import keycode = require('keycode');
import * as React from 'react';
import {expect, simulate, sinon} from 'test-drive-react';
import {AutoComplete, DropDown, RadioButton, RadioGroup, SelectionList, SelectionListDividerSymbol} from '../../src';
import {DropDownDriver, RadioButtonDriver, RadioGroupDriver, SelectionListTestDriver} from '../../test-kit';
import {ClientRendererWithTheme} from '../utils';

import dividerStyle from '../../src/components/selection-list/divider.st.css';
import optionStyle from '../../src/components/selection-list/option.st.css';

import defaultTheme from '../../src/themes/default/theme.st.css';

const themes: any = {default: defaultTheme};

describe('themes', () => {

    Object.keys(themes).forEach(key => {
        describe(key, () => {
            const clientRenderer = new ClientRendererWithTheme(themes[key]);
            afterEach(() => clientRenderer.cleanup());

            describe('<AutoComplete />', () => {

                const autoComp = 'AUTO_COMPLETE';
                const autoCompInput = autoComp + '_INPUT';

                it('places the caret inside the input and centers it', () => {
                    const {select} = clientRenderer.render(<AutoComplete/>);

                    const autocomplete = select(autoComp)!;
                    const input = select(autoComp, autoCompInput)!;
                    const caret = select(autoComp, autoComp + '_CARET')!;

                    expect(caret).to.be.insideOf(autocomplete);
                    expect([input, caret]).to.be.verticallyAligned('center');
                });

                it('calls the onOpenStateChange event when clicking on the caret', () => {
                    const onOpenStateChange = sinon.spy();
                    const {select} = clientRenderer.render(<AutoComplete onOpenStateChange={onOpenStateChange} />);
                    const caret = select(autoComp, autoComp + '_CARET');

                    expect(caret).to.be.present();
                    simulate.click(caret);
                    expect(onOpenStateChange).to.have.been.calledOnce;
                    expect(onOpenStateChange).to.have.been.calledWithMatch({value: true});
                });

            });

            describe('<DropDown />', () => {
                it('renders to the screen', () => {
                    const {driver} = clientRenderer.render(<DropDown/>).withDriver(DropDownDriver);

                    expect(driver.root).to.be.present();
                    expect(driver.selection).to.equal('');
                });

            });

            describe('<RadioGroup />', () => {

                it('renders to the screen with unselected radio buttons as children', () => {
                    const {driver} = clientRenderer.render(
                        <RadioGroup>
                            <RadioButton value="Ifrit"/>
                            <RadioButton value="Titan"/>
                        </RadioGroup>
                    ).withDriver(RadioGroupDriver);

                    const button0 = driver.getRadioButton(0);
                    const button1 = driver.getRadioButton(1);

                    expect(button0.root).to.be.present();
                    expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
                    expect(button0.value).to.equal('Ifrit');
                    expect(button0.nativeElement).to.have.attribute('name', button1.nativeElement.name);
                    expect(button1.root).to.be.present();
                    expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
                    expect(button1.value).to.equal('Titan');
                });

                it('uses "value" prop to determine checked child', () => {
                    const {driver} = clientRenderer.render(
                        <RadioGroup value="Sleipnir">
                            <RadioButton value="Fafnir"/>
                            <RadioButton value="Sleipnir"/>
                            <RadioButton value="Snepnir"/>
                        </RadioGroup>
                    ).withDriver(RadioGroupDriver);

                    expect(driver.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
                });

                it('renders calls the given onChange function on change', () => {
                    const onChange = sinon.spy();
                    const {driver} = clientRenderer.render(
                        <RadioGroup onChange={onChange}>
                            <RadioButton value="Leviathan"/>
                            <RadioButton value="Quetzalcoatl"/>
                        </RadioGroup>
                    ).withDriver(RadioGroupDriver);

                    const button1 = driver.getRadioButton(1);
                    expect(button1.root).to.be.present();
                    button1.click();

                    expect(onChange).to.have.been.calledOnce;
                    expect(onChange).to.have.been.calledWithMatch({value: 'Quetzalcoatl'});
                });

                it('sets the clicked radio button to be active on click', () => {
                    const {driver} = clientRenderer.render(
                        <RadioGroup>
                            <RadioButton value="Garuda"/>
                            <RadioButton value="Ramuh"/>
                        </RadioGroup>
                    ).withDriver(RadioGroupDriver);

                    const button0 = driver.getRadioButton(0);
                    const button1 = driver.getRadioButton(1);
                    expect(button0.root).to.be.present();
                    button0.click();

                    expect(button0.isChecked(), 'expected radio to be checked').to.equal(true);
                    expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
                });

                it('changes the selected button when clicking on a different one', () => {
                    const {driver} = clientRenderer.render(
                        <RadioGroup>
                            <RadioButton value="Diabolos"/>
                            <RadioButton value="Bahamut"/>
                        </RadioGroup>
                    ).withDriver(RadioGroupDriver);

                    const button0 = driver.getRadioButton(0);
                    const button1 = driver.getRadioButton(1);

                    expect(button0.root).to.be.present();
                    button0.click();

                    expect(button0.isChecked(), 'expected radio to be checked').to.equal(true);
                    button1.click();

                    expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
                    expect(button1.isChecked(), 'expected radio to be checked').to.equal(true);
                });

                it('does not affect buttons in a different radio group', () => {
                    const {select} = clientRenderer.render(
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

                    expect(button0InGroup0.root).to.be.present();
                    expect(button1InGroup1.root).to.be.present();
                    button0InGroup0.click();
                    expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true);
                    button1InGroup1.click();

                    expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true);
                    expect(button1InGroup1.isChecked(), 'expected radio to be checked').to.equal(true);
                });

                it('renders children from the data source prop if given', () => {
                    const {driver} = clientRenderer.render(
                        <RadioGroup
                            value="Child1"
                            dataSource={[{value: 'Child0'}, {value: 'Child1'}, {value: 'Child2'}]}
                        />
                    ).withDriver(RadioGroupDriver);

                    const button0 = driver.getRadioButton(0);
                    const button1 = driver.getRadioButton(1);
                    const button2 = driver.getRadioButton(2);

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

                describe('<RadioButton/>', () => {

                    it('renders a radio button to the screen', () => {
                        const {driver} = clientRenderer.render(
                            <RadioButton value="Shiva" />
                        ).withDriver(RadioButtonDriver);

                        expect(driver.root).to.be.present();
                        expect(driver.nativeElement).to.have.attribute('type', 'radio');
                        expect(driver.value).to.equal('Shiva');
                        expect(driver.isChecked(), 'expected radio to be unchecked').to.equal(false);
                    });

                    it('renders the label next to the radio button (right by default)', () => {
                        const distance = 7;
                        const {driver} = clientRenderer.render(
                            <RadioButton>
                                <span style={{marginLeft: distance + 'px'}}>Omega</span>
                            </RadioButton>
                        ).withDriver(RadioButtonDriver);
                        const child = driver.children[0];
                        expect(child).to.to.be.instanceOf(HTMLSpanElement);
                        expect(child).to.have.text('Omega');
                        expect([driver.icon, child]).to.be.horizontallyAligned;
                        expect([driver.icon, child]).to.be.inHorizontalSequence({distance});
                    });

                    it('calls the onClick function when clicked', () => {
                        const onChange = sinon.spy();
                        const {driver} = clientRenderer.render(
                            <RadioButton value="Tonberry" onChange={onChange}/>
                        ).withDriver(RadioButtonDriver);

                        expect(driver.root).to.be.present();
                        driver.click();
                        expect(onChange).to.have.been.calledWithMatch({value: 'Tonberry'});
                    });

                });
            });

            describe('<SelectionList />', () => {

                it('Renders a divider', () => {
                    const {driver} = clientRenderer.render(
                        <SelectionList dataSource={[SelectionListDividerSymbol]} />
                    ).withDriver(SelectionListTestDriver);
                    expect(driver.root).to.be.present();
                    expect(
                        driver.elementHasStylableClassName(
                            driver.items[0],
                            'root',
                            dividerStyle
                        )
                    ).to.equal(true);
                });

                describe('Styling', () => {
                    it(`Puts "focused" state on the container when it's focused`, () => {
                        const {driver} = clientRenderer.render(
                            <SelectionList />
                        ).withDriver(SelectionListTestDriver);

                        expect(driver.root).to.be.present();
                        expect(driver.elementHasStylableState(driver.root, 'focused')).to.equal(false);
                        driver.focus();
                        expect(driver.elementHasStylableState(driver.root, 'focused')).to.equal(true);
                    });

                    it(`Puts "selected" state on the selected item`, () => {
                        const {driver} = clientRenderer.render(
                            <SelectionList dataSource={['0', '1']} value={'0'} />
                        ).withDriver(SelectionListTestDriver);

                        expect(driver.root).to.be.present();
                        expect(driver.elementHasStylableState(driver.items[0], 'selected', optionStyle)).to.equal(true);
                        expect(driver.elementHasStylableState(driver.items[1], 'selected', optionStyle))
                            .to.equal(false);
                    });

                    it(`Puts "focused" state on the item focused via keyboard and removes it on blur`, () => {
                        const {driver} = clientRenderer.render(
                            <SelectionList dataSource={['0', '1']} value={'0'} />
                        ).withDriver(SelectionListTestDriver);

                        expect(driver.root).to.be.present();
                        driver.focus();
                        expect(driver.elementHasStylableState(driver.items[0], 'focused', optionStyle)).to.equal(true);
                        expect(driver.elementHasStylableState(driver.items[1], 'focused', optionStyle)).to.equal(false);

                        driver.keyDown(keycode('down'));
                        expect(driver.elementHasStylableState(driver.items[0], 'focused', optionStyle)).to.equal(false);
                        expect(driver.elementHasStylableState(driver.items[1], 'focused', optionStyle)).to.equal(true);

                        driver.blur();
                        expect(driver.elementHasStylableState(driver.items[0], 'focused', optionStyle)).to.equal(false);
                        expect(driver.elementHasStylableState(driver.items[1], 'focused', optionStyle)).to.equal(false);
                    });
                });

            });
        });
    });
});
