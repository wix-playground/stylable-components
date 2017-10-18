import * as React from 'react';
import {WithTheme, WithThemeDAID} from '../utils';
import {AutoComplete, DropDown, RadioGroup, RadioButton} from '../../src';
import {DropDownDriver, RadioGroupDriver, RadioButtonDriver} from '../../test-kit';
import {ClientRenderer, expect, selectDom, simulate, sinon, trigger, waitFor, waitForDom} from 'test-drive-react';

describe.only('default theme', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

	describe('<AutoComplete />', () => {

		const autoComp = 'AUTO_COMPLETE';
		const autoCompInput = autoComp + '_INPUT';
		const bodyWaitForDom = waitForDom.bind(null, document.body);

    	it('places the caret inside the input and centers it', async () => {
        	const ThemedAutoComplete = WithTheme(<AutoComplete />);
        	const {select, waitForDom} = clientRenderer.render(<ThemedAutoComplete/>);

        	await waitForDom(() => {
            	const autocomplete = select(autoComp)!;
            	const input = select(autoComp, autoCompInput)!;
            	const caret = select(autoComp, autoComp + '_CARET')!;

            	expect(caret).to.be.insideOf(autocomplete);
            	expect([input, caret]).to.be.verticallyAligned('center');
        	});
    	});

    	it('calls the onOpenStateChange event when clicking on the caret', async () => {
        	const onOpenStateChange = sinon.spy();
        	const ThemedAutoComplete = WithTheme(<AutoComplete onOpenStateChange={onOpenStateChange} />);
        	const {select, waitForDom} = clientRenderer.render(<ThemedAutoComplete />);

        	await waitForDom(() => expect(select(autoComp, autoComp + '_CARET')).to.be.present());
        	simulate.click(select(autoComp, autoComp + '_CARET'));
        	await bodyWaitForDom(() => {
            	expect(onOpenStateChange).to.have.been.calledOnce;
            	expect(onOpenStateChange).to.have.been.calledWithMatch({value: true});
        	});
    	});

	})

	describe('<DropDown />', () => {
    	it('renders to the screen', async () => {
        	const ThemedContainer = WithTheme();
        	const {select} = clientRenderer.render(<ThemedContainer />);
        	const container = select(WithThemeDAID) as HTMLDivElement;
        	const {driver: dropdown, waitForDom} = clientRenderer.render(
            	<DropDown />,
            	container
        	).withDriver(DropDownDriver);

        	await waitForDom(() => {
            	expect(dropdown.root).to.be.present();
            	expect(dropdown.selection).to.equal('');
        	});
    	});

	})

	describe('<RadioGroup />', () => {
    	let themedContainer: HTMLDivElement;
    	beforeEach(() => {
        	const ThemedContainer = WithTheme();
        	const {select} = clientRenderer.render(<ThemedContainer />);
        	themedContainer = select(WithThemeDAID) as HTMLDivElement;
    	});

    	it('renders to the screen with unselected radio buttons as children', async () => {
        	const {driver: group, waitForDom} = clientRenderer.render(
            	<RadioGroup>
                	<RadioButton value="Ifrit"/>
                	<RadioButton value="Titan"/>
            	</RadioGroup>,
            	themedContainer
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

    	it('uses "value" prop to determine checked child', async () => {
        	const {driver: group, waitForDom} = clientRenderer.render(
            	<RadioGroup value="Sleipnir">
                	<RadioButton value="Fafnir"/>
                	<RadioButton value="Sleipnir"/>
                	<RadioButton value="Snepnir"/>
            	</RadioGroup>,
            	themedContainer
        	).withDriver(RadioGroupDriver);
        	await waitForDom(() => {
            	expect(group.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
        	});
    	});

    	it('renders calls the given onChange function on change', async () => {
        	const onChange = sinon.spy();
        	const {driver: group, waitForDom} = clientRenderer.render(
            	<RadioGroup onChange={onChange}>
                	<RadioButton value="Leviathan"/>
                	<RadioButton value="Quetzalcoatl"/>
            	</RadioGroup>,
            	themedContainer
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
            	</RadioGroup>,
            	themedContainer
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
            	</RadioGroup>,
            	themedContainer
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
            	</div>,
            	themedContainer
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

    	it('renders children from the data source prop if given', async () => {
        	const {driver: group, waitForDom} = clientRenderer.render(
            	<RadioGroup
                	value="Child1"
                	dataSource={[{value: 'Child0'}, {value: 'Child1'}, {value: 'Child2'}]}
            	/>,
            	themedContainer
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

		describe('<RadioButton/>', () => {

        	it('renders a radio button to the screen', async () => {
            	const {driver: radio, waitForDom} = clientRenderer.render(
                	<RadioButton value="Shiva" />,
                	themedContainer
            	).withDriver(RadioButtonDriver);
            	await waitForDom(() => {
                	expect(radio.root).to.be.present();
                	expect(radio.nativeElement).to.have.attribute('type', 'radio');
                	expect(radio.value).to.equal('Shiva');
                	expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
            	});
        	});

        	it('renders the label next to the radio button (right by default)', async () => {
            	const distance = 7;
            	const {driver: radio, waitForDom} = clientRenderer.render(
                	<RadioButton><span style={{marginLeft: distance + 'px'}}>Omega</span></RadioButton>,
                	themedContainer
            	).withDriver(RadioButtonDriver);
            	const child = radio.children[0];
            	await waitForDom(() => {
                	expect(child).to.to.be.instanceOf(HTMLSpanElement);
                	expect(child).to.have.text('Omega');
                	expect([radio.icon, child]).to.be.horizontallyAligned;
                	expect([radio.icon, child]).to.be.inHorizontalSequence({distance});
            	});
        	});

        	it('calls the onClick function when clicked', async () => {
            	const onChange = sinon.spy();
            	const {driver: radio, waitForDom} = clientRenderer.render(
                	<RadioButton value="Tonberry" onChange={onChange}/>,
                	themedContainer
            	).withDriver(RadioButtonDriver);

            	await waitForDom(() => {
                	expect(radio.root).to.be.present();
            	});

            	radio.click();

            	return waitFor(() => {
                	expect(onChange).to.have.been.calledWithMatch({value: 'Tonberry'});
            	});
        	});


		});
	})

	describe('<SelectionList />', () => {
    	beforeEach(() => {
        	const ThemedContainer = WithTheme();
        	const {select} = clientRenderer.render(<ThemedContainer />);
        	themedContainer = select(WithThemeDAID) as HTMLDivElement;
    	});

    	it('Renders a divider', async () => {
        	const {driver: list, waitForDom} = clientRenderer.render(
            	<SelectionList dataSource={[divider]} />,
            	themedContainer
        	).withDriver(SelectionListTestDriver);

        	await waitForDom(() => {
            	expect(list.root).to.be.present();
        	});
        	expect(
            	list.elementHasStylableClassName(
                	list.items[0],
                	'root',
                	dividerStyle
            	)
        	).to.equal(true);
    	});

    	describe('Styling', () => {
        	it(`Puts "focused" state on the container when it's focused`, async () => {
            	const {driver: list, waitForDom} = clientRenderer.render(
                	<SelectionList />,
                	themedContainer
            	).withDriver(SelectionListTestDriver);

            	await waitForDom(() => expect(list.root).to.be.present());
            	expect(list.elementHasStylableState(list.root, 'focused')).to.equal(false);
            	list.focus();
            	await waitForDom(() => {
                	expect(list.elementHasStylableState(list.root, 'focused')).to.equal(true);
            	});
        	});

        	it(`Puts "selected" state on the selected item`, async () => {
            	const {driver: list, waitForDom} = clientRenderer.render(
                	<SelectionList dataSource={['0', '1']} value={'0'} />,
                	themedContainer
            	).withDriver(SelectionListTestDriver);

            	await waitForDom(() => expect(list.root).to.be.present());
            	expect(list.elementHasStylableState(list.items[0], 'selected', optionStyle)).to.equal(true);
            	expect(list.elementHasStylableState(list.items[1], 'selected', optionStyle)).to.equal(false);
        	});

        	it(`Puts "focused" state on the item focused via keyboard and removes it on blur`, async () => {
            	const {driver: list, waitForDom} = clientRenderer.render(
                	<SelectionList dataSource={['0', '1']} value={'0'} />,
                	themedContainer
            	).withDriver(SelectionListTestDriver);

            	await waitForDom(() => expect(list.root).to.be.present());

            	list.focus();
            	await waitForDom(() => {
                	expect(list.elementHasStylableState(list.items[0], 'focused', optionStyle)).to.equal(true);
                	expect(list.elementHasStylableState(list.items[1], 'focused', optionStyle)).to.equal(false);
            	});

            	list.keyDown(keycode('down'));
            	await waitForDom(() => {
                	expect(list.elementHasStylableState(list.items[0], 'focused', optionStyle)).to.equal(false);
                	expect(list.elementHasStylableState(list.items[1], 'focused', optionStyle)).to.equal(true);
            	});

            	list.blur();
            	await waitForDom(() => {
                	expect(list.elementHasStylableState(list.items[0], 'focused', optionStyle)).to.equal(false);
                	expect(list.elementHasStylableState(list.items[1], 'focused', optionStyle)).to.equal(false);
            	});
        	});
    	})

	})
})
