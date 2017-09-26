import React = require('react');
import {SyntheticEvent} from 'react';
import {ClientRenderer, expect, waitFor} from 'test-drive-react';
import {AutoComplete, CheckBox, DatePicker, DropDown, NumberInput, RadioButton, RadioGroup, Slider,
        Toggle} from '../../src';
import {TimePicker} from '../../src/components/time-picker/time-picker';

describe('Form contract of', () => {

    const testName = 'testInput';
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
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

    it('AutoComplete', async () => {
        await testFormContract(<AutoComplete dataSource={['A', 'B', 'C']}/>, 'B', `?${testName}=B`);
    });

    it('CheckBox (checked)', async () => {
        await testFormContract(<CheckBox />, true, `?${testName}=on`);
    });

    it('CheckBox (unchecked)', async () => {
        await testFormContract(<CheckBox />, false, '');
    });

    it('CheckBox (custom value)', async () => {
        await testFormContract(<CheckBox formValue="custom"/>, true, `?${testName}=custom`);
    });

    it('DatePicker', async () => {
        const sampleDate = '2017-02-01';
        await testFormContract(<DatePicker/>, new Date(sampleDate), `?${testName}=${sampleDate}`);
    });

    it('DropDown (dataSource)', async () => {
        await testFormContract(<DropDown dataSource={['A', 'B', 'C']} />, 'B', `?${testName}=B`);
    });

    it('DropDown (children)', async () => {
        await testFormContract(
            <DropDown>
                <div data-value="A">Adalbert</div>
                <div data-value="B">Bombino</div>
                <div data-value="C">Cicciolina</div>
            </DropDown>, 'B', `?${testName}=B`);
    });

    it('NumberInput', async () => {
        await testFormContract(<NumberInput />, 666, `?${testName}=666`);
    });

    it('RadioGroup (dataSource)', async () => {
        await testFormContract(<RadioGroup dataSource={[{value: 'A'}, {value: 'B'}, {value: 'C'}]} />,
            'B', `?${testName}=B`
        );
    });

    it('RadioGroup (children)', async () => {
        await testFormContract(
            <RadioGroup>
                <RadioButton value="A">Adalbert</RadioButton>
                <RadioButton value="B">Bombino</RadioButton>
                <RadioButton value="C">Cicciolina</RadioButton>
            </RadioGroup>, 'B', `?${testName}=B`);
    });

    it('Slider', async () => {
        await testFormContract(<Slider />, 666, `?${testName}=666`);
    });

    it.skip('TimePicker', async () => {
        await testFormContract(<TimePicker />, '4:36', `?${testName}=04%3A36`);
    });

    it('Toggle (on)', async () => {
        await testFormContract(<Toggle />, true, `?${testName}=on`);
    });

    it('Toggle (unchecked)', async () => {
        await testFormContract(<Toggle />, false, '');
    });

});
