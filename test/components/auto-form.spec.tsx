import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { TextInput } from '../../src';
import {AutoForm} from "../../src/components/auto-form/auto-form";

describe('<AutoForm />', () => {
    const clientRenderer = new ClientRenderer();
    const AUTO_FORM_SELECTOR = "AUTO_FORM";
    afterEach(() => clientRenderer.cleanup())

    describe('Renders from schema', () => {
        function renderAutoForm() {
            return clientRenderer.render(<AutoForm
                style={{height: "10px"}}
                data-automation-id={AUTO_FORM_SELECTOR}/>);
        }

        it('renders empty form when no schema provided', async () => {
            const { select, waitForDom } = renderAutoForm();
            await waitForDom(() => {
                const autoFormElement = select(AUTO_FORM_SELECTOR);
                expect(autoFormElement).to.be.present();
                expect(autoFormElement).to.be.instanceOf(HTMLFormElement);
                expect(autoFormElement!.hasChildNodes()).to.be.false;
            });
        });

        // TODO:
        // it('renders empty form when schema not found', async () => {
        // });

    });
});
