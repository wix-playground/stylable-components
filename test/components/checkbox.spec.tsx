import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from '../../demo/components/checkbox-demo';
import {CheckBox} from '../../src';
import {CheckBoxTestDriver} from '../../test-kit/components/checkbox-driver';
import {sleep} from '../utils/sleep';

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

            await waitFor(() => {
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

    it('Displays a box icon', async () => {
        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.box).to.be.present();
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
                value={true}
            />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(checkbox.box).to.be.present();
            expect(checkbox.tickMark).to.be.present();
        });
    });

    it('Calls onChange when clicked', async () => {
        const onChange = sinon.spy();

        const {driver: checkbox, waitForDom} = clientRenderer.render(
            <CheckBox
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
                <CheckBox readonly onChange={onChange}/>
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
                <CheckBox readonly value={true}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(checkbox.isChecked()).to.equal(true);
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
    });
});
