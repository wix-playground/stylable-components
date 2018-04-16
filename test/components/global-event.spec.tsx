import * as React from 'react';
import {ClientRenderer, expect, sinon} from 'test-drive-react';
import {GlobalEvent, GlobalEventCapture, GlobalEventProps} from '../../src';
import {WindowStub} from '../../test-kit';

describe('<GlobalEvent />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    let windowStub: WindowStub;
    beforeEach(() => windowStub = new WindowStub());
    afterEach(() => windowStub.sandbox.restore());

    describe('mount', () => {
        it('should add an event listener on window object when mounted', () => {
            const handler = () => {};

            clientRenderer.render(
                <GlobalEvent click={handler} />
            );

            expect(windowStub.addEventListener).to.have.been.calledOnce;
        });
    });

    describe('unmount', () => {
        it('should remove an event listener on window object when unmounted', () => {
            const handler = () => {};

            clientRenderer.render(
                <GlobalEvent click={handler} />
            );

            clientRenderer.cleanup();

            expect(windowStub.removeEventListener).to.have.been.calledOnce;
        });
    });

    describe('changing a listener', () => {
        class Fixture extends React.Component<
            {listener: GlobalEventProps['click']},
            {listener: GlobalEventProps['click']}
        > {
            constructor({listener}: {listener: EventListener}) {
                super();
                this.state = {listener};
            }
            public render() {
                const {listener} = this.state;
                return <GlobalEvent click={listener} />;
            }
        }

        it('should not call a handler after it was unset', () => {
            const originalListener = sinon.spy();

            const fixture = clientRenderer.render(
                <Fixture listener={originalListener} />
            ).result as Fixture;
            fixture.setState({listener: undefined});

            windowStub.simulate('click');

            expect(originalListener).not.to.have.been.called;
        });

        it('should call new handler but not the old one', () => {
            const originalListener = sinon.spy();
            const newListener = sinon.spy();

            const fixture = clientRenderer.render(
                <Fixture listener={originalListener} />
            ).result as Fixture;
            fixture.setState({listener: newListener});

            windowStub.simulate('click');

            expect(originalListener).not.to.have.been.called;
            expect(newListener).to.have.been.calledOnce;
        });

    });

    describe('listening to multiple events', () => {
        it('should call all appropriate handlers', () => {
            const onMouseDown = sinon.spy();
            const onMouseMove = sinon.spy();
            const onMouseUp = sinon.spy();

            clientRenderer.render(
                <GlobalEvent
                    mousedown={onMouseDown}
                    mousemove={onMouseMove}
                    mouseup={onMouseUp}
                />
            );

            windowStub.simulate('mousedown');
            windowStub.simulate('mousemove');
            windowStub.simulate('mouseup');

            expect(onMouseDown).to.have.been.calledBefore(onMouseMove);
            expect(onMouseMove).to.have.been.calledBefore(onMouseUp);
        });
    });

    describe('<GlobalEventCapture/>', () => {
        it('should listen to capture phase', () => {
            const onMouseUp = sinon.spy();

            clientRenderer.render(
                <GlobalEventCapture
                    mouseup={onMouseUp}
                />
            );

            windowStub.simulateCapture('mouseup');
            expect(onMouseUp).to.have.been.called;
        });
        it('should not listen to bubbling phase', () => {
            const onMouseUp = sinon.spy();

            clientRenderer.render(
                <GlobalEventCapture
                    mouseup={onMouseUp}
                />
            );

            windowStub.simulate('mouseup');
            expect(onMouseUp).to.not.been.called;
        });
    });

});
