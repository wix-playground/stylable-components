import React = require('react');
import {ClientRenderer, expect, simulate} from 'test-drive-react';
import {CheckBoxDemo, demoValue} from "../../demo/checkbox-demo";

describe('<Checkbox/>', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('Renders and allows selection', async function () {
        const {select, waitForDom} = clientRenderer.render(<CheckBoxDemo/>);

        await waitForDom(() => {
           expect(select('CHECKBOX_ROOT')).to.be.present();
           expect(select('CHECKBOX_MARK')).to.not.be.present();
           expect(select('CHECKBOX_LABEL')).to.have.text(demoValue)
        });

        simulate.click(select('CHECKBOX_BOX'));
        await waitForDom(() => {
            expect('CHECKBOX_MARK').to.be.present();
        })

    });
});
