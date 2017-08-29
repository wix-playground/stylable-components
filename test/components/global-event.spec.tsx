import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {expect, sinon} from 'test-drive-react';
import GlobalEvent from '../../src/common/global-event';
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
    afterEach(() => document.body.removeChild(container));

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

    describe('passing handler props', () => {
        it('should call new handler but not the old one', () => {
            const originalHandler = sinon.spy();
            const newHandler = sinon.spy();

            class Fixture extends React.Component<{}, {handler: () => void}> {

                public state = {handler: originalHandler};

                public render() {
                    const {handler} = this.state;
                    return <GlobalEvent click={handler} />;
                }
            }

            const fixture = render(<Fixture />, container) as Fixture;
            fixture.setState({handler: newHandler});

            windowStub.simulate('click');

            expect(originalHandler).not.to.have.been.called;
            expect(newHandler).to.have.been.calledOnce;
        });
    });

});
