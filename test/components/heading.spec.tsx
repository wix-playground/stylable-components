import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { Heading } from '../../src';

describe('<Heading />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup())

    it('outputs an <h1 /> element by default', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<Heading data-automation-id="HEADING">Test heading</Heading>);

        await waitForDom(() => {
            const heading = select<HTMLHeadingElement>('HEADING');
            expect(heading).to.be.present();
            expect(heading).to.be.instanceOf(HTMLHeadingElement);
            expect(heading!.tagName).to.equal('H1');
            expect(heading).to.contain.text('Test heading');
        });
    });

    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].forEach((headingType: any) => {
        it(`outputs an <${headingType.toLowerCase()}> when provided with type="${headingType}"`, async () => {
            const { select, waitForDom } =
                clientRenderer.render(<Heading data-automation-id="HEADING" type={headingType}>Test heading</Heading>);

            await waitForDom(() => expect(select('HEADING')!.tagName).to.equal(headingType));
        });

    });

});
