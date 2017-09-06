import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {BasicDemo, demoCheckBoxText, DisabledDemo, IndeterminateDemo} from '../../demo/components/checkbox-demo';
import {CheckBox, CheckBoxIconProps} from '../../src';
import {CheckBoxTestDriver as Driver} from '../../test-kit/components/checkbox-driver';
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

describe('<Checkbox/>', function() {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('Component / Demo test', function() {
        it('Basic demo', async function() {
            const {select, waitForDom} = clientRenderer.render(<BasicDemo/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT'), 'basic root').to.be.present();
                expect(select('CHECKBOX_BOX'), 'basic box').to.be.present();
                expect(select('CHECKBOX_TICKMARK'), 'basic tickmark').to.be.absent();
                expect(select('BASIC_LABEL'), 'basic label').to.have.text(demoCheckBoxText);
                expect(select('BUTTON_SUBMIT'), 'basic submit').to.be.present().and.to.have.attribute('disabled');
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await waitFor(() => {
                expect(select('CHECKBOX_TICKMARK'), 'basic tickmark').to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.insideOf(select('CHECKBOX_BOX') as HTMLElement);
                expect(select('BUTTON_SUBMIT'), 'basic submit').to.not.have.attribute('disabled');
            });
        });

        it('Disabled Demo', async function() {
            const {select, waitForDom} = clientRenderer.render(<DisabledDemo/>);

            await waitForDom(() => {
                expect(select('DISABLED_DEMO', 'CHECKBOX_ROOT'), 'disabled root').to.be.present();
                expect(select('DISABLED_DEMO', 'CHECKBOX_BOX'), 'disabled box').to.be.present();
            });

            simulate.click(select('DISABLED_DEMO', 'CHECKBOX_ROOT'));

            await waitFor(() => {
                expect(select('DISABLED_DEMO', 'CHECKBOX_BOX'), 'disabled box').to.be.present();
                expect(select('DISABLED_DEMO', 'CHECKBOX_TICKMARK'), 'disabled tickmark').to.be.absent();
            });
        });

        it('Indeterminate Demo', async function() {
            const {select, waitForDom} = clientRenderer.render(<IndeterminateDemo/>);

            await waitForDom(() => {
                expect(select('INDETERMINATE_DEMO_OPTION1', 'CHECKBOX_TICKMARK')).to.be.present();
                expect(select('INDETERMINATE_DEMO_OPTION2', 'CHECKBOX_TICKMARK')).to.be.absent();
                expect(select('INDETERMINATE_DEMO_TOP_LEVEL', 'CHECKBOX_INDETERMINATE')).to.be.present();
            });

            simulate.click(select('INDETERMINATE_DEMO_TOP_LEVEL', 'CHECKBOX_ROOT'));

            await waitFor(() => {
                expect(select('INDETERMINATE_DEMO_OPTION1', 'CHECKBOX_TICKMARK')).to.be.present();
                expect(select('INDETERMINATE_DEMO_OPTION2', 'CHECKBOX_TICKMARK')).to.be.present();
            });
        });
    });

    it('Renders with default values', async function() {
        const {driver, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(Driver);

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
        ).withDriver(Driver);

        await waitForDom(() => {
            expect(driver.children[0]).to.have.text('covfefe');
        });
    });

    it('Displays a box icon', async function() {
        const {driver, waitForDom} = clientRenderer.render(<CheckBox boxIcon={boxSVG} />).withDriver(Driver);

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
        ).withDriver(Driver);

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
        ).withDriver(Driver);

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
        ).withDriver(Driver);

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
            ).withDriver(Driver);
            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native input not found in DOM').to.be.present();
                expect(nativeInput).to.be.instanceOf(HTMLInputElement);
                expect(nativeInput).to.have.attribute('type', 'checkbox');
                expect(nativeInput, 'native checkbox should be checked').to.have.property('checked', true);
            });
        });

        it('native input gets disabled state', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox disabled/>).withDriver(Driver);

            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
            });
        });

        it('native input gets id prop if supplied by user', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox id="covfefe"/>).withDriver(Driver);

            const nativeInput = driver.nativeInput;

            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should have id').to.have.attribute('id', 'covfefe');
            });
        });

        it('component gets tabIndex 0 by default', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox/>).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.nativeInput).to.have.attribute('tabIndex', '0');
            });
        });

        it('component gets tabIndex supplied by the user', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox tabIndex={99998}/>).withDriver(Driver);

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
            ).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();
            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox disabled value={true}/>).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.isChecked()).to.be.true;
            });
        });

        it('displays indeterminate icon', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled value={true} indeterminate/>
            ).withDriver(Driver);

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
            ).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();
            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });

        it('displays tickmark if value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(<CheckBox readonly value={true}/>).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.isChecked()).to.be.true;
            });
        });
    });

    describe('When indeterminate', function() {
        it('renders indeterminate icon when value is true', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox value={true} indeterminate/>
            ).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.box).to.be.present();
                expect(driver.isIndeterminate()).to.be.true;
                expect(driver.isChecked()).to.be.false;
            });
        });

        it('renders indeterminate icon when value is false', async function() {
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox value={false} indeterminate/>
            ).withDriver(Driver);

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
            ).withDriver(Driver);

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
            ).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.isIndeterminate()).to.be.true;
                expect(driver.indeterminateMark).to.have.attribute('data-name', 'custom-indeterminate');
            });
        });

        it('does not call onChange when disabled', async function() {
            const onChange = sinon.spy();
            const {driver, waitForDom} = clientRenderer.render(
                <CheckBox disabled onChange={onChange} indeterminate/>
            ).withDriver(Driver);

            await waitForDom(() => {
                expect(driver.root).to.be.present();
            });

            driver.click();

            await sleep(10);

            expect(onChange).to.not.have.been.called;
        });
    });
});
