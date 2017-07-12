import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { Link } from '../../src';

describe('<Link />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup())

    it('outputs an anchor element with the provided href and content', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<Link href="http://some-url.com/" data-automation-id="LINK">Link content</Link>);

        await waitForDom(() => {
            const link = select('LINK');
            expect(link).to.be.present();
            expect(link).to.be.instanceOf(HTMLAnchorElement);
            expect(link).to.have.attribute('href', 'http://some-url.com/');
            expect(link).to.contain.text('Link content');
        });
    });
});
