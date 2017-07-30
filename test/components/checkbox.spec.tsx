import React = require('react');
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {demoCheckBoxText, BasicDemo, DisabledDemo, IndeterminateDemo} from "../../demo/components/checkbox-demo";
import {CheckBox, CheckBoxIconProps} from "../../src";

const boxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg data-automation-id="CHECKBOX_BOX_TEST"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
            <path fill="none" stroke="black" d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const tickSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg data-automation-id="CHECKBOX_TICKMARK_TEST" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};

const IndeterminateSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg data-automation-id="CHECKBOX_INDETERMINATE_TEST" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0h8v2H0z"/>
        </svg>
    )
};

describe('<Checkbox/>', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('Component / Demo test', function () {
        it('Basic demo', async function () {
            const {select, waitForDom} = clientRenderer.render(<BasicDemo/>);

            await waitForDom(() => {
                expect(select( 'CHECKBOX_ROOT'), 'basic root').to.be.present();
                expect(select( 'CHECKBOX_BOX'), 'basic box').to.be.present();
                expect(select( 'CHECKBOX_TICKMARK'), 'basic tickmark').to.be.absent();
                expect(select( 'BASIC_LABEL'), 'basic label').to.have.text(demoCheckBoxText);
                expect(select('BUTTON_SUBMIT'), 'basic submit').to.be.present().and.to.have.attr('disabled');
            });

            simulate.click(select( 'CHECKBOX_ROOT'));

            return waitFor(() => {
                expect(select( 'CHECKBOX_TICKMARK'), 'basic tickmark').to.be.present();
                expect(select( 'CHECKBOX_TICKMARK')).to.be.insideOf(select( 'CHECKBOX_BOX') as HTMLElement);
                expect(select( 'BUTTON_SUBMIT'), 'basic submit').to.not.have.attr('disabled');
            });
        });

        it('Disabled Demo', async function () {
            const {select, waitForDom} = clientRenderer.render(<DisabledDemo/>);

            await waitForDom(() => {
                expect(select('DISABLED_DEMO', 'CHECKBOX_ROOT'), 'disabled root').to.be.present();
                expect(select('DISABLED_DEMO', 'CHECKBOX_BOX'), 'disabled box').to.be.present();
            });

            simulate.click(select('DISABLED_DEMO', 'CHECKBOX_ROOT'));

            return waitFor(() => {
                expect(select('DISABLED_DEMO', 'CHECKBOX_BOX'), 'disabled box').to.be.present();
                expect(select('DISABLED_DEMO', 'CHECKBOX_TICKMARK'), 'disabled tickmark').to.be.absent();
            });
        });

        it('Indeterminate Demo', async function () {
            const {select, waitForDom} = clientRenderer.render(<IndeterminateDemo/>);

            await waitForDom(() => {
                expect(select('INDETERMINATE_DEMO_OPTION1', 'CHECKBOX_TICKMARK')).to.be.present();
                expect(select('INDETERMINATE_DEMO_OPTION2', 'CHECKBOX_TICKMARK')).to.be.absent();
                expect(select('INDETERMINATE_DEMO_TOP_LEVEL', 'CHECKBOX_INDETERMINATE')).to.be.present();
            });

            simulate.click(select('INDETERMINATE_DEMO_TOP_LEVEL', 'CHECKBOX_ROOT'));

            return waitFor(() => {
                expect(select('INDETERMINATE_DEMO_OPTION1', 'CHECKBOX_TICKMARK')).to.be.present();
                expect(select('INDETERMINATE_DEMO_OPTION2', 'CHECKBOX_TICKMARK')).to.be.present();
            });
        });
    });

    it('Renders with default values', function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBox/>);

        return waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
            expect(select('CHECKBOX_BOX')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.absent();
        })
    });

    it('Displays children', function () {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox>
                <span data-automation-id="CHECKBOX_LABEL">covfefe</span>
            </CheckBox>
        );

        return waitForDom(() => {
            expect(select('CHECKBOX_LABEL')).to.have.text('covfefe');
        })
    });

    it('Displays a box icon', function () {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}>
                <span data-automation-id="CHECKBOX_LABEL">yoyo</span>
            </CheckBox>
        );

        return waitForDom(() => {
            expect(select('CHECKBOX_BOX_TEST')).to.be.present();
            expect(select('CHECKBOX_LABEL')).to.have.text('yoyo');
            expect([select('CHECKBOX_BOX_TEST'), select('CHECKBOX_LABEL')]).to.be.verticallyAligned('bottom', 5);
        })
    });

    it('Displays tick mark when value is true', function () {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}
                      tickIcon={tickSVG}
                      value={true}/>
        );

        return waitForDom(() => {
            expect(select('CHECKBOX_BOX_TEST')).to.be.present();
            expect(select('CHECKBOX_TICKMARK_TEST')).to.be.present();
        })
    });

    it('Calls onChange when clicked', async function () {
        const onChange = sinon.spy();

        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}
                      tickIcon={tickSVG}
                      value={true}
                      onChange={onChange}/>
        );

        await waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
        });

        simulate.click(select('CHECKBOX_ROOT'));

        return waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith(false);
        })
    });

    it('Renders a native input component of type "checkbox" for SEO purposes', function () {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}
                      tickIcon={tickSVG}
                      value={true}/>
        );
        const nativeInput = select('NATIVE_CHECKBOX') as HTMLInputElement;

        expect(nativeInput, 'native input not found in DOM').to.exist;
        expect(nativeInput.tagName).to.equal('INPUT');
        expect(nativeInput).to.have.attr('type', 'checkbox');
    });

    describe('When disabled', function () {
        it("doesn't call onChange when clicked", async function () {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} onChange={onChange}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise((resolve) => setTimeout(resolve, 500));

            return waitFor(() => {
                expect(onChange).to.not.have.been.called;
            })
        });

        it("displays tickmark if value is true", async function () {
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} value={true}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.present();
            });
        });

        it("displays indeterminate icon", async function () {
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled={true} value={true} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
            });
        });
    });

    describe('When readonly', function () {
        it("doesn't call onChange when clicked", async function () {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox readonly={true} onChange={onChange}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise((resolve) => setTimeout(resolve, 500));

            return waitFor(() => {
                expect(onChange).to.not.have.been.called;
            })
        });

        it("displays tickmark if value is true", async function () {
            const {select, waitForDom} = clientRenderer.render(<CheckBox readonly={true} value={true}/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.present();
            });
        });
    });

    describe('When indeterminate', function () {
        it('renders indeterminate icon when value is true', function () {
            const {select, waitForDom} =  clientRenderer.render(<CheckBox value={true} indeterminate/>)

            return waitForDom(() => {
                expect(select('CHECKBOX_BOX')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
                expect(select('CHECKBOX_TICKMARK')).to.be.absent();
            });
        });

        it('renders indeterminate icon when value is false', function () {
            const {select, waitForDom} =  clientRenderer.render(<CheckBox value={false} indeterminate/>)

            return waitForDom(() => {
                expect(select('CHECKBOX_BOX')).to.be.present();
                expect(select('CHECKBOX_INDETERMINATE')).to.be.present();
            });
        });

        it('click calls onChange with value true', async function () {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox value={true} onChange={onChange} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            return waitFor(() => {
                expect(onChange).to.have.been.calledOnce;
                expect(onChange).to.have.been.calledWith(true);
            })
        });

        it('renders custom indeterminate icon', function () {
            const {select, waitForDom} = clientRenderer.render(<CheckBox indeterminateIcon={IndeterminateSVG} indeterminate/>);

            return waitForDom(() => {
                expect(select('CHECKBOX_INDETERMINATE_TEST')).to.be.present();
            })
        });

        it('does not call onChange when disabled', async function () {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(<CheckBox disabled onChange={onChange} indeterminate/>);

            await waitForDom(() => {
                expect(select('CHECKBOX_ROOT')).to.be.present();
            });

            simulate.click(select('CHECKBOX_ROOT'));

            await new Promise((resolve) => setTimeout(resolve, 500));

            return waitFor(() => {
                expect(onChange).to.not.have.been.called;
            })
        });
    });
});
