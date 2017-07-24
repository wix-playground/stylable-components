import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { KeyCodes } from '../../src/common/key-codes';
import { NumberInput } from '../../src';

const inputs = new WeakSet();

function simulateKeyInput(
    input: HTMLInputElement,
    value: string
) {
    if (inputs.has(input)) {
        input.value += value;
    } else {
        input.value = value;
        inputs.add(input);
    }
    simulate.change(input);
}

function assertCommit(
    input: Element | null,
    onChange: sinon.SinonSpy,
    expectedValue: number | undefined
): void {
    expect(onChange).to.have.been.calledOnce;
    expect(onChange.lastCall.args[1]).to.equal(expectedValue);
    expect(input).to.have.value(String(expectedValue));
}

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
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    assertCommit(input, onChange, value + step);
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
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    assertCommit(input, onChange, min);
                });
            });
        });

        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(decrement);

                    assertCommit(input, onChange, value - step);
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
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const decrement = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(decrement);

                    assertCommit(input, onChange, max);
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

                    assertCommit(input, onChange, value + step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    assertCommit(input, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    assertCommit(input, onChange, min);
                });
            });

            it('should not call onChange when value = max', async () => {
                const value = 0;
                const max = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.UP});

                    expect(onChange).not.to.have.been.called;
                    expect(input).to.have.value(String(value));
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

                    assertCommit(input, onChange, value - step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    assertCommit(input, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    assertCommit(input, onChange, min);
                });
            });

            it('should not call onChange when value = min', async () => {
                const value = 0;
                const min = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.keyDown(input, {keyCode: KeyCodes.DOWN});

                    expect(onChange).not.to.have.been.called;
                    expect(input).to.have.value(String(value));
                });
            });

        });

        describe('value being typed', () => {

            it('should not commit and validate the value', async () => {
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput max={10} onChange={onChange} />
                );

                await waitForDom(() => {
                    const input = select('NATIVE_INPUT_NUMBER') as HTMLInputElement;

                    simulateKeyInput(input, '1');
                    simulateKeyInput(input, '2');
                    simulateKeyInput(input, '3');

                    expect(onChange).not.to.have.been.called;
                    expect(input).to.have.value('123');
                });
            });

            describe('enter', () => {
                it('should commit entered the value', async () => {
                    const onChange = sinon.spy();
                    const {select, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    );

                    await waitForDom(() => {
                        const input = select('NATIVE_INPUT_NUMBER') as HTMLInputElement;

                        simulateKeyInput(input, '1');
                        simulateKeyInput(input, '2');
                        simulateKeyInput(input, '3');

                        simulate.keyDown(input, {keyCode: KeyCodes.ENTER});

                        assertCommit(input, onChange, 123);
                    });
                });
                it('should not commit already committed value', async () => {
                    const onChange = sinon.spy();
                    const {select, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    );

                    await waitForDom(() => {
                        const input = select('NATIVE_INPUT_NUMBER') as HTMLInputElement;

                        simulateKeyInput(input, '1');
                        simulateKeyInput(input, '2');
                        simulateKeyInput(input, '3');

                        simulate.keyDown(input, {keyCode: KeyCodes.ENTER});
                        simulate.keyDown(input, {keyCode: KeyCodes.ENTER});

                        assertCommit(input, onChange, 123);
                    });
                });
            });

            describe('focus', () => {
                it('should commit on focusout', async () => {
                    const onChange = sinon.spy();
                    const {select, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    );

                    await waitForDom(() => {
                        const input = select('NATIVE_INPUT_NUMBER') as HTMLInputElement;

                        simulateKeyInput(input, '1');
                        simulateKeyInput(input, '2');
                        simulateKeyInput(input, '3');

                        simulate.blur(input);

                        assertCommit(input, onChange, 123);
                    });
                });
            });

            describe('esc', () => {
                it('should discard uncommitted changes', async () => {
                    const initialValue = 3;
                    const onChange = sinon.spy();
                    const {select, waitForDom} = clientRenderer.render(
                        <NumberInput value={initialValue} onChange={onChange} />
                    );

                    await waitForDom(() => {
                        const input = select('NATIVE_INPUT_NUMBER') as HTMLInputElement;

                        simulateKeyInput(input, '1');
                        simulateKeyInput(input, '2');
                        simulateKeyInput(input, '3');

                        simulate.keyDown(input, {keyCode: KeyCodes.ESCAPE});

                        expect(onChange).not.to.have.been.called;
                        expect(input).to.have.value(String(initialValue));
                    });
                });
            });
        });
    });
});
