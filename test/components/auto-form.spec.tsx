import * as React from 'react';
import { expect, ClientRenderer } from 'test-drive-react';
import {AutoForm, AutoFormSchema, newSchemaRepository} from "../../src/components/auto-form/auto-form";
import * as WixReactComponents from '../../src';

describe('<AutoForm />', () => {
    const clientRenderer = new ClientRenderer();
    const AUTO_FORM_SELECTOR = "AUTO_FORM";
    afterEach(() => clientRenderer.cleanup())

    describe('Renders from schema', () => {
        const schemaRepo = newSchemaRepository();

        beforeEach(() => schemaRepo.clear());

        function renderAutoForm(schema:AutoFormSchema) {
            schemaRepo.addSchema(schema);

            return clientRenderer.render(
                <AutoForm
                    style={{height: "10px"}}
                    data-automation-id={AUTO_FORM_SELECTOR}
                    repo={schemaRepo}
                    schemaId={schema.id}/>);
        }

        it('renders missing props message when none provided', async () => {
            const ExportValue = (WixReactComponents as any)['AutoForm'];
            const { select, waitForDom } = clientRenderer.render(
                <ExportValue data-automation-id={AUTO_FORM_SELECTOR}/>);

            await waitForDom(() => {
                const errMessage = select("errMessage");
                expect(errMessage, "errMessage should be present").to.be.present();
                expect(errMessage).to.be.instanceOf(HTMLLabelElement);
                expect(errMessage!.textContent).to.be.eq("can't render form - missing properties");

            });
        });

        it('renders empty form when no schema provided', async () => {
            const { select, waitForDom } = renderAutoForm(
                {
                    id:'empty schema',
                    properties:{}
                } as AutoFormSchema);

            await waitForDom(() => {
                const autoFormElement = select(AUTO_FORM_SELECTOR);
                expect(autoFormElement).to.be.present();
                expect(autoFormElement).to.be.instanceOf(HTMLFormElement);
                expect(autoFormElement!.childElementCount).to.be.eq(0);
            });
        });

        it('renders form with single text field', async () => {
            const { select, waitForDom } = renderAutoForm(
                {
                    type:"object",
                    id:"1",
                    properties:{
                        text:{
                            type:"string",
                            title:"a text field"
                        }
                    }
                } as AutoFormSchema);
            await waitForDom(() => {
                const input1 = select("input_text");
                expect(input1, "input_1 should be present").to.be.present();
                expect(input1).to.be.instanceOf(HTMLInputElement);

                const label1 = select("label_text");
                expect(label1, "label_1 should be present").to.be.present();
                expect(label1).to.be.instanceOf(HTMLLabelElement);
                expect(label1!.textContent).to.be.eq("a text field");
            });
        });

        it('renders form with several text fields', async () => {
            const { select, waitForDom } = renderAutoForm(
                {
                    type:"object",
                    id:"1",
                    properties:{
                        text1:{
                            type:"string",
                            title:"text1"
                        },
                        text2:{
                            type:"string",
                            title:"text2"
                        }
                    }
                } as AutoFormSchema);
            await waitForDom(() => {
                const input1 = select("input_text1");
                expect(input1, "input_1 should be present").to.be.present();

                const label1 = select("label_text1");
                expect(label1, "label_1 should be present").to.be.present();
                expect(label1).to.be.instanceOf(HTMLLabelElement);
                expect(label1!.textContent).to.be.eq("text1");

                const input2 = select("input_text2");
                expect(input2, "input_2 should be present").to.be.present();

                const label2 = select("label_text2");
                expect(label2, "label_2 should be present").to.be.present();
                expect(label2).to.be.instanceOf(HTMLLabelElement);
                expect(label2!.textContent).to.be.eq("text2");

            });
        });


        // TODO:
        // it('renders form with 2 different field types')
        // it('fires on change events for internal form fields', async () => {
        // });

    });
});
