import React = require('react');
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {CheckBoxDemo, demoCheckBoxText} from "../../demo/checkbox-demo";
import {CheckBox} from "../../src/components/checkbox/checkbox";

const tickSVG = '/test/assets/tickMark.svg';
const boxSVG = '/test/assets/uncheckedCheckbox.svg';

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
        });
    });

    it('Renders', function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBox/>);

        return waitForDom(() => {
            expect(select('CHECKBOX_ROOT')).to.be.present();
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

            expect(select('CHECKBOX_TICKMARK')).to.be.insideOf(select('CHECKBOX_BOX') as HTMLElement);
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
