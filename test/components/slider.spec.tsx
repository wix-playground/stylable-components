import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {ContextProvider} from '../../src';
import {
    AXES, AxisOptions, AxisOptionsKey, CONTINUOUS_STEP,
    getAbsoluteValue,
    getRelativeStep, getRelativeValue, getSizeProperty, getValueFromElementAndPointer, getValueInRange,
    isReverse, isVertical, Slider, SliderProps
} from '../../src/components/slider';
import {ChangeEvent} from '../../src/types/events';
import WindowStub from '../stubs/window.stub';
import {simulateMouseEvent, simulateTouchEvent, skipItIfTouch} from '../utils';

let environment: WindowStub;

interface EventCoordinates {
    clientX: number;
    clientY: number;
}

function getAxis(
    options?: Partial<{axis: AxisOptions, RTL: boolean}>,
    context?: any
) {
    let axis;
    if (!options) {
        return;
    }
    axis = options.axis;
    if (context && context.dir === 'rtl') {
        axis = axis === AXES.x ?
            AXES.xReverse :
            axis === AXES.xReverse ?
                AXES.x :
                axis || AXES.xReverse;
    }

    return axis;
}

function getEventCoordinates(bounds: any, direction: string | undefined, value: number = 0.702): EventCoordinates {
    switch (direction) {
        case AXES.x:
            return {
                clientX: Math.round(bounds.left + bounds.width * value),
                clientY: bounds.top + bounds.height / 3
            };
        case AXES.y:
            return {
                clientX: bounds.left + bounds.width / 3,
                clientY: Math.round(bounds.bottom - bounds.height * value)
            };
        case AXES.xReverse:
            return {
                clientX: Math.round(bounds.left + bounds.width * (1 - value)),
                clientY: bounds.top + bounds.height / 3
            };
        case AXES.yReverse:
            return {
                clientX: bounds.left + bounds.width / 3,
                clientY: Math.round(bounds.bottom - bounds.height * (1 - value))
            };
        default:
            return {
                clientX: Math.round(bounds.left + bounds.width * value),
                clientY: bounds.top + bounds.height / 3
            };
    }
}

function getRenderedSlider(
    clientRenderer: ClientRenderer,
    props?: Partial<SliderProps>,
    context?: any
) {
    const slider = context ?
        (
            <ContextProvider {...context}>
                <Slider
                    {...props}
                />
            </ContextProvider>
        ) :
        (
            <Slider
                {...props}
            />
        );
    return clientRenderer.render(slider);
}

function withValueMinMax(
    clientRenderer: ClientRenderer,
    positionProp: string,
    sizeProp: string,
    orientation: 'vertical' | 'horizontal',
    options?: Partial<SliderProps>,
    context?: any
) {
    describe('with value, min and max', () => {
        const value = 5;
        const min = -10;
        const max = 10;

        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    ...options
                },
                context
            );

            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders handle on the right place', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style[positionProp as any]).to.equal('75%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style[sizeProp as any]).to.equal('75%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('NATIVE-INPUT');

                expect(element).to.has.value(String(value));
            });
        });

        it('renders with proper aria-orientation', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.getAttribute('aria-orientation')).to.equal(orientation);
            });
        });
    });
}

function whenDragThingsAround(
    clientRenderer: ClientRenderer,
    positionProp: string,
    sizeProp: string,
    options?: Partial<SliderProps>,
    context?: any
) {
    describe('when drag things around', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    onChange,
                    onInput,
                    ...options
                },
                context
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });

        it('should change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });

                expect(handle!.style[positionProp as any]).to.equal('70%');
                expect(progress!.style[sizeProp as any]).to.equal('70%');
            });
        });

        it('should call onChange', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onChange).to.be.calledWithMatch({value: 7});
            });
        });

        it('should call onInput', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });
                simulateMouseEvent(
                    environment,
                    'mousemove',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onInput).to.be.calledWithMatch({value: '7'});
                expect(onChange).to.be.calledWithMatch({value: 7});
            });
        });
    });

    describe('when drag things around using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    onChange,
                    onInput,
                    ...options
                },
                context
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });

        skipItIfTouch('should change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });

                expect(handle!.style[positionProp as any]).to.equal('70%');
                expect(progress!.style[sizeProp as any]).to.equal('70%');
            });
        });

        skipItIfTouch('should call onChange', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onChange).to.be.calledWithMatch({value: 7});
            });
        });

        skipItIfTouch('should call onInput', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });
                simulateTouchEvent(
                    environment,
                    'touchmove',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onInput).to.be.calledWithMatch({value: '7'});
                expect(onChange).to.be.calledWithMatch({value: 7});
            });
        });
    });
}

function whenDragThingsAroundWithStep(
    clientRenderer: ClientRenderer,
    positionProp: string,
    sizeProp: string,
    options?: Partial<SliderProps>,
    context?: any
) {
    describe('when drag things around with step', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 2;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    step,
                    onChange,
                    onInput,
                    ...options
                },
                context
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });

        it('renders handle on the right place', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style[positionProp as any]).to.equal('50%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).to.be.present();
                expect(element!.style[sizeProp as any]).to.equal('50%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('NATIVE-INPUT');

                expect(element).to.has.value(String(value));
            });
        });

        it('should change value according to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });

                expect(handle!.style[positionProp as any]).to.equal('80%');
                expect(progress!.style[sizeProp as any]).to.equal('80%');
            });
        });

        it('should call onChange with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onChange).to.be.calledWithMatch({value: 8});
            });
        });

        it('should call onInput with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: eventMock.clientX,
                    clientY: eventMock.clientY
                });
                simulateMouseEvent(
                    environment,
                    'mousemove',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onInput).to.be.calledWithMatch({value: '8'});
                expect(onChange).to.be.calledWithMatch({value: 8});
            });
        });
    });

    describe('when drag things around with step using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 2;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    step,
                    onChange,
                    onInput,
                    ...options
                },
                context
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });

        skipItIfTouch('should change value', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const handle = select('SLIDER-HANDLE');
                const progress = select('SLIDER-PROGRESS');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });

                expect(handle!.style[positionProp as any]).to.equal('80%');
                expect(progress!.style[sizeProp as any]).to.equal('80%');
            });
        });

        skipItIfTouch('should call onChange', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onChange).to.be.calledWithMatch({value: 8});
            });
        });

        skipItIfTouch('should call onInput', async () => {
            await waitFor(() => {
                const element = select('SLIDER');

                simulate.touchStart(element, {
                    currentTarget: element!,
                    touches: {
                        0: {
                            clientX: eventMock.clientX,
                            clientY: eventMock.clientY
                        }
                    } as any as TouchList
                });
                simulateTouchEvent(
                    environment,
                    'touchmove',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                simulateTouchEvent(
                    environment,
                    'touchend',
                    {
                        clientX: eventMock.clientX,
                        clientY: eventMock.clientY
                    }
                );

                expect(onInput).to.be.calledWithMatch({value: '8'});
                expect(onChange).to.be.calledWithMatch({value: 8});
            });
        });
    });
}

function keyboard(
    clientRenderer: ClientRenderer,
    options?: Partial<SliderProps>,
    context?: any
) {
    const step = Number(options && options.step || 1);
    describe(step === 1 ? 'keyboard control' : 'keyboard control with step', () => {
        const value = 50;
        const min = 0;
        const max = 100;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let deviation: number = step;
        let home: number = 0;
        let end: number = 100;

        switch (getAxis(options, context)) {
            case AXES.xReverse:
            case AXES.yReverse:
                deviation = -1 * step;
                home = 100;
                end = 0;
        }

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = getRenderedSlider(
                clientRenderer,
                {
                    value,
                    min,
                    max,
                    onChange,
                    onInput,
                    ...options
                },
                context
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('on pressing right key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).to.be.calledWithMatch({value: value + deviation});
            });
        });

        it('on pressing up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).to.be.calledWithMatch({value: value + deviation});
            });
        });

        it('on pressing page up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page up']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value + Math.abs(deviation * 10)});
            });
        });

        it('on pressing up key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value + (deviation * 10)});
            });
        });

        it('on pressing left key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: home});
            });
        });

        it('on pressing up key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value + (deviation * 10)});
            });
        });

        it('on pressing left key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: home});
            });
        });

        it('on pressing left key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value - deviation});
            });
        });

        it('on pressing down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value - deviation});
            });
        });

        it('on pressing page down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page down']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value - Math.abs(deviation * 10)});
            });
        });

        it('on pressing down key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value - (deviation * 10)});
            });
        });

        it('on pressing right key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: end});
            });
        });

        it('on pressing down key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: value - (deviation * 10)});
            });
        });

        it('on pressing right key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: end});
            });
        });

        it('on pressing home key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.home
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: home});
            });
        });

        it('on pressing end key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.end
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWithMatch({value: end});
            });
        });
    });
}

describe('<Slider />', () => {
    const clientRenderer = new ClientRenderer();

    beforeEach(() => {
        environment = new WindowStub();
    });

    afterEach(() => {
        environment.sandbox.restore();
    });
    afterEach(() => {
        clientRenderer.cleanup();
    });

    describe('without any arguments', () => {
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            const rendered = clientRenderer.render(<Slider />);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('renders default value on the start of the track', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-HANDLE');

                expect(element!.style.left).to.equal('0%');
            });
        });

        it('renders progress bar', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).not.to.be.null;
                expect(element!.style.width).to.equal('0%');
            });
        });

        it('renders invisible native input with default value', async () => {
            await waitForDom(() => {
                const element = select('NATIVE-INPUT');

                expect(element).to.has.value('');
            });
        });
    });

    describe('with min and max and no value', () => {
        const min = -10;
        const max = 10;

        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
            const rendered = clientRenderer.render(
                <Slider
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

                expect(element!.style.left).to.equal('0%');
            });
        });

        it('renders progress bar with the right width', async () => {
            await waitForDom(() => {
                const element = select('SLIDER-PROGRESS');

                expect(element).not.to.be.present();
                expect(element!.style.width).to.equal('0%');
            });
        });

        it('renders invisible native input with right value', async () => {
            await waitForDom(() => {
                const element = select('NATIVE-INPUT');

                expect(element).to.has.value('');
            });
        });
    });

    withValueMinMax(clientRenderer, 'left', 'width', 'horizontal', {});

    describe('when value is out of range', () => {
        const valueLessThenMin = -1;
        const valueGreaterThenMax = 11;
        const min = 0;
        const max = 10;

        it('should normalize value that less than min to min', async () => {
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

        it('should normalize value that greater than max to max', async () => {
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

    describe('when value is out of step', () => {
        const valueOutOfStep = 3;
        const min = 0;
        const max = 10;
        const step = 5;
        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

        beforeEach(() => {
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
                const element = select('NATIVE-INPUT');

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

        it('should call onChange with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
                const bounds = element!.getBoundingClientRect();

                simulate.mouseDown(element, {
                    currentTarget: element!,
                    clientX: Math.round(bounds.left + bounds.width * 0.5)
                });
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {clientX: Math.round(bounds.left + bounds.width * 0.8)}
                );

                expect(onChange).to.be.calledWithMatch({value: 10});
            });
        });

        it('should call onInput with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
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
                    {clientX: Math.round(bounds.left + bounds.width * 0.6)}
                );

                expect(onInput).to.be.calledWithMatch({value: '5'});
                expect(onChange).to.be.calledWithMatch({value: 5});
            });
        });
    });

    describe('when displayStopMarks=true', () => {
        it('renders proper number of marks', async () => {
            const value = 5;
            const min = 0;
            const max = 10;
            const step = 5;
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    displayStopMarks={true}
                />
            );
            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                expect(select(`SLIDER-MARKS-0`)).to.be.present();
                expect(select(`SLIDER-MARKS-1`)).to.be.present();
                expect(select(`SLIDER-MARKS-2`)).to.be.present();
                expect(select(`SLIDER-MARKS-3`)).not.to.be.present();
            });
        });

        it('renders marks on proper places', async () => {
            const value = 5;
            const min = 0;
            const max = 10;
            const step = 2;
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    displayStopMarks={true}
                />
            );
            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                for (let i = 0; i <= 5; i++) {
                    const mark = select(`SLIDER-MARKS-${i}`);
                    expect(mark!.style.left).to.equal(`${20 * i}%`);
                }
            });
        });
    });

    whenDragThingsAround(clientRenderer, 'left', 'width');

    whenDragThingsAroundWithStep(clientRenderer, 'left', 'width');

    keyboard(clientRenderer);

    keyboard(clientRenderer, {step: 2});

    describe('when disabled', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (data: ChangeEvent<number>) => void;
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
                const sliderHandle = select('SLIDER-HANDLE');

                expect(slider!.title).equal(label);
                expect(sliderHandle!.getAttribute('aria-label')).equal(label);
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
                const sliderInput = select('NATIVE-INPUT');

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
                const sliderInput = select('NATIVE-INPUT');

                expect(sliderInput!.required).to.be.true;
            });
        });
    });

    describe('tooltip', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const label = 'Simple Slider Tooltip';

        it('should be presented', async () => {
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    label={label}
                    tooltip={<div data-slot="tooltip" data-automation-id="TOOLTIP-CUSTOM-CONTENT">{label}</div>}
                />
            );
            const select: (automationId: string) => HTMLElement | null = rendered.select;
            const waitForDom: (expectation: () => void) => Promise<void> = rendered.waitForDom;

            await waitForDom(() => {
                const tooltip = select('SLIDER-TOOLTIP');
                const tooltipContent = select('TOOLTIP-CUSTOM-CONTENT');

                expect(tooltip).to.be.present();
                expect(tooltipContent).to.be.present();
                expect(tooltipContent!.innerText).to.equal(label);
            });
        });
    });

    describe('vertical Slider', () => {
        withValueMinMax(
            clientRenderer,
            'bottom',
            'height',
            'vertical',
            {
                axis: AXES.y
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'bottom',
            'height',
            {
                axis: AXES.y
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'bottom',
            'height',
            {
                axis: AXES.y
            }
        );

        keyboard(clientRenderer, {axis: AXES.y});

        keyboard(clientRenderer, {axis: AXES.y, step: 2});
    });

    describe('reverse Slider', () => {
        withValueMinMax(
            clientRenderer,
            'right',
            'width',
            'horizontal',
            {
                axis: AXES.xReverse
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'right',
            'width',
            {
                axis: AXES.xReverse
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'right',
            'width',
            {
                axis: AXES.xReverse
            }
        );

        keyboard(clientRenderer, {axis: AXES.xReverse});

        keyboard(clientRenderer, {axis: AXES.xReverse, step: 2});
    });

    describe('vertical reverse Slider', () => {
        withValueMinMax(
            clientRenderer,
            'top',
            'height',
            'vertical',
            {
                axis: AXES.yReverse
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'top',
            'height',
            {
                axis: AXES.yReverse
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'top',
            'height',
            {
                axis: AXES.yReverse
            }
        );

        keyboard(clientRenderer, {axis: AXES.yReverse});

        keyboard(clientRenderer, {axis: AXES.yReverse, step: 2});
    });

    describe('RTL Slider', () => {
        withValueMinMax(
            clientRenderer,
            'right',
            'width',
            'horizontal',
            {},
            {dir: 'rtl'}
        );

        whenDragThingsAround(
            clientRenderer,
            'right',
            'width',
            {},
            {dir: 'rtl'}
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'right',
            'width',
            {},
            {dir: 'rtl'}
        );

        keyboard(clientRenderer, {}, {dir: 'rtl'});

        keyboard(clientRenderer, {step: 2}, {dir: 'rtl'});
    });
});

describe('Slider/calculations', () => {
    function testMethod(fn: (prop: any) => any, results: {[key: string]: any}) {
        Object.keys(results).forEach(key => {
            it(`${key} => ${results[key]}`, () => {
                expect(fn(AXES[key as AxisOptionsKey])).to.equal(results[key]);
            });
        });
    }

    describe('isVertical()', () => {
        const results = {
            x: false,
            xReverse: false,
            y: true,
            yReverse: true
        };
        testMethod(isVertical, results);
    });

    describe('getSizeProperty()', () => {
        const results = {
            x: 'width',
            xReverse: 'width',
            y: 'height',
            yReverse: 'height'
        };
        testMethod(getSizeProperty, results);
    });

    describe('isReverse()', () => {
        const results = {
            x: false,
            xReverse: true,
            y: false,
            yReverse: true
        };
        testMethod(isReverse, results);
    });

    describe('getRelativeStep()', () => {
        it('no step => CONTINUOUS_STEP', () => {
            expect(getRelativeStep(undefined, 1, 2)).to.equal(CONTINUOUS_STEP);
        });
        it('CONTINUOUS_STEP => CONTINUOUS_STEP', () => {
            expect(getRelativeStep(CONTINUOUS_STEP, 1, 2)).to.equal(CONTINUOUS_STEP);
        });
        it('(step = 1, min = 0, max = 10) => 10', () => {
            expect(getRelativeStep(1, 0, 10)).to.equal(10);
        });
        it('(step = 1, min = 5, max = 10) => 20', () => {
            expect(getRelativeStep(1, 5, 10)).to.equal(20);
        });
    });

    describe('getRelativeValue()', () => {
        it('(value = 10, min = 5, max = 15) => 50', () => {
            expect(getRelativeValue(10, 5, 15)).to.equal(50);
        });
        it('(value = 0, min = 5, max = 15) => 0', () => {
            expect(getRelativeValue(0, 5, 15)).to.equal(0);
        });
        it('(value = 20, min = 5, max = 15) => 100', () => {
            expect(getRelativeValue(20, 5, 15)).to.equal(100);
        });
    });

    describe('getAbsoluteValue()', () => {
        it('(value = 25, min = 1, max = 5) => 2', () => {
            expect(getAbsoluteValue(25, 1, 5)).to.equal(2);
        });
        it('(value = 0, min = 1, max = 5) => 1', () => {
            expect(getAbsoluteValue(0, 1, 5)).to.equal(1);
        });
        it('(value = 100, min = 1, max = 5) => 5', () => {
            expect(getAbsoluteValue(100, 1, 5)).to.equal(5);
        });
        it('(value = 150, min = 1, max = 5) => 5', () => {
            expect(getAbsoluteValue(150, 1, 5)).to.equal(5);
        });
    });

    describe('getValueInRange()', () => {
        it('(value = 0, min = 10, max = 20) => 10', () => {
            expect(getValueInRange(0, 10, 20)).to.equal(10);
        });
        it('(value = 15, min = 10, max = 20) => 15', () => {
            expect(getValueInRange(15, 10, 20)).to.equal(15);
        });
        it('(value = 25, min = 10, max = 20) => 20', () => {
            expect(getValueInRange(25, 10, 20)).to.equal(20);
        });
    });

    describe('getValueFromElementAndPointer()', () => {
        function testCase(opts: {[key: string]: any}) {
            const name = Object.keys(opts).map(key => `${key} = ${opts[key]}`).join(', ');
            let elem: any;

            before(() => {
                elem = document.createElement('div');
                elem.style.width = opts.width + 'px';
                elem.style.height = opts.height + 'px';
                elem.style.left = 0;
                elem.style.top = 0;
                elem.style.position = 'absolute';
                document.body.appendChild(elem);
            });

            after(() => {
                document.body.removeChild(elem);
            });

            it(name, () => {
                const event = {
                    clientX: opts.clientX,
                    clientY: opts.clientY
                };
                const args = [
                    elem,
                    event,
                    opts.step,
                    opts.vertically,
                    opts.reversed
                ];
                expect(getValueFromElementAndPointer.apply(null, args)).to.equal(opts.result);
            });
        }

        testCase({
            width: 20,
            height: 10,
            clientX: 5,
            clientY: 5,
            step: 1,
            vertically: false,
            reversed: false,
            result: 25
        });

        testCase({
            width: 20,
            height: 10,
            clientX: 5,
            clientY: 2,
            step: 1,
            vertically: true,
            reversed: false,
            result: 80
        });

        testCase({
            width: 20,
            height: 10,
            clientX: 5,
            clientY: 5,
            step: 1,
            vertically: false,
            reversed: true,
            result: 75
        });
        testCase({
            width: 20,
            height: 10,
            clientX: 5,
            clientY: 2,
            step: 1,
            vertically: true,
            reversed: true,
            result: 20
        });
        testCase({
            width: 20,
            height: 10,
            clientX: 25,
            clientY: 5,
            step: 1,
            vertically: false,
            reversed: false,
            result: 100
        });
        testCase({
            width: 20,
            height: 10,
            clientX: -1,
            clientY: 5,
            step: 1,
            vertically: false,
            reversed: false,
            result: 0
        });
        testCase({
            width: 20,
            height: 10,
            clientX: 0,
            clientY: 100,
            step: 1,
            vertically: true,
            reversed: false,
            result: 0
        });
        testCase({
            width: 20,
            height: 10,
            clientX: 0,
            clientY: -100,
            step: 1,
            vertically: true,
            reversed: false,
            result: 100
        });
    });

});
