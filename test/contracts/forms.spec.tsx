import React = require('react');
import {SyntheticEvent} from 'react';
import {ClientRenderer, expect, waitFor} from 'test-drive-react';
import {CheckBox, DatePicker, DropDown, NumberInput, SelectionList, Slider, Toggle} from '../../src';

describe('Form contract of', function() {

    const testName = 'testInput';
    const clientRenderer = new ClientRenderer();

    afterEach(function() {
        clientRenderer.cleanup();
    });

    async function testFormContract(componentElement: React.ReactElement<any>, testValue: any, expectedQuery: string) {

        let loaderLocation: Location;

        function onLoad(event: SyntheticEvent<HTMLIFrameElement>) {
            const iframe = event.target as HTMLIFrameElement;
            loaderLocation = iframe.contentWindow.location;
        }

        function submitForm(formElement: HTMLFormElement): void {
            formElement && formElement.submit();
        }

        const testedElement = React.cloneElement(componentElement, {
            name: testName,
            value: testValue
        });
        const form = (
            <div>
                <form
                    ref={(element: HTMLFormElement) => submitForm(element)}
                    target="formLoader"
                    method="get"
                    action="about:config"
                >
                    {testedElement}
                </form>
                <iframe name="formLoader" onLoad={onLoad}/>
            </div>
        );
        clientRenderer.render(form);
        await waitFor(() => {
            expect(loaderLocation.search).to.equal(expectedQuery);
        });
    }

    it('CheckBox (checked)', async function() {
        await testFormContract(<CheckBox />, true, `?${testName}=on`);
    });

    it('CheckBox (unchecked)', async function() {
        await testFormContract(<CheckBox />, false, '');
    });

    it('CheckBox (custom value)', async function() {
        await testFormContract(<CheckBox formValue="custom"/>, true, `?${testName}=custom`);
    });

    it('DatePicker', async function() {
        const sampleDate = '2017-02-01';
        await testFormContract(<DatePicker/>, new Date(sampleDate), `?${testName}=${sampleDate}`);
    });

    it('DropDown (dataSource)', async function() {
        await testFormContract(<DropDown dataSource={['A', 'B', 'C']} />, 'B', `?${testName}=B`);
    });

    it('DropDown (children)', async function() {
        await testFormContract(
            <DropDown>
                <div data-value="A">Adalbert</div>
                <div data-value="B">Bombino</div>
                <div data-value="C">Cicciolina</div>
            </DropDown>, 'B', `?${testName}=B`);
    });

    it('NumberInput', async function() {
        await testFormContract(<NumberInput />, 666, `?${testName}=666`);
    });

    // RadioGroup - wait for Marton

    it('Slider', async function() {
        await testFormContract(<Slider />, 666, `?${testName}=666`);
    });

    it('Toggle', async function() {
        await testFormContract(<Toggle />, true, `?${testName}=on`);
    });

    it('Toggle (unchecked)', async function() {
        await testFormContract(<Toggle />, false, '');
    });

    // TimePicker

});
