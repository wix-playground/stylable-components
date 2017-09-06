import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from '../../demo/components/checkbox-demo';
import {CheckBox, CheckBoxIconProps} from '../../src';
import {CheckBoxTestDriver} from '../../test-kit/components/checkbox-driver';
import {sleep} from '../utils/sleep';

const boxSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            data-automation-id="CHECKBOX_BOX"
            data-name="custom-box"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="none" stroke="black" d="M.5.5h15v15H.5z"/>
        </svg>
    );
};

const tickSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
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
};

const IndeterminateSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            data-automation-id="CHECKBOX_INDETERMINATE"
            data-name="custom-indeterminate"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 0h8v2H0z"/>
        </svg>
    );
};

class CheckBoxDemoDriver extends DriverBase {
    static ComponentClass = CheckBoxDemo; //tslint:disable-line

    public get basicDemo(): {checkbox: CheckBoxTestDriver, button: HTMLButtonElement} {
        return {
            checkbox: new CheckBoxTestDriver(() => this.select('BASIC_DEMO', 'BASIC_DEMO_CHECKBOX')),
            button: this.select('BASIC_DEMO', 'BUTTON_SUBMIT')
        };
    }

    public get disabledDemo(): {checkbox: CheckBoxTestDriver} {
        return {
            checkbox: new CheckBoxTestDriver(() => this.select('DISABLED_DEMO', 'DISABLED_DEMO_CHECKBOX'))
        };
    }

    public get indeterminateDemo(): {
        topCheckbox: CheckBoxTestDriver,
        option1Checkbox: CheckBoxTestDriver,
        option2Checkbox: CheckBoxTestDriver
    } {
        return {
            topCheckbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_TOP_LEVEL')),
            option1Checkbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_OPTION1')),
            option2Checkbox: new CheckBoxTestDriver(() => this.select('INDETERMINATE_DEMO_OPTION2'))
        };
    }
}

describe('<Checkbox/>', function() {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('Component / Demo test', function() {
        it('Basic demo', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const checkbox = driver.basicDemo.checkbox;
            const button = driver.basicDemo.button;

            await waitForDom(() => {
                expect(checkbox.root, 'basic root').to.be.present();
                expect(checkbox.isChecked(), 'expected checkbox to be unchecked').to.be.false;
                expect(checkbox.children[0], 'basic label').to.have.text(demoCheckBoxText);
                expect(button, 'submit button was expected to be diabled').to.have.attribute('disabled');
            });

            checkbox.click();

            await waitFor(() => {
                expect(checkbox.isChecked(), 'expected checkbox to be checked').to.be.true;
                expect(checkbox.tickMark).to.be.insideOf(checkbox.box);
                expect(button, 'submit button was expected to be enabled').to.not.have.attribute('disabled');
            });
        });

        it('Disabled Demo', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const checkbox = driver.disabledDemo.checkbox;

            await waitForDom(() => {
                expect(checkbox.root, 'disabled root').to.be.present();
                expect(checkbox.box, 'disabled box').to.be.present();
                expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.be.false;
            });

            checkbox.click();

            await waitFor(() => {
                expect(checkbox.box, 'disabled box').to.be.present();
                expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.be.false;
            });
        });

        it('Indeterminate Demo', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBoxDemo/>).withDriver(CheckBoxDemoDriver);

            const {topCheckbox, option1Checkbox, option2Checkbox} = driver.indeterminateDemo;

            await waitForDom(() => {
                expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.be.true;
                expect(option2Checkbox.isChecked(), 'option 2 should be unchecked').to.be.false;
                expect(topCheckbox.isChecked(), 'top checkbox should be unchecked').to.be.false;
                expect(topCheckbox.isIndeterminate(), 'top checkbox should be indeterminate').to.be.true;
            });

            topCheckbox.click();

            await waitFor(() => {
                expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.be.true;
                expect(option2Checkbox.isChecked(), 'option 2 should be checked').to.be.true;
            });
        });
    });

    it('Renders with default values', async function() {
        const {driver, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.root).to.be.present();
            expect(driver.isChecked(), 'checkbox was expected to be unchecked').to.be.false;
        });
    });

    it('Displays children', async function() {
        const {driver, waitForDom} = clientRenderer.render(
            <CheckBox>
                <span>covfefe</span>
            </CheckBox>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.children[0]).to.have.text('covfefe');
        });
    });

    it('Displays a box icon', async function() {
        const {driver, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG} />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.box).to.be.present();
            expect(driver.box).to.have.attribute('data-name', 'custom-box');
        });
    });

    it('Aligns children and box icon', async function() {
        const {driver, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}>
                <span>yoyo</span>
            </CheckBox>
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.children[0]).to.have.text('yoyo');
            expect([driver.box, driver.children[0]]).to.be.verticallyAligned('bottom', 5);
        });
    });

    it('Displays custom tick mark when value is true', async function() {
        const {driver, waitForDom} = clientRenderer.render(
            <CheckBox
                boxIcon={boxSVG}
                tickIcon={tickSVG}
                value={true}
            />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.box).to.be.present();
            expect(driver.box).to.have.attribute('data-name', 'custom-box');
            expect(driver.tickMark).to.be.present();
            expect(driver.tickMark).to.have.attribute('data-name', 'custom-tickmark');
        });
    });

    it('Calls onChange when clicked', async function() {
        const onChange = sinon.spy();

        const {driver, waitForDom} = clientRenderer.render(
            <CheckBox
                boxIcon={boxSVG}
                tickIcon={tickSVG}
                value={true}
                onChange={onChange}
            />
        ).withDriver(CheckBoxTestDriver);

        await waitForDom(() => {
            expect(driver.root).to.be.present();
        });

        driver.click();

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: false});
        });
    });

    describe('Accessibility features', function() {
        it('Renders a native input and pass on checked state', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox value={true}/>
            ).withDriver(CheckBoxTestDriver);
            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native input not found in DOM').to.be.present();
                expect(nativeInput).to.be.instanceOf(HTMLInputElement);
                expect(nativeInput).to.have.attribute('type', 'checkbox');
                expect(nativeInput, 'native checkbox should be checked').to.have.property('checked', true);
            });
        });

        it('native input gets disabled state', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox disabled/>).withDriver(CheckBoxTestDriver);

            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
            });
        });

        it('native input gets id prop if supplied by user', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox id="covfefe"/>).withDriver(CheckBoxTestDriver);

            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should have id').to.have.attribute('id', 'covfefe');
            });
        });

        it('component gets tabIndex 0 by default', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.nativeInput).to.have.attribute('tabIndex', '0');
            });
        });

        it('component gets tabIndex supplied by the user', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox tabIndex={99998}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.nativeInput).to.have.attribute('tabIndex', '99998');
            });
        });
    });

    describe('When disabled', function() {
        it('doesn\'t call onChange when clicked', async function() {
            const onChange = sinon.spy();
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled onChange={onChange}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();
            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled value={true}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.isChecked()).to.be.true;
            });
        });

        it('displays indeterminate icon', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled value={true} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.isIndeterminate()).to.be.true;
            });
        });
    });

    describe('When readonly', function() {
        it('doesn\'t call onChange when clicked', async function() {
            const onChange = sinon.spy();
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox readonly onChange={onChange}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();
            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox readonly value={true}/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.isChecked()).to.be.true;
            });
        });
    });

    describe('When indeterminate', function() {
        it('renders indeterminate icon when value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox value={true} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.box).to.be.present();
                expect(driver.isIndeterminate()).to.be.true;
                expect(driver.isChecked()).to.be.false;
            });
        });

        it('renders indeterminate icon when value is false', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox value={false} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.box).to.be.present();
                expect(driver.isIndeterminate()).to.be.true;
            });
        });

        it('click calls onChange with value true', async function() {
            const onChange = sinon.spy();
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox
                    value={true}
                    onChange={onChange}
                    indeterminate
                />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();

            await waitFor(() => {
                expect(onChange).to.have.been.calledOnce;
                expect(onChange).to.have.been.calledWithMatch({value: true});
            });
        });

        it('renders custom indeterminate icon', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox
                    indeterminateIcon={IndeterminateSVG}
                    indeterminate
                />
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.isIndeterminate()).to.be.true;
                expect(driver.indeterminateMark).to.have.attribute('data-name', 'custom-indeterminate');
            });
        });

        it('does not call onChange when disabled', async function() {
            const onChange = sinon.spy();
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled onChange={onChange} indeterminate/>
            ).withDriver(CheckBoxTestDriver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();

            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });
    });
});
