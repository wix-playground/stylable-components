import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {Slider, SliderProps} from '../../src/components/slider';
import WindowStub from '../stubs/window.stub';
import {simulateMouseEvent, simulateTouchEvent} from '../utils';
import {describeIfTouch} from '../utils/skip-describe-if-touch';

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

describe.only('<Slider />', () => {
    const clientRenderer = new ClientRenderer();
    let environment: WindowStub;

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
        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
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

                expect(onChange).to.be.calledWith(10);
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

                expect(onInput).to.be.calledWith('5');
                expect(onChange).to.be.calledWith(5);
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

    describe('when drag things around', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

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
                    {clientX: Math.round(bounds.left + bounds.width * 0.7)}
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
                    {clientX: Math.round(bounds.left + bounds.width * 0.77)}
                );

                expect(onChange).to.be.calledWith(8);
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
                    {clientX: Math.round(bounds.left + bounds.width * 0.56)}
                );
                simulateMouseEvent(
                    environment,
                    'mouseup',
                    {clientX: Math.round(bounds.left + bounds.width * 0.66)}
                );

                expect(onInput).to.be.calledWith('6');
                expect(onChange).to.be.calledWith(7);
            });
        });
    });

    describeIfTouch('when drag things around using touch', () => {
        const value = 5;
        const min = 0;
        const max = 10;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

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

    describeIfTouch('touch dragging with step', () => {
        const value = 5;
        const min = 0;
        const max = 10;
        const step = 1;
        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

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

        it('should call onChange with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
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

        it('should call onInput with value normalized to step', async () => {
            await waitFor(() => {
                const element = select('SLIDER');
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
                expect(onChange).have.been.calledWith(51);
            });
        });

        it('on pressing up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(51);
            });
        });

        it('on pressing page up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page up']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(60);
            });
        });

        it('on pressing up key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(60);
            });
        });

        it('on pressing left key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing up key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(60);
            });
        });

        it('on pressing left key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing left key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(49);
            });
        });

        it('on pressing down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(49);
            });
        });

        it('on pressing page down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page down']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing down key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing right key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });

        it('on pressing down key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing right key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });

        it('on pressing home key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.home
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing end key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.end
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });
    });

    describe('keyboard control with step', () => {
        const value = 50;
        const min = 0;
        const max = 100;
        const step = 4;

        let onChange: (value: number) => void;
        let onInput: (value: string) => void;
        let select: (automationId: string) => HTMLElement | null;
        let waitForDom: (expectation: () => void) => Promise<void>;

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
                />
            );
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });

        it('on pressing right key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.right
            });
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(56);
            });
        });

        it('on pressing up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(52);
            });
        });

        it('on pressing page up key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page up']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(80);
            });
        });

        it('on pressing up key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(80);
            });
        });

        it('on pressing left key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing up key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.up
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(80);
            });
        });

        it('on pressing left key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing left key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.left
            });
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.left
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(44);
            });
        });

        it('on pressing down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(48);
            });
        });

        it('on pressing page down key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes['page down']
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing down key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing right key with ctrl', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                ctrlKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });

        it('on pressing down key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.down
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(40);
            });
        });

        it('on pressing right key with shift', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.right
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
            });
        });

        it('on pressing home key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                keyCode: keycode.codes.home
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(0);
            });
        });

        it('on pressing end key', async () => {
            simulate.keyDown(select('SLIDER-HANDLE'), {
                shiftKey: true,
                keyCode: keycode.codes.end
            });

            return waitFor(() => {
                expect(onChange).have.been.calledWith(100);
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

        describe('when drag things around', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y"
                        onChange={onChange}
                        onInput={onInput}
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
                        clientX: bounds.left + bounds.width / 3,
                        clientY: Math.round(bounds.top + bounds.height * 0.7)
                    });

                    expect(handle!.style.bottom).to.equal('30%');
                    expect(progress!.style.height).to.equal('30%');
                });
            });

            it('should call onChange', async () => {
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
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );

                    expect(onChange).to.be.calledWith(3);
                });
            });

            it('should call onInput', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.top + bounds.height * 0.7)
                    });
                    simulateMouseEvent(
                        environment,
                        'mousemove',
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );

                    expect(onInput).to.be.calledWith('3');
                    expect(onChange).to.be.calledWith(3);
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.bottom).to.equal('50%');
                });
            });

            it('renders progress bar with the right width', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-PROGRESS');

                    expect(element).to.be.present();
                    expect(element!.style.height).to.equal('50%');
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
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientX: bounds.left + bounds.width / 3,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });

                    expect(handle!.style.bottom).to.equal('80%');
                    expect(progress!.style.height).to.equal('80%');
                });
            });

            it('should call onChange with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );

                    expect(onChange).to.be.calledWith(8);
                });
            });

            it('should call onInput with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });
                    simulateMouseEvent(
                        environment,
                        'mousemove',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );

                    expect(onInput).to.be.calledWith('8');
                    expect(onChange).to.be.calledWith(8);
                });
            });
        });

        describeIfTouch('when drag things around using touch', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y"
                        onChange={onChange}
                        onInput={onInput}
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
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });

                    expect(handle!.style.bottom).to.equal('70%');
                    expect(progress!.style.height).to.equal('70%');
                });
            });

            it('should call onChange', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    expect(onChange).to.be.calledWith(7);
                });
            });

            it('should call onInput', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });
                    simulateTouchEvent(
                        environment,
                        'touchmove',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    expect(onInput).to.be.calledWith('7');
                    expect(onChange).to.be.calledWith(7);
                });
            });
        });

        describeIfTouch('touch dragging with step', () => {
            const value = 5;
            const min = 0;
            const max = 10;
            const step = 1;
            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.bottom).to.equal('50%');
                });
            });

            it('renders progress bar with the right width', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-PROGRESS');

                    expect(element).to.be.present();
                    expect(element!.style.height).to.equal('50%');
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
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });

                    expect(handle!.style.bottom).to.equal('80%');
                    expect(progress!.style.height).to.equal('80%');
                });
            });

            it('should call onChange with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    expect(onChange).to.be.calledWith(8);
                });
            });

            it('should call onInput with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });
                    simulateTouchEvent(
                        environment,
                        'touchmove',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    expect(onInput).to.be.calledWith('8');
                    expect(onChange).to.be.calledWith(8);
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y"
                        onChange={onChange}
                        onInput={onInput}
                    />
                );
                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('on pressing up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(51);
                });
            });

            it('on pressing page up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page up']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing up key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing left key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing up key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing left key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(49);
                });
            });

            it('on pressing page down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page down']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing down key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing right key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing down key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing right key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing home key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.home
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing end key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.end
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });
        });
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

        describe('when drag things around', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="x-reverse"
                        onChange={onChange}
                        onInput={onInput}
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

                    expect(handle!.style.right).to.equal('30%');
                    expect(progress!.style.width).to.equal('30%');
                });
            });

            it('should call onChange', async () => {
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
                        {clientX: Math.round(bounds.left + bounds.width * 0.7)}
                    );

                    expect(onChange).to.be.calledWith(3);
                });
            });

            it('should call onInput', async () => {
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
                        {clientX: Math.round(bounds.left + bounds.width * 0.7)}
                    );

                    expect(onInput).to.be.calledWith('4');
                    expect(onChange).to.be.calledWith(3);
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="x-reverse"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.right).to.equal('50%');
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

                    expect(handle!.style.right).to.equal('20%');
                    expect(progress!.style.width).to.equal('20%');
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
                        {clientX: Math.round(bounds.left + bounds.width * 0.77)}
                    );

                    expect(onChange).to.be.calledWith(2);
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
                        {clientX: Math.round(bounds.left + bounds.width * 0.56)}
                    );
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientX: Math.round(bounds.left + bounds.width * 0.66)}
                    );

                    expect(onInput).to.be.calledWith('4');
                    expect(onChange).to.be.calledWith(3);
                });
            });
        });

        describeIfTouch('when drag things around using touch', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="x-reverse"
                        onChange={onChange}
                        onInput={onInput}
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

                    expect(handle!.style.right).to.equal('30%');
                    expect(progress!.style.width).to.equal('30%');
                });
            });

            it('should call onChange', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
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

                    expect(onChange).to.be.calledWith(3);
                });
            });

            it('should call onInput', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
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

                    expect(onInput).to.be.calledWith('3');
                    expect(onChange).to.be.calledWith(3);
                });
            });
        });

        describeIfTouch('touch dragging with step', () => {
            const value = 5;
            const min = 0;
            const max = 10;
            const step = 1;
            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="x-reverse"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.right).to.equal('50%');
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

                    expect(handle!.style.right).to.equal('20%');
                    expect(progress!.style.width).to.equal('20%');
                });
            });

            it('should call onChange with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
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

                    expect(onChange).to.be.calledWith(2);
                });
            });

            it('should call onInput with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
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

                    expect(onInput).to.be.calledWith('4');
                    expect(onChange).to.be.calledWith(3);
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="x-reverse"
                        onChange={onChange}
                        onInput={onInput}
                    />
                );
                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('on pressing up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(49);
                });
            });

            it('on pressing page up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page up']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing up key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing left key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing up key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing left key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(51);
                });
            });

            it('on pressing page down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page down']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing down key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing right key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing down key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing right key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing home key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.home
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing end key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.end
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });
        });
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

        describe('when drag things around', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y-reverse"
                        onChange={onChange}
                        onInput={onInput}
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
                        clientX: bounds.left + bounds.width / 3,
                        clientY: Math.round(bounds.top + bounds.height * 0.7)
                    });

                    expect(handle!.style.top).to.equal('70%');
                    expect(progress!.style.height).to.equal('70%');
                });
            });

            it('should call onChange', async () => {
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
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );

                    expect(onChange).to.be.calledWith(7);
                });
            });

            it('should call onInput', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.top + bounds.height * 0.7)
                    });
                    simulateMouseEvent(
                        environment,
                        'mousemove',
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.top + bounds.height * 0.7)}
                    );

                    expect(onInput).to.be.calledWith('7');
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y-reverse"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.top).to.equal('50%');
                });
            });

            it('renders progress bar with the right width', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-PROGRESS');

                    expect(element).to.be.present();
                    expect(element!.style.height).to.equal('50%');
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
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientX: bounds.left + bounds.width / 3,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });

                    expect(handle!.style.top).to.equal('20%');
                    expect(progress!.style.height).to.equal('20%');
                });
            });

            it('should call onChange with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );

                    expect(onChange).to.be.calledWith(2);
                });
            });

            it('should call onInput with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.mouseDown(element, {
                        currentTarget: element!,
                        clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                    });
                    simulateMouseEvent(
                        environment,
                        'mousemove',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );
                    simulateMouseEvent(
                        environment,
                        'mouseup',
                        {clientY: Math.round(bounds.bottom - bounds.height * 0.77)}
                    );

                    expect(onInput).to.be.calledWith('2');
                    expect(onChange).to.be.calledWith(2);
                });
            });
        });

        describeIfTouch('when drag things around using touch', () => {
            const value = 5;
            const min = 0;
            const max = 10;

            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y-reverse"
                        onChange={onChange}
                        onInput={onInput}
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
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });

                    expect(handle!.style.top).to.equal('30%');
                    expect(progress!.style.height).to.equal('30%');
                });
            });

            it('should call onChange', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    expect(onChange).to.be.calledWith(3);
                });
            });

            it('should call onInput', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.7)
                            }
                        } as any as TouchList
                    });
                    simulateTouchEvent(
                        environment,
                        'touchmove',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            x: bounds.left + bounds.height / 3,
                            y: Math.round(bounds.bottom - bounds.height * 0.7)
                        }
                    );

                    expect(onInput).to.be.calledWith('3');
                    expect(onChange).to.be.calledWith(3);
                });
            });
        });

        describeIfTouch('touch dragging with step', () => {
            const value = 5;
            const min = 0;
            const max = 10;
            const step = 1;
            let onChange: (value: number) => void;
            let onInput: (value: string) => void;
            let select: (automationId: string) => HTMLElement | null;
            let waitForDom: (expectation: () => void) => Promise<void>;

            beforeEach(function() {
                onChange = sinon.spy();
                onInput = sinon.spy();

                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y-reverse"
                        step={step}
                        onChange={onChange}
                        onInput={onInput}
                    />
                );

                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('renders handle on the right place', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-HANDLE');

                    expect(element!.style.top).to.equal('50%');
                });
            });

            it('renders progress bar with the right width', async () => {
                await waitForDom(() => {
                    const element = select('SLIDER-PROGRESS');

                    expect(element).to.be.present();
                    expect(element!.style.height).to.equal('50%');
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
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });

                    expect(handle!.style.top).to.equal('20%');
                    expect(progress!.style.height).to.equal('20%');
                });
            });

            it('should call onChange with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    expect(onChange).to.be.calledWith(2);
                });
            });

            it('should call onInput with value normalized to step', async () => {
                await waitFor(() => {
                    const element = select('SLIDER');
                    const bounds = element!.getBoundingClientRect();

                    simulate.touchStart(element, {
                        currentTarget: element!,
                        touches: {
                            0: {
                                clientY: Math.round(bounds.bottom - bounds.height * 0.77)
                            }
                        } as any as TouchList
                    });
                    simulateTouchEvent(
                        environment,
                        'touchmove',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    simulateTouchEvent(
                        environment,
                        'touchend',
                        {
                            y: Math.round(bounds.bottom - bounds.height * 0.77),
                            x: Math.round(bounds.left + bounds.width * 0.5)
                        }
                    );

                    expect(onInput).to.be.calledWith('2');
                    expect(onChange).to.be.calledWith(2);
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

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                const rendered = clientRenderer.render(
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        axis="y-reverse"
                        onChange={onChange}
                        onInput={onInput}
                    />
                );
                select = rendered.select;
                waitForDom = rendered.waitForDom;
            });

            it('on pressing up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(49);
                });
            });

            it('on pressing page up key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page up']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing up key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing left key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing up key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.up
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing left key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.left
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(51);
                });
            });

            it('on pressing page down key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page down']
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(40);
                });
            });

            it('on pressing down key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing right key with ctrl', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing down key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.down
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(60);
                });
            });

            it('on pressing right key with shift', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.right
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });

            it('on pressing home key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.home
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(100);
                });
            });

            it('on pressing end key', async () => {
                simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.end
                });

                return waitFor(() => {
                    expect(onChange).have.been.calledWith(0);
                });
            });
        });
    });
});
