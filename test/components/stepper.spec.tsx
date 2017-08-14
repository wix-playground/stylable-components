import * as React from 'react';
import {SinonSpy} from 'sinon';
import { ClientRenderer, expect, simulate, sinon } from 'test-drive-react';
import { Stepper } from '../../src/components/stepper';
import WindowStub from '../stubs/window.stub';

describe('<Stepper />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    describe('draggable', () => {
        let windowStub: WindowStub;
        let onUp: SinonSpy;
        let onDown: SinonSpy;

        beforeEach(() => {
            onUp = sinon.spy();
            onDown = sinon.spy();
            windowStub = new WindowStub();
        });

        afterEach(() => windowStub.sandbox.restore());

        describe('drag up', () => {

            it('should call onUp', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const { waitForDom, select } = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), dragStartPoint);
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY - dragStep
                    });

                    expect(onUp).to.have.been.calledOnce;
                    expect(onDown).not.to.have.been.called;
                });
            });

            it('should not call onUp when disableUp is true', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const { waitForDom, select } = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                        disableUp
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), dragStartPoint);
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY - dragStep
                    });

                    expect(onUp).not.to.have.been.called;
                    expect(onDown).not.to.have.been.called;
                });
            });

        });

        describe('drag down', () => {

            it('should call onDown', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const { waitForDom, select } = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), dragStartPoint);
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY + dragStep
                    });

                    expect(onUp).not.to.have.been.called;
                    expect(onDown).to.have.been.calledOnce;
                });
            });

            it('should not call onDown when disableDown is true', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const { waitForDom, select } = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                        disableDown
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), dragStartPoint);
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY + dragStep
                    });

                    expect(onUp).not.to.have.been.called;
                    expect(onDown).not.to.have.been.called;
                });
            });
        });

        describe('drag stop', () => {

            it('should stop calling onUp/onDown', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const { waitForDom, select } = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), { clientX: 100, clientY: 100 });
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY - dragStep
                    });
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY + dragStep
                    });
                    windowStub.simulate('mouseup');
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY - dragStep
                    });
                    windowStub.simulate('mousemove', {
                        clientX: dragStartPoint.clientX,
                        clientY: dragStartPoint.clientY + dragStep
                    });

                    expect(onUp).to.have.been.calledOnce;
                    expect(onDown).to.have.been.calledOnce;
                });
            });

        });

    });

});
