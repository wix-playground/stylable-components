import React = require('react');
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from "../../demo/components/checkbox-demo";
import {CheckBox, CheckBoxIconProps} from "../../src/components/checkbox/checkbox";

const boxSVG: React.SFC<CheckBoxIconProps> = () => {
    return (
        <svg data-automation-id="CHECKBOX_BOX"  height="1em" width="1em "viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
            <path fill="none" stroke="black" d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const tickSVG: React.SFC<CheckBoxIconProps> = () => {
    return (
        <svg data-automation-id="CHECKBOX_TICKMARK" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
           expect(select('CHECKBOX_LABEL')).to.have.text(demoCheckBoxText)
        });

        simulate.click(select('CHECKBOX_ROOT'));

        return waitFor(() => {
            expect(select('CHECKBOX_TICKMARK')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.insideOf(select('CHECKBOX_BOX') as HTMLElement);

        });
    });

    it('Renders with default values', function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBox/>);

        return waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
            expect(select('CHECKBOX_BOX')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.absent();
            expect(select('CHECKBOX_LABEL')).to.have.text('')
        })
    });

    it('Displays label', function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBox text="covfefe"/>);

        return waitForDom(() => {
            expect(select('CHECKBOX_LABEL')).to.have.text('covfefe');
        })
    });

    it('Displays a box icon', function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBox boxIcon={boxSVG} text="yoyo"/>);

        return waitForDom(()=> {
            expect(select('CHECKBOX_BOX')).to.be.present();
            expect([select('CHECKBOX_BOX'), select('CHECKBOX_LABEL')]).to.be.verticallyAligned('bottom', 5);
        })
    });

    it('Displays tick mark when value is true', function () {
        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}
                      text="yoyo"
                      tickIcon={tickSVG}
                      value={true}/>
        );

        return waitForDom(() => {
            expect(select('CHECKBOX_BOX')).to.be.present();
            expect(select('CHECKBOX_TICKMARK')).to.be.present();
        })
    });

    it('Calls onChange when clicked', async function () {
       const onChange = sinon.spy();

        const {select, waitForDom} = clientRenderer.render(
            <CheckBox boxIcon={boxSVG}
                      text="yoyo"
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
});
