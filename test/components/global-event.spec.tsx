import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon } from 'test-drive-react';
import GlobalEvent from '../../src/common/global-event';

describe('<GlobalEvent />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('should exist', () => {
        expect(GlobalEvent).to.exist;
    });

    describe('mounting', () => {
        it('should call the handler with corresponding event', async () => {
            const handler = sinon.spy();
            const {waitForDom} = clientRenderer.render(
                <GlobalEvent event="click" handler={handler} />
            );

            await waitForDom(() => {
                simulate.click(document.body);
                expect(handler).to.have.been.called;
            });
        });
    });
});
