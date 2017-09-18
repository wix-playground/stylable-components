import React = require('react');
import {ClientRenderer, expect} from 'test-drive-react';
import {CheckBox, DropDown, DatePicker, SelectionList} from '../../src';

describe('Form contract of', function() {

    const clientRenderer = new ClientRenderer();

    afterEach(function() {
        clientRenderer.cleanup();
    });

    async function testFormContract(componentElement: React.ReactElement<any>, testValue: any, expectedValue: string = testValue) {
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
            expect(formInput.value).to.equal(expectedValue);
        });
    }

    it('CheckBox', async function() {
        await testFormContract(<CheckBox />, true, 'on');
        await testFormContract(<CheckBox formValue="custom"/>, true, 'custom');
    });

    it('DatePicker', async function () {
        const sampleDate = '2017-02-01';
        await testFormContract(<DatePicker/>, new Date(sampleDate), sampleDate);
    });

    it('DropDown', async function() {
        await testFormContract(<DropDown dataSource={['A', 'B', 'C']} />, 'B');
    });

    // NumberInput

    // RadioGroup - wait for Marton

    it('SelectionList', async function () {
        await testFormContract(<SelectionList dataSource={['A', 'B', 'C']} />, 'B');
    })



});
