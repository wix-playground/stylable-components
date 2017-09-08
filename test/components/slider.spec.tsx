import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {Slider, SliderProps} from '../../src/components/slider';
import {ChangeEvent} from '../../src/types/events';
import WindowStub from '../stubs/window.stub';
import {simulateMouseEvent, simulateTouchEvent} from '../utils';
import {describeIfTouch} from '../utils/skip-describe-if-touch';

let environment: WindowStub;

interface EventCoordinates {
    clientX: number;
    clientY: number;
}

function getEventCoordinates(bounds: any, direction: string | undefined, value: number = 0.7): EventCoordinates {
    switch (direction) {
        case 'x':
            return {
                clientX: Math.round(bounds.left + bounds.width * value),
                clientY: bounds.top + bounds.height / 3
            };
        case 'y':
            return {
                clientX: bounds.left + bounds.width / 3,
                clientY: Math.round(bounds.bottom - bounds.height * value)
            };
        case 'x-reverse':
            return {
                clientX: Math.round(bounds.left + bounds.width * (1 - value)),
                clientY: bounds.top + bounds.height / 3
            };
        case 'y-reverse':
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

function withValueMinMax(
    clientRenderer: ClientRenderer,
    positionProp: string,
    sizeProp: string,
    orientation: 'vertical' | 'horizontal',
    options?: Partial<SliderProps>
) {
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
                    {...options}
                />
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
                const element = select('SLIDER-NATIVE-INPUT');

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
    options?: Partial<SliderProps>
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
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    {...options}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, options && options.axis);
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

    describeIfTouch('when drag things around using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(function() {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    {...options}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, options && options.axis);
        });

        it('should change value', async () => {
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

        it('should call onChange', async () => {
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

        it('should call onInput', async () => {
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
    options?: Partial<SliderProps>
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
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                    onInput={onInput}
                    {...options}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, options && options.axis, 0.75);
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
                const element = select('SLIDER-NATIVE-INPUT');

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

    describeIfTouch('when drag things around with step using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 2;

        let onChange: (data: ChangeEvent<number>) => void;
        let onInput: (data: ChangeEvent<string>) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;
        let eventMock: EventCoordinates;

        beforeEach(function() {
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
                    {...options}
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;

            const bounds = select('SLIDER')!.getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, options && options.axis);
        });

        it('should change value', async () => {
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

        it('should call onChange', async () => {
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

        it('should call onInput', async () => {
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
    options?: Partial<SliderProps>
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

        switch (options && options.axis) {
            case 'x-reverse':
            case 'y-reverse':
                deviation = -1 * step;
                home = 100;
                end = 0;
        }

        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            const rendered = clientRenderer.render(
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    onInput={onInput}
                    {...options}
                />
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
                const element = select('SLIDER-NATIVE-INPUT');

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
                const element = select('SLIDER-NATIVE-INPUT');

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
                const element = select('SLIDER-NATIVE-INPUT');

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

    describe('when marks=true', () => {
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
                    marks={true}
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
                    marks={true}
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
                >
                    <div data-slot="tooltip" data-automation-id="TOOLTIP-CUSTOM-CONTENT">{label}</div>
                </Slider>
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
                axis: 'y'
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'bottom',
            'height',
            {
                axis: 'y'
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'bottom',
            'height',
            {
                axis: 'y'
            }
        );

        keyboard(clientRenderer, {axis: 'y'});

        keyboard(clientRenderer, {axis: 'y', step: 2});
    });

    describe('reverse Slider', () => {
        withValueMinMax(
            clientRenderer,
            'right',
            'width',
            'horizontal',
            {
                axis: 'x-reverse'
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'right',
            'width',
            {
                axis: 'x-reverse'
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'right',
            'width',
            {
                axis: 'x-reverse'
            }
        );

        keyboard(clientRenderer, {axis: 'x-reverse'});

        keyboard(clientRenderer, {axis: 'x-reverse', step: 2});
    });

    describe('vertical reverse Slider', () => {
        withValueMinMax(
            clientRenderer,
            'top',
            'height',
            'vertical',
            {
                axis: 'y-reverse'
            }
        );

        whenDragThingsAround(
            clientRenderer,
            'top',
            'height',
            {
                axis: 'y-reverse'
            }
        );

        whenDragThingsAroundWithStep(
            clientRenderer,
            'top',
            'height',
            {
                axis: 'y-reverse'
            }
        );

        keyboard(clientRenderer, {axis: 'y-reverse'});

        keyboard(clientRenderer, {axis: 'y-reverse', step: 2});
    });
});
