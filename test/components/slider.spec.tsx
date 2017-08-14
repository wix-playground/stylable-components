import * as keycode from 'keycode';
import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { Slider } from '../../src/components/slider';

function simulateMouseEvent(element: Element, eventType: string, options?: object) {
    element.dispatchEvent(new MouseEvent(
        eventType,
        options as any as EventInit
    ));
}
function simulateTouchEvent(
    element: Element,
    eventType: string,
    options: {
        x: number,
        y: number
    }
) {
    const TouchConstructor: any = Touch;
    const touchObj = new TouchConstructor({
        identifier: Date.now(),
        target: element,
        clientX: options.x,
        clientY: options.y,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5
    });

    element.dispatchEvent(new TouchEvent(
        eventType,
        {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj],
            shiftKey: false
        } as any as EventInit
    ));
}

describe('<Slider />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    describe('without any arguments', () => {
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            const rendered = clientRenderer.render(<Slider />);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders default value on the middle of the track', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('50%');
            });
        });

        it('renders progress bar', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style.width).to.equal('50%');
            });
        });

        it('renders invisible native input with default value', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-NATIVE-INPUT');

                expect(element).to.be.present();
                expect(element).to.has.value('50');
            });
        });
    });

    describe('with value, min and max', () => {
        const value = 5;
        const min = -10;
        const max = 10;

        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders handle on the right place', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('75%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style.width).to.equal('75%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-NATIVE-INPUT');

                expect(element).to.be.present();
                expect(element).to.has.value(String(value));
            });
        });
    });

    describe('when value is out of range', () => {
        const valueLessThenMin = -1;
        const valueGreaterThenMax = 11;
        const min = 0;
        const max = 10;

        it('should normilize value that less than min to min', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={valueLessThenMin}
                    min={min}
                    max={max}
                />
            );

            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom = rendered.waitForDom;

            await waitForDom(() => {
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                expect(handle!.style.left).to.equal('0%');
                expect(progress!.style.width).to.equal('0%');
            });
        });

        it('should normilize value that greater than max to max', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={valueGreaterThenMax}
                    min={min}
                    max={max}
                />
            );

            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom = rendered.waitForDom;

            await waitForDom(() => {
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                expect(handle!.style.left).to.equal('100%');
                expect(progress!.style.width).to.equal('100%');
            });
        });
    });

    // Mouse
    describe('when drag things around', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('should change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientY: bounds.top + bounds.height / 3,
                    clientX: Math.round(bounds.left + bounds.width * 0.7)
                });

                expect(handle!.style.left).to.equal('70%');
                expect(progress!.style.width).to.equal('70%');
            });
        });

        it('should call onChange', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {clientX: Math.round(bounds.left + bounds.width * 0.7)}
                );

                expect(onChange).to.be.calledWith(7);
            });
        });

        it('should call onInput', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mousemove',
                    {clientX: Math.round(bounds.left + bounds.width * 0.6)}
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    { clientX: Math.round(bounds.left + bounds.width * 0.7) }
                );

                expect(onInput).to.be.calledWith('6');
                expect(onChange).to.be.calledWith(7);
            });
        });
    });

    describe('dragging with step', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 1;
        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();

            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );

            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders handle on the right place', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('50%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style.width).to.equal('50%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-NATIVE-INPUT');

                expect(element).to.be.present();
                expect(element).to.has.value(String(value));
            });
        });

        it('should change value according to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientY: bounds.top + bounds.height / 3,
                    clientX: Math.round(bounds.left + bounds.width * 0.77)
                });

                expect(handle!.style.left).to.equal('80%');
                expect(progress!.style.width).to.equal('80%');
            });
        });

        it('should call onChange with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    { clientX: Math.round(bounds.left + bounds.width * 0.77) }
                );

                expect(onChange).to.be.calledWith(8);
            });
        });

        it('should call onInput with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mousemove',
                    { clientX: Math.round(bounds.left + bounds.width * 0.56) }
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    { clientX: Math.round(bounds.left + bounds.width * 0.66) }
                );

                expect(onInput).to.be.calledWith('6');
                expect(onChange).to.be.calledWith(7);
            });
        });
    });
    // Mouse
    describe('when drag things around using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('should change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.7)
                        }
                    } as any as TouchList
                });

                expect(handle!.style.left).to.equal('70%');
                expect(progress!.style.width).to.equal('70%');
            });
        });

        it('should call onChange', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.7)
                        }
                    } as any as TouchList
                });

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.7)
                    }
                );

                expect(onChange).to.be.calledWith(7);
            });
        });

        it('should call onInput', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.7)
                        }
                    } as any as TouchList
                });
                simulateTouchEvent(
                    environment,
                    'touchmove',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.7)
                    }
                );

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.7)
                    }
                );

                expect(onInput).to.be.calledWith('7');
                expect(onChange).to.be.calledWith(7);
            });
        });
    });

    describe('touch dragging with step', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 1;
        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();

            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );

            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders handle on the right place', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('50%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style.width).to.equal('50%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-NATIVE-INPUT');

                expect(element).to.be.present();
                expect(element).to.has.value(String(value));
            });
        });

        it('should change value according to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.77)
                        }
                    } as any as TouchList
                });

                expect(handle!.style.left).to.equal('80%');
                expect(progress!.style.width).to.equal('80%');
            });
        });

        it('should call onChange with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.7)
                        }
                    } as any as TouchList
                });

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.77)
                    }
                );

                expect(onChange).to.be.calledWith(8);
            });
        });

        it('should call onInput with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientY: bounds.top + bounds.height / 3,
                            clientX: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    } as any as TouchList
                });
                simulateTouchEvent(
                    environment,
                    'touchmove',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.56)
                    }
                );

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        y: bounds.top + bounds.height / 3,
                        x: Math.round(bounds.left + bounds.width * 0.67)
                    }
                );

                expect(onInput).to.be.calledWith('6');
                expect(onChange).to.be.calledWith(7);
            });
        });
    });

    describe('keyboard control', () => {
        const value = 50;
        const min = 0;
        const max = 100;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('on pressing up key', async () => {
            simulate.keyDown(select('SLIDER'), {
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(51);
            });
        });

        it('on pressing page up key', async () => {
            simulate.keyDown(select('SLIDER'), {
                keyCode: keycode.codes['page up']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(51);
            });
        });

        it('on pressing up key with shift', async () => {
            simulate.keyDown(select('SLIDER'), {
                shiftKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(60);
            });
        });

        it('on pressing page up key with shift', async () => {
            simulate.keyDown(select('SLIDER'), {
                shiftKey: true,
                keyCode: keycode.codes['page up']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(60);
            });
        });

        it('on pressing down key', async () => {
            simulate.keyDown(select('SLIDER'), {
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(49);
            });
        });

        it('on pressing page down key', async () => {
            simulate.keyDown(select('SLIDER'), {
                keyCode: keycode.codes['page down']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(49);
            });
        });

        it('on pressing down key with shift', async () => {
            simulate.keyDown(select('SLIDER'), {
                shiftKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing page down key with shift', async () => {
            simulate.keyDown(select('SLIDER'), {
                shiftKey: true,
                keyCode: keycode.codes['page down']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing home key', async () => {
            simulate.keyDown(select('SLIDER'), {
                keyCode: keycode.codes.home
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing end key', async () => {
            simulate.keyDown(select('SLIDER'), {
                shiftKey: true,
                keyCode: keycode.codes.end
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });
    });

    describe('when value is out of step', () => {
        const valueOutOfStep = 3;
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 5;
        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let environment: Element;

        beforeEach(() => {
            environment = document.createElement('body');
            onChange = sinon.spy();
            onInput = sinon.spy();

            const rendered = clientRenderer.render(
                <Slider
                    value={valueOutOfStep}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                    onInput={onInput}
                    environment={environment}
                />
            );

            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders handle ignoring step', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('30%');
            });
        });

        it('renders progress bar ignoring step', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style.width).to.equal('30%');
            });
        });

        it('renders invisible native input with passed value', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-NATIVE-INPUT');

                expect(element).to.be.present();
                expect(element).to.has.value(String(valueOutOfStep));
            });
        });

        it('should change value according to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientY: bounds.top + bounds.height / 3,
                    clientX: Math.round(bounds.left + bounds.width * 0.4)
                });

                expect(handle!.style.left).to.equal('50%');
                expect(progress!.style.width).to.equal('50%');
            });
        });

        it('should call onChange with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    { clientX: Math.round(bounds.left + bounds.width * 0.8) }
                );

                expect(onChange).to.be.calledWith(10);
            });
        });

        it('should call onInput with value normilized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mousemove',
                    { clientX: Math.round(bounds.left + bounds.width * 0.6) }
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    { clientX: Math.round(bounds.left + bounds.width * 0.6) }
                );

                expect(onInput).to.be.calledWith('5');
                expect(onChange).to.be.calledWith(5);
            });
        });
    });

    describe('when disabled', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (value: number) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            onChange = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    disabled={true}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('should not change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientY: bounds.top + bounds.height / 3,
                    clientX: bounds.left + bounds.width / 4
                });

                expect(handle!.style.left).not.to.equal('25%');
                expect(progress!.style.width).not.to.equal('25%');
            });
        });
    });

    describe('when label provided', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const label = 'Simple Slider';

        it('slider should has title and aria-label equal to passed label value', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    label={label}
                />
            );
            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                const slider = select('SLIDER');

                expect(slider!.title).equal(label);
                expect(slider!.getAttribute('aria-label')).equal(label);
            });
        });
    });

    describe('when name provided', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const name = 'Simple Slider';

        it('native input should has name equal to passed name value', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    name={name}
                />
            );
            const select: (automationId: string) => HTMLInputElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                const sliderInput = select('SLIDER-NATIVE-INPUT');

                expect(sliderInput!.name).equal(name);
            });
        });
    });

    describe('when it is required', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        it('native input should has required attribute equal to true', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    required={true}
                />
            );
            const select: (automationId: string) => HTMLInputElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                const sliderInput = select('SLIDER-NATIVE-INPUT');

                expect(sliderInput!.required).to.be.true;
            });
        });
    });

    describe('when in error state', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        it('should apply Error custom state', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    error={true}
                />
            );

            const select = rendered.select;
            const waitForDom = rendered.waitForDom;

            await waitForDom(() => {
                const root = select('SLIDER-CONTAINER') as HTMLElement;
                const errorAttributeName = Object.keys(root!.dataset)
                    .filter(
                        attribute => attribute.match(/error$/i)
                    )[0];
                const errorAttributeValue = root!.dataset[errorAttributeName];

                expect(errorAttributeValue).to.equal('true');
            });
        });
    });

});
