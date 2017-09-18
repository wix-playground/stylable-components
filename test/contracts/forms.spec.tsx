import React = require('react');
import {ClientRenderer, expect} from 'test-drive-react';
import {DropDown, CheckBox} from '../../src';

describe('Form contract of', function() {

    const clientRenderer = new ClientRenderer();

    afterEach(function() {
        clientRenderer.cleanup();
    });

    async function testFormContract(componentElement: React.ReactElement<any>, testValue: any) {
        const testName = 'testInput';
        let formElement: HTMLFormElement;
        const testedElement = React.cloneElement(componentElement, {
            name: testName,
            value: testValue
        });
        const form = (
            <form ref={element => formElement = element as HTMLFormElement}>
                {testedElement}
            </form>
        );
        const {waitForDom} = clientRenderer.render(form);
        await waitForDom(() => {
            const formInput = formElement![testName] as HTMLInputElement;
            expect(formInput).to.be.an.instanceOf(HTMLInputElement);
            expect(formInput.value).to.equal(testValue);
        });
    }

    it('CheckBox', async function () {
        await testFormContract(<CheckBox />, true);
    });

    it('DropDown', async function () {
        await testFormContract(<DropDown dataSource={['A', 'B', 'C']} />, 'B');
    });

});
