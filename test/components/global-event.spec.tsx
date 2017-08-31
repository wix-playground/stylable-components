import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {expect, sinon} from 'test-drive-react';
import GlobalEvent, {Props as GlobalEventProps} from '../../src/common/global-event';
import WindowStub from '../stubs/window.stub';

describe('<GlobalEvent />', () => {
    let windowStub: WindowStub;
    let container: HTMLElement;

    beforeEach(() => windowStub = new WindowStub());
    beforeEach(() => {
        container = document.createElement('div');
        container.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0;');
        document.body.appendChild(container);
    });

    afterEach(() => windowStub.sandbox.restore());
    afterEach(() => {
        unmountComponentAtNode(container);
        document.body.removeChild(container);
    });

    describe('mount', () => {
        it('should add an event listener on window object when mounted', async () => {
            const handler = () => {};

            render(
                <GlobalEvent click={handler} />,
                container
            );

            expect(windowStub.addEventListener).to.have.been.calledOnce;
        });
    });

    describe('unmount', () => {
        it('should remove an event listener on window object when unmounted', async () => {
            const handler = () => {};

            render(
                <GlobalEvent click={handler} />,
                container
            );

            unmountComponentAtNode(container);

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

            const fixture = render(
                <Fixture listener={originalListener} />, container
            ) as Fixture;
            fixture.setState({listener: undefined});

            windowStub.simulate('click');

            expect(originalListener).not.to.have.been.called;
        });

        it('should call new handler but not the old one', () => {
            const originalListener = sinon.spy();
            const newListener = sinon.spy();

            const fixture = render(
                <Fixture listener={originalListener} />, container
            ) as Fixture;
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

            render(
                <GlobalEvent mousedown={onMouseDown} mousemove={onMouseMove} mouseup={onMouseUp} />,
                container
            );

            windowStub.simulate('mousedown');
            windowStub.simulate('mousemove');
            windowStub.simulate('mouseup');

            expect(onMouseDown).to.have.been.calledBefore(onMouseMove);
            expect(onMouseMove).to.have.been.calledBefore(onMouseUp);
        });
    });

});
