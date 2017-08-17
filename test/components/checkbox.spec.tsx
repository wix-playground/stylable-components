import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {BasicDemo, demoCheckBoxText, DisabledDemo, IndeterminateDemo} from '../../demo/components/checkbox-demo';
import {CheckBox, CheckBoxIconProps} from '../../src';

const boxSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg data-automation-id="CHECKBOX_BOX_TEST" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="black" d="M.5.5h15v15H.5z"/>
        </svg>
    );
};

const tickSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg data-automation-id="CHECKBOX_TICKMARK_TEST" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    );
};

const IndeterminateSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg data-automation-id="CHECKBOX_INDETERMINATE_TEST" xmlns="http://www.w3.org/2000/svg">
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
        const {select, waitForDom} = clientRenderer.render(<CheckBox/>);

        await waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
            expect(select('CHECKBOX_BOX')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.absent();
        });
    });

    it('Displays children', async function() {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox>
                <span data-automation-id="CHECKBOX_LABEL">covfefe</span>
            </CheckBox>
        );

        await waitForDom(() => {
            expect(select('CHECKBOX_LABEL')).to.have.text('covfefe');
        });
    });

    it('Displays a box icon', async function() {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}>
                <span data-automation-id="CHECKBOX_LABEL">yoyo</span>
            </CheckBox>
        );

        await waitForDom(() => {
            expect(select('CHECKBOX_BOX_TEST')).to.be.present();
            expect(select('CHECKBOX_LABEL')).to.have.text('yoyo');
            expect([select('CHECKBOX_BOX_TEST'), select('CHECKBOX_LABEL')]).to.be.verticallyAligned('bottom', 5);
        });
    });

    it('Displays tick mark when value is true', async function() {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox
                boxIcon={boxSVG}
                tickIcon={tickSVG}
                value={true}
            />
        );

        await waitForDom(() => {
            expect(select('CHECKBOX_BOX_TEST')).to.be.present();
            expect(select('CHECKBOX_TICKMARK_TEST')).to.be.present();
        });
    });

    it('Calls onChange when clicked', async function() {
        const onChange = sinon.spy();

        const {select, waitForDom} = clientRenderer.render(
            <CheckBox
                boxIcon={boxSVG}
                tickIcon={tickSVG}
                value={true}
                onChange={onChange}
            />
        );

        await waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
        });

        simulate.click(select('CHECKBOX_ROOT'));

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: false});
        });
    });

    describe('Accessibility features', function() {
        it('Renders a native input and pass on checked state', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox value={true}/>
            );
            const nativeInput = select('NATIVE_CHECKBOX') as HTMLInputElement;

            await waitForDom(() => {
                expect(nativeInput, 'native input not found in DOM').to.be.present();
                expect(nativeInput).to.be.instanceOf(HTMLInputElement);
                expect(nativeInput).to.have.attribute('type', 'checkbox');
                expect(nativeInput.checked, 'native checkbox should be checked').to.equal(true);
            });
        });

        it('native input gets disabled state', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox disabled/>
            );
            const nativeInput = select('NATIVE_CHECKBOX') as HTMLInputElement;
            await waitForDom(() => {
                expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
            });
        });

        it('native input gets id prop if supplied by user', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox id="covfefe"/>
            );
            const nativeInput = select('NATIVE_CHECKBOX') as HTMLInputElement;
            await waitForDom(() => {
                expect(nativeInput.id, 'native checkbox should have id').to.equal('covfefe');
            });
        });

        it('component does not get tabIndex default', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox />
            );
            await waitForDom(() => {
                expect(select('NATIVE_CHECKBOX')).to.not.have.attribute('tabIndex');
            });
        });

        it('component gets tabIndex supplied by the user', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox tabIndex={99998}/>
            );
            await waitForDom(() => {
                expect(select('NATIVE_CHECKBOX')).to.have.attribute('tabIndex', '99998');
            });
        });
    });

    describe('When disabled', function() {
        it('doesn\'t call onChange when clicked', async function() {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} onChange={onChange}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(onChange).to.not.have.been.called;
            });
        });

        it('displays tickmark if value is true', async function() {
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} value={true}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.present();
            });
        });

        it('displays indeterminate icon', async function() {
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} value={true} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
            });
        });
    });

    describe('When readonly', function() {
        it('doesn\'t call onChange when clicked', async function() {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox readonly={true} onChange={onChange}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(onChange).to.not.have.been.called;
            });
        });

        it('displays tickmark if value is true', async function() {
            const {select, waitForDom} = clientRenderer.render(<CheckBox readonly={true} value={true}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.present();
            });
        });
    });

    describe('When indeterminate', function() {
        it('renders indeterminate icon when value is true', async function() {
            const {select, waitForDom} = clientRenderer.render(<CheckBox value={true} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_BOX')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.absent();
            });
        });

        it('renders indeterminate icon when value is false', async function() {
            const {select, waitForDom} = clientRenderer.render(<CheckBox value={false} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_BOX')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
            });
        });

        it('click calls onChange with value true', async function() {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox
                    value={true}
                    onChange={onChange}
                    indeterminate
                />
            );

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await waitFor(() => {
                expect(onChange).to.have.been.calledOnce;
                expect(onChange).to.have.been.calledWithMatch({value: true});
            });
        });

        it('renders custom indeterminate icon', async function() {
            const {select, waitForDom} = clientRenderer.render(
                <CheckBox
                    indeterminateIcon={IndeterminateSVG}
                    indeterminate
                />
            );

            await waitForDom(() => {
                expect(select('CHECKBOX_INDETERMINATE_TEST')).to.be.present();
            });
        });

        it('does not call onChange when disabled', async function() {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled onChange={onChange} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(onChange).to.not.have.been.called;
            });
        });
    });
});
