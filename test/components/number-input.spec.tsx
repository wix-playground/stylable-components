import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { KeyCodes } from '../../src/common/key-codes';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('should output an input form element with type="number" by default', async () => {
        const value = 0;
        const min = -5;
        const max = 5;
        const step = 2;
        const name = 'input-name';
        const required = true;
        const {select, waitForDom} = clientRenderer.render(
            <NumberInput
                value={value}
                min={min}
                max={max}
                step={step}
                name={name}
                required
            />
        );

        await waitForDom(() => {
            const numberInput = select('NATIVE_INPUT_NUMBER');

            expect(numberInput).to.be.present();
            expect(numberInput).to.have.property('tagName', 'INPUT');

            expect(numberInput).to.have.attribute('type', 'number');
            expect(numberInput).to.have.attribute('min', String(min));
            expect(numberInput).to.have.attribute('max', String(max));
            expect(numberInput).to.have.attribute('step', String(step));
            expect(numberInput).to.have.attribute('name', String(name));
            expect(numberInput).to.have.attribute('required');

            expect(numberInput).to.have.value(String(value));

        });
    });

    it('can be disabled', async () => {
        const value = 0;
        const {select, waitForDom} = clientRenderer.render(
            <NumberInput
                value={value}
                disabled
            />
        );

        await waitForDom(() => {
            const numberInput = select('NATIVE_INPUT_NUMBER');
            const increment = select('STEPPER_INCREMENT');
            const decrement = select('STEPPER_DECREMENT');

            expect(numberInput).to.have.attribute('disabled');
            expect(increment).to.have.attribute('disabled');
            expect(decrement).to.have.attribute('disabled');
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
                const value = 0;
                const step = 2;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(value + step);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should be disabled when value >= max', async () => {
                const value = 2;
                const max = 2;
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');

                    expect(increment).to.have.attribute('disabled');
                });
            });

            it('should set the value to min when value < min', async () => {
                const value = -3;
                const min = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(min);
                    expect(input).to.have.value(String(value));
                });
            });
        });

        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(decrement);

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(value - step);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should be disabled when value <= min', async () => {
                const value = -1;
                const min = 0;
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');

                    expect(decrement).to.have.attribute('disabled');
                });
            });

            it('should set the value to max when value > max', async () => {
                const value = 3;
                const max = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(decrement);

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(max);
                    expect(input).to.have.value(String(value));
                });
            });

        });
    });

    describe('keyboard interactions', () => {
        describe('up key', () => {
            it('should increase value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(value + step);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(max);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(min);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should not call onChangeValue when value = max', async () => {
                const value = 0;
                const max = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChangeValue).not.to.have.been.called;
                    expect(input).to.have.value(String(value));
                });
            });

        });

        describe('down key', () => {
            it('should decrease value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(value - step);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(max);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChangeValue).to.have.been.calledOnce;
                    expect(onChangeValue).to.have.been.calledWith(min);
                    expect(input).to.have.value(String(value));
                });
            });

            it('should not call onChangeValue when value = min', async () => {
                const value = 0;
                const min = 0;
                const onChangeValue = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChangeValue={onChangeValue} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChangeValue).not.to.have.been.called;
                    expect(input).to.have.value(String(value));
                });
            });

        });
    });
});
