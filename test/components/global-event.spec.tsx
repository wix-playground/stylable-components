import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import { ClientRenderer, expect, simulate, sinon } from 'test-drive-react';
import GlobalEvent from '../../src/common/global-event';
import WindowStub from '../stubs/window.stub';

describe('<GlobalEvent />', () => {
    const clientRenderer = new ClientRenderer();
    let windowStub: WindowStub;
    let container: HTMLElement;

    beforeEach(() => windowStub = new WindowStub());
    beforeEach(() => {
        container = document.createElement('div');
        container.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0;');
        document.body.appendChild(container);
    });

    afterEach(() => windowStub.sandbox.restore());
    afterEach(() => document.body.removeChild(container));

    afterEach(() => clientRenderer.cleanup());

    describe('mount', () => {
        it('should add an event listener on window object when mounted', async () => {
            const event = 'click';
            const handler = () => {};

            render(
                <GlobalEvent event={event} handler={handler} />,
                container
            );

            expect(windowStub.addEventListener).to.have.been.calledOnce;
        });
    });

    describe('unmount', () => {
        it('should remove an event listener on window object when unmounted', async () => {
            const event = 'click';
            const handler = () => {};

            render(
                <GlobalEvent event={event} handler={handler} />,
                container
            );

            unmountComponentAtNode(container);

            expect(windowStub.removeEventListener).to.have.been.calledOnce;
        });
    });

    describe('passing event prop', () => {
        it('should remove listener for old event and add listener to the new one', () => {
            const originalEvent = 'original.event';
            const newEvent = 'new.event';

            class Fixture extends React.Component<{}, {event: string, handler: () => void}> {

                public state = {event: originalEvent, handler: () => {}};

                public render() {
                    const {event, handler} = this.state;
                    return <GlobalEvent event={event} handler={handler} />;
                }
            }

            const fixture = render(<Fixture />, container) as Fixture;

            fixture.setState({event: newEvent});

            expect(windowStub.removeEventListener).to.have.been.calledWith(originalEvent);
            expect(windowStub.addEventListener).to.have.been.calledWith(newEvent);
        });
    });

    describe('passing handler props', () => {
        it('should call new handler but not the old one', () => {
            const originalEvent = 'event';
            const originalHandler = sinon.spy();
            const newHandler = sinon.spy();

            class Fixture extends React.Component<{}, {event: string, handler: () => void}> {

                public state = {event: originalEvent, handler: originalHandler};

                public render() {
                    const {event, handler} = this.state;
                    return <GlobalEvent event={event} handler={handler} />;
                }
            }

            const fixture = render(<Fixture />, container) as Fixture;
            fixture.setState({handler: newHandler});

            windowStub.simulate(originalEvent);

            expect(originalHandler).not.to.have.been.called;
            expect(newHandler).to.have.been.calledOnce;
        });
    });

});
