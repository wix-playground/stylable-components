import keycode = require('keycode');
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, simulate, sinon, trigger, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from '../../demo/components/checkbox-demo';
import {CheckBox} from '../../src';
import {CheckBoxTestDriver} from '../../test-kit/components/checkbox-driver';
import {sleep} from '../utils';

const tickSVG: React.ReactNode = (
    <svg
        data-automation-id="CHECKBOX_TICKMARK"
        data-name="custom-tickmark"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path stroke="black" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
    </svg>

);

const IndeterminateSVG: React.ReactNode = (
    <svg
        data-automation-id="CHECKBOX_INDETERMINATE"
        data-name="custom-indeterminate"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M5 0h8v2H0z"/>
    </svg>
);

class CheckBoxDemoDriver extends DriverBase {
    public static ComponentClass = CheckBoxDemo;

    public readonly basicDemo: {checkbox: CheckBoxTestDriver, button: HTMLButtonElement} = {
        checkbox: new CheckBoxTestDriver(() => this.select('BASIC_DEMO', 'BASIC_DEMO_CHECKBOX')),
        button: this.select('BASIC_DEMO', 'BUTTON_SUBMIT')
    };

    public readonly disabledDemo: {checkbox: CheckBoxTestDriver} = {
        checkbox: new CheckBoxTestDriver(() => this.select('DISABLED_DEMO', 'DISABLED_DEMO_CHECKBOX'))
    };

    public readonly indeterminateDemo: {
        topCheckbox: CheckBoxTestDriver,
        option1Checkbox: CheckBoxTestDriver,
        option2Checkbox: CheckBoxTestDriver
    } = {
        topCheckbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_TOP_LEVEL')),
        option1Checkbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_OPTION1')),
        option2Checkbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_OPTION2'))
    };
}

describe('<Checkbox/>', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('Component / Demo test', () => {
        it('Basic demo', async () => {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const checkbox = driver.basicDemo.checkbox;
            const button = driver.basicDemo.button;

            await waitForDom(() => {
                expect(checkbox.root, 'basic root').to.be.present();
                expect(checkbox.isChecked(), 'expected checkbox to be unchecked').to.equal(false);
                expect(checkbox.children[0], 'basic label').to.have.text(demoCheckBoxText);
                expect(button, 'submit button was expected to be diabled').to.have.attribute('disabled');
            });

            checkbox.click();

            await waitForDom(() => {
                expect(checkbox.isChecked(), 'expected checkbox to be checked').to.equal(true);
                expect(checkbox.tickMark).to.be.insideOf(checkbox.box);
                expect(button, 'submit button was expected to be enabled').to.not.have.attribute('disabled');
            });
        });

        it('Disabled Demo', async () => {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const checkbox = driver.disabledDemo.checkbox;

            await waitForDom(() => {
                expect(checkbox.root, 'disabled root').to.be.present();
                expect(checkbox.box, 'disabled box').to.be.present();
                expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.equal(false);
            });

            checkbox.click();

            await waitFor(() => {
                expect(checkbox.box, 'disabled box').to.be.present();
                expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.equal(false);
            });
        });

        it('Indeterminate Demo', async () => {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const {topCheckbox, option1Checkbox, option2Checkbox} = driver.indeterminateDemo;

            await waitForDom(() => {
                expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.equal(true);
                expect(option2Checkbox.isChecked(), 'option 2 should be unchecked').to.equal(false);
                expect(topCheckbox.isChecked(), 'top checkbox should be unchecked').to.equal(false);
                expect(topCheckbox.isIndeterminate(), 'top checkbox should be indeterminate').to.equal(true);
            });

            topCheckbox.click();

            await waitFor(() => {
                expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.equal(true);
                expect(option2Checkbox.isChecked(), 'option 2 should be checked').to.equal(true);
            });
        });
    });

    it('Renders with default values', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.root).to.be.present();
            expect(checkbox.isChecked(), 'checkbox was expected to be unchecked').to.equal(false);
        });
    });

    it('Displays children', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox>
                <span>covfefe</span>
            </CheckBox>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.children[0]).to.have.text('covfefe');
        });
    });

    it('Aligns children and box icon', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox>
                <span>yoyo</span>
            </CheckBox>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.children[0]).to.have.text('yoyo');
            expect([checkbox.box, checkbox.children[0]]).to.be.verticallyAligned('bottom', 5);
        });
    });

    it('Displays custom tick mark when value is true', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox
                tickIcon={tickSVG}
                value={true}
            />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.tickMark).to.be.present();
            expect(checkbox.tickMark).to.have.attribute('data-name', 'custom-tickmark');
        });
    });

    it('Calls onChange when clicked', async () => {
        const onChange = sinon.spy();

        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox
                tickIcon={tickSVG}
                value={true}
                onChange={onChange}
            />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.root).to.be.present();
        });

        checkbox.click();

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: false});
        });
    });

    it('Switches to focus state when focused', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox   value={true}/>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            checkbox.focus();
            expect(checkbox.hasStylableState('focus')).to.equal(true);
        });
    });

    it('Accepts "name" prop', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox  name="shlomi"/>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.nativeInput).to.have.attribute('name', 'shlomi');
        });
    });

    it('Accepts "autofocus" prop', async () => {
        if (document.hasFocus()) {

            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox  autoFocus/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(document.activeElement).to.equal(checkbox.nativeInput);
                expect(checkbox.hasStylableState('focus')).to.equal(true);
            });

        } else {
            console.warn(// tslint:disable-line no-console
                'Checkbox autofocus test wasn\'t run since document doesn\'t have focus'
            );
        }
    });

    describe('Accessibility features', () => {
        it('Renders a native input and pass on checked state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox value={true}/>
            ).withDriver(CheckBoxTestDriver);

            const nativeInput = checkbox.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native input not found in DOM').to.be.present();
                expect(nativeInput).to.be.instanceOf(HTMLInputElement);
                expect(nativeInput).to.have.attribute('type', 'checkbox');
                expect(nativeInput, 'native checkbox should be checked').to.have.property('checked', true);
            });
        });

        it('native input gets disabled state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled/>
            ).withDriver(CheckBoxTestDriver);

            const nativeInput = checkbox.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
            });
        });

        it('native input gets id prop if supplied by user', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox id="covfefe"/>
            ).withDriver(CheckBoxTestDriver);

            const nativeInput = checkbox.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should have id').to.have.attribute('id', 'covfefe');
            });
        });

        it('component gets tabIndex 0 by default', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.nativeInput).to.have.attribute('tabIndex', '0');
            });
        });

        it('component gets tabIndex supplied by the user', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox tabIndex={99998}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.nativeInput).to.have.attribute('tabIndex', '99998');
            });
        });

        it('takes "aria-controls" property', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox aria-controls={['123', '345']}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.nativeInput).to.have.attribute('aria-controls', '123,345');
            });
        });

        it('gets focus after click (should not be in focused style state)', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {expect(checkbox.root).to.be.present(); });

            checkbox.click();

            await waitForDom(() => {
                expect(document.activeElement).to.equal(checkbox.nativeInput);
                expect(checkbox.hasStylableState('focus'), 'checkbox should not look focused').to.equal(false);
            });
        });
    });

    describe('When disabled', () => {
        it('doesn\'t call onChange when clicked', async () => {
            const onChange = sinon.spy();
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled onChange={onChange}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.root).to.be.present();
            });

            checkbox.click();
            await sleep(10);
            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled value={true}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.isChecked()).to.equal(true);
            });
        });

        it('gets disabled style state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.hasStylableState('disabled')).to.equal(true);
            });
        });

        it('displays indeterminate icon', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled value={true} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.isIndeterminate()).to.equal(true);
            });
        });
    });

    describe('When readonly', () => {
        it('doesn\'t call onChange when clicked', async () => {
            const onChange = sinon.spy();
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox readOnly onChange={onChange}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.root).to.be.present();
            });

            checkbox.click();
            await sleep(10);
            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox readOnly value={true}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.isChecked()).to.equal(true);
            });
        });

        it('gets readOnly style state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox readOnly/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.hasStylableState('readonly')).to.equal(true);
            });
        });
    });

    describe('When error', () => {
        it('has error style state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox error/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.hasStylableState('error')).to.equal(true);
            });
        });
    });

    describe('When indeterminate', () => {
        it('renders indeterminate icon when value is true', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox value={true} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.box).to.be.present();
                expect(checkbox.isIndeterminate()).to.equal(true);
                expect(checkbox.isChecked()).to.equal(false);
            });
        });

        it('renders indeterminate icon when value is false', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox value={false} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.box).to.be.present();
                expect(checkbox.isIndeterminate()).to.equal(true);
            });
        });

        it('click calls onChange with value true', async () => {
            const onChange = sinon.spy();
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox
                    value={true}
                    onChange={onChange}
                    indeterminate
                />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.root).to.be.present();
            });

            checkbox.click();

            await waitFor(() => {
                expect(onChange).to.have.been.calledOnce;
                expect(onChange).to.have.been.calledWithMatch({value: true});
            });
        });

        it('renders custom indeterminate icon', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox
                    indeterminateIcon={IndeterminateSVG}
                    indeterminate
                />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.isIndeterminate()).to.equal(true);
                expect(checkbox.indeterminateMark).to.have.attribute('data-name', 'custom-indeterminate');
            });
        });

        it('does not call onChange when disabled', async () => {
            const onChange = sinon.spy();
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox disabled onChange={onChange} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.root).to.be.present();
            });

            checkbox.click();
            await sleep(10);
            expect(onChange).to.not.have.been.called;
        });

        it('gets indeterminate style state', async () => {
            const {driver: checkbox, waitForDom} = clientRenderer.render(
                <CheckBox indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.hasStylableState('indeterminate')).to.equal(true);
            });
        });
    });
});
