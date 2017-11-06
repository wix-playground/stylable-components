import * as React from 'react';
import {SinonSpy} from 'sinon';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';
import {Stepper} from '../../src/components/stepper';
import {WindowStub} from '../../test-kit';

xdescribe('<Stepper />', () => {
    const clientRenderer = new ClientRenderer();
    let windowStub: WindowStub;
    let onUp: SinonSpy;
    let onDown: SinonSpy;

    beforeEach(() => {
        onUp = sinon.spy();
        onDown = sinon.spy();
        windowStub = new WindowStub();
    });

    afterEach(() => windowStub.sandbox.restore());
    afterEach(() => clientRenderer.cleanup());

    it('onUp and onDown should pass modifiers if any', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Stepper onUp={onUp} onDown={onDown} />
        );

        await waitForDom(() => {
            const up = select('STEPPER_INCREMENT');
            const down = select('STEPPER_DECREMENT');

            simulate.click(up, {shiftKey: true});
            simulate.click(down, {altKey: true, ctrlKey: true});

            expect(onUp).to.have.been.calledWithMatch({shiftKey: true});
            expect(onDown).to.have.been.calledWithMatch({altKey: true, ctrlKey: true});
        });
        });

    describe('draggable', () => {

        describe('drag up', () => {

            it('should call onUp', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const {waitForDom, select} = clientRenderer.render(
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
                        clientY: dragStartPoint.clientY - dragStep,
                        shiftKey: true
                    });

                    expect(onUp).to.have.been.calledOnce;
                    expect(onUp).to.have.been.calledWithMatch({shiftKey: true});
                    expect(onDown).not.to.have.been.called;
                });
            });

            it('should not call onUp when disableUp is true', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const {waitForDom, select} = clientRenderer.render(
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
                const {waitForDom, select} = clientRenderer.render(
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
                        clientY: dragStartPoint.clientY + dragStep,
                        altKey: true,
                        ctrlKey: true
                    });

                    expect(onUp).not.to.have.been.called;
                    expect(onDown).to.have.been.calledOnce;
                    expect(onDown).to.have.been.calledWithMatch({altKey: true, ctrlKey: true});
                });
            });

            it('should not call onDown when disableDown is true', async () => {
                const dragStep = 20;
                const dragStartPoint = {
                    clientX: 100,
                    clientY: 100
                };
                const {waitForDom, select} = clientRenderer.render(
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
                const {waitForDom, select} = clientRenderer.render(
                    <Stepper
                        data-automation-id="STEPPER"
                        onUp={onUp}
                        onDown={onDown}
                        dragStep={dragStep}
                    />
                );

                await waitForDom(() => {
                    simulate.mouseDown(select('STEPPER'), {clientX: 100, clientY: 100});
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
