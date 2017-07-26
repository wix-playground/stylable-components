import React = require('react');
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from "../../demo/components/checkbox-demo";
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


describe('<Checkbox/>', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('Renders and allows selection', async function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBoxDemo/>);

        await waitForDom(() => {
           expect(select('CHECKBOX_ROOT')).to.be.present();
           expect(select('CHECKBOX_BOX')).to.be.present();
           expect(select('CHECKBOX_TICKMARK')).to.be.absent();
           expect(select('CHECKBOX_LABEL')).to.have.text(demoCheckBoxText);
           expect(select('BUTTON_SUBMIT')).to.be.present().and.to.have.attr('disabled');
        });

        simulate.click(select('CHECKBOX_ROOT'));

        return waitFor(() => {
            expect(select('CHECKBOX_TICKMARK')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.insideOf(select('CHECKBOX_BOX') as HTMLElement);
            expect(select('BUTTON_SUBMIT')).to.not.have.attr('disabled');
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
});
