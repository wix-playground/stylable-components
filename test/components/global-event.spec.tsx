import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {SinonMock} from 'sinon';
import { ClientRenderer, expect, simulate, sinon } from 'test-drive-react';
import GlobalEvent from '../../src/common/global-event';

describe('<GlobalEvent />', () => {
    const clientRenderer = new ClientRenderer();
    let emitterMock: SinonMock;
    let container: HTMLElement;

    beforeEach(() => emitterMock = sinon.mock(window));
    beforeEach(() => {
        container = document.createElement('div');
        container.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0;');
        document.body.appendChild(container);
    });

    afterEach(() => emitterMock.restore());
    afterEach(() => document.body.removeChild(container));

    afterEach(() => clientRenderer.cleanup());

    describe('mount', () => {
        it('should add an event listener on window object when mounted', async () => {
            const event = 'click';
            const handler = () => {};

            emitterMock.expects('addEventListener').once();

            render(
                <GlobalEvent event={event} handler={handler} />,
                container
            );

            emitterMock.verify();
        });
    });

    describe('unmount', () => {
        it('should remove an event listener on window object when unmounted', async () => {
            const event = 'click';
            const handler = () => {};

            emitterMock.expects('removeEventListener').once();

            render(
                <GlobalEvent event={event} handler={handler} />,
                container
            );

            unmountComponentAtNode(container);

            emitterMock.verify();
        });
    });

});
