import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { KeyCodes } from '../../src/common/key-codes';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('should output an input element with type="number" by default', async () => {
        const { select, waitForDom } = clientRenderer.render(
            <NumberInput value={0} />
        );

        await waitForDom(() => {
            const numberInput = select('NATIVE_INPUT_NUMBER');

            expect(numberInput).to.be.present();
            expect(numberInput).to.have.property('tagName', 'INPUT');
            expect(numberInput).to.have.attribute('type', 'number');
        });
    });

    it('should render a stepper', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <NumberInput value={0} />
        );

        await waitForDom(() => {
            const stepper = select('NUMBER_INPUT_STEPPER');

            expect(stepper).to.be.present();
        });
    });

    describe('<Stepper />', () => {
        it('should render increment and decrement controls', async () => {
            const {select, waitForDom} = clientRenderer.render(
                <NumberInput value={0} />
            );

            await waitForDom(() => {
                const increment = select('STEPPER_INCREMENT');
                const decrement = select('STEPPER_DECREMENT');

                expect(increment).to.be.present();
                expect(decrement).to.be.present();
            });
        });

        describe('increment', () => {

            it('should increase the value by one step', async () => {
                const value = 1;
                const step = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);
                    simulate.click(increment);
                    simulate.click(increment);

                    expect(input).to.have.value(String(value + 3*step));
                    expect(onChange).to.have.been.calledThrice;
                    expect(onChange).to.have.been.calledWith(value + step);
                });
            });

            it('should be disabled when value + step > max', async () => {
                const value = 1;
                const step = 1;
                const max = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');

                    simulate.click(increment);

                    expect(increment).to.have.attribute('disabled');
                });
            });

            it('should set the value to min when value < min', async () => {
                const value = -3;
                const step = 1;
                const min = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');

                    simulate.click(increment);

                    expect(onChange).to.have.been.calledWith(min);
                });
            });
        });

        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 1;
                const step = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(decrement);
                    simulate.click(decrement);
                    simulate.click(decrement);

                    expect(input).to.have.value(String(value - 3*step));
                    expect(onChange).to.have.been.calledThrice;
                    expect(onChange).to.have.been.calledWith(value - step);
                });
            });

            it('should be disabled when value - step < min', async () => {
                const value = 1;
                const step = 1;
                const min = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');

                    simulate.click(decrement);

                    expect(decrement).to.have.attribute('disabled');
                });
            });

            it('should set the value to max when value > max', async () => {
                const value = 3;
                const step = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');

                    simulate.click(decrement);

                    expect(onChange).to.have.been.calledWith(max);
                });
            });

        });
    });

    describe('keyboard interactions', () => {
        describe('up key', () => {
            it('should increase value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});
                    simulate.keyDown(input, {keyCode: KeyCodes.UP});
                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChange).to.have.been.calledThrice;

                    expect(onChange).to.have.been.calledWith(value + step);
                    expect(onChange).to.have.been.calledWith(value + 2*step);
                    expect(onChange).to.have.been.calledWith(value + 3*step);

                    expect(input).to.have.value(String(value + 3*step));
                });
            });

            it('should set value to max when value + step > max', async () => {
                const value = 0;
                const step = 2;
                const max = 5
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});
                    simulate.keyDown(input, {keyCode: KeyCodes.UP});
                    simulate.keyDown(input, {keyCode: KeyCodes.UP});
                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChange).to.have.been.calledThrice;

                    expect(onChange).to.have.been.calledWith(value + step);
                    expect(onChange).to.have.been.calledWith(value + 2*step);
                    expect(onChange).to.have.been.calledWith(max);

                    expect(input).to.have.value(String(max));
                });
            });

        });

        describe('down key', () => {
            it('should decrease value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});
                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});
                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChange).to.have.been.calledThrice;

                    expect(onChange).to.have.been.calledWith(value - step);
                    expect(onChange).to.have.been.calledWith(value - 2*step);
                    expect(onChange).to.have.been.calledWith(value - 3*step);

                    expect(input).to.have.value(String(value - 3*step));
                });
            });

            it('should set value to min when value - step < min', async () => {
                const value = 0;
                const step = 2;
                const min = -5
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});
                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});
                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});
                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChange).to.have.been.calledThrice;

                    expect(onChange).to.have.been.calledWith(value - step);
                    expect(onChange).to.have.been.calledWith(value - 2*step);
                    expect(onChange).to.have.been.calledWith(min);

                    expect(input).to.have.value(String(min));
                });
            });

        });
    });
});
