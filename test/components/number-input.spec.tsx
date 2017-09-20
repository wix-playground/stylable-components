import * as React from 'react';
import {ClientRenderer, expect, sinon} from 'test-drive-react';
import {NumberInput} from '../../src';
import {
    NumberInputDriver,
    StatefulUncontrolledNumberInput,
    StatefulUnctontrolledNumberInputDriver
} from '../../test-kit';

function assertCommit(
    input: Element | null,
    onChange: sinon.SinonSpy,
    expectedValue: number | undefined
): void {
    expect(onChange).to.have.been.calledOnce;
    expect(onChange.lastCall.args[0]).to.deep.eq({value: expectedValue});
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
        const {driver, waitForDom} = clientRenderer.render(
            <NumberInput
                value={value}
                min={min}
                max={max}
                step={step}
                name={name}
                required
            />
        ).withDriver(NumberInputDriver);

        await waitForDom(() => {
            const numberInput = driver.nativeInput;

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

    it('should only set appropriate attributes on native input', async () => {
        const value = 0;
        const {driver, waitForDom} = clientRenderer.render(
            <NumberInput value={value} />
        ).withDriver(NumberInputDriver);

        await waitForDom(() => {
            const numberInput = driver.nativeInput;

            expect(numberInput).to.be.present();
            expect(numberInput).to.have.property('tagName', 'INPUT');

            expect(numberInput).to.have.attribute('type', 'number');
            expect(numberInput).not.to.have.attribute('min');
            expect(numberInput).not.to.have.attribute('max');
            expect(numberInput).not.to.have.attribute('step');
            expect(numberInput).not.to.have.attribute('name');
            expect(numberInput).not.to.have.attribute('required');

            expect(numberInput).to.have.value(String(value));
        });
    });

    it('can be disabled', async () => {
        const value = 0;
        const {driver, waitForDom} = clientRenderer.render(
            <NumberInput
                value={value}
                disabled
            />
        ).withDriver(NumberInputDriver);

        await waitForDom(() => {
            const numberInput = driver.nativeInput;
            const increment = driver.increment;
            const decrement = driver.decrement;

            expect(numberInput).to.have.attribute('disabled');
            expect(increment).to.have.attribute('disabled');
            expect(decrement).to.have.attribute('disabled');
        });
    });

    it('should render a stepper', async () => {
        const {driver, waitForDom} = clientRenderer.render(
            <NumberInput value={0} />
        ).withDriver(NumberInputDriver);

        await waitForDom(() => {
            const stepper = driver.stepper;

            expect(stepper).to.be.present();
        });
    });

    describe('<Stepper />', () => {
        it('should render increment and decrement controls', async () => {
            const {driver, waitForDom} = clientRenderer.render(
                <NumberInput value={0} />
            ).withDriver(NumberInputDriver);

            await waitForDom(() => {
                const increment = driver.increment;
                const decrement = driver.decrement;

                expect(increment).to.be.present();
                expect(decrement).to.be.present();
            });
        });

        describe('increment', () => {

            it('should increase the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickIncrement();

                    assertCommit(driver.nativeInput, onChange, value + step);
                });
            });

            it('should increase the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickIncrement({shiftKey: true});

                    assertCommit(driver.nativeInput, onChange, value + 10 * step);
                });
            });

            it('should be disabled when value >= max', async () => {
                const value = 2;
                const max = 2;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() =>
                    expect(driver.increment).to.have.attribute('disabled')
                );
            });

            it('should set the value to min when value < min', async () => {
                const value = -3;
                const min = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickIncrement();

                    assertCommit(driver.nativeInput, onChange, min);
                });
            });
        });

        describe('decrement', () => {
            it('should decrease the value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickDecrement();

                    assertCommit(driver.nativeInput, onChange, value - step);
                });
            });

            it('should decrease the value by a large step when shift key is held', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickDecrement({shiftKey: true});

                    assertCommit(driver.nativeInput, onChange, value - 10 * step);
                });
            });

            it('should be disabled when value <= min', async () => {
                const value = -1;
                const min = 0;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() =>
                    expect(driver.decrement).to.have.attribute('disabled')
                );
            });

            it('should set the value to max when value > max', async () => {
                const value = 3;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.clickDecrement();

                    assertCommit(driver.nativeInput, onChange, max);
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
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    assertCommit(driver.nativeInput, onChange, value + step);
                });
            });

            it('should increase value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey({shiftKey: true});

                    assertCommit(driver.nativeInput, onChange, value + 10 * step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    assertCommit(driver.nativeInput, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();
                    assertCommit(driver.nativeInput, onChange, min);
                });
            });

            it('should not call onChange when value = max', async () => {
                const value = 0;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressUpKey();

                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value(String(value));
                });
            });

        });

        describe('down key', () => {
            it('should decrease value by one step', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, value - step);
                });
            });

            it('should decrease value by 10*step with shift key', async () => {
                const value = 0;
                const step = 2;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey({shiftKey: true});
                    assertCommit(driver.nativeInput, onChange, value - 10 * step);
                });
            });

            it('should set value to max when value > max', async () => {
                const value = 1;
                const max = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} max={max} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, max);
                });
            });

            it('should set value to min when value < min', async () => {
                const value = 0;
                const min = 1;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    assertCommit(driver.nativeInput, onChange, min);
                });
            });

            it('should not call onChange when value = min', async () => {
                const value = 0;
                const min = 0;
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} min={min} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.pressDownKey();
                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value(String(value));
                });
            });

        });

        describe('value being typed', () => {

            it('should call onInput on every keystroke', async () => {
                const onInput = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput onInput={onInput} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('1');
                    driver.typeIn('2');
                    driver.typeIn('3');
                    expect(onInput).to.have.been.calledThrice;
                    expect(onInput).to.have.been.calledWith({value: '123'});
                    expect(driver.nativeInput).to.have.value('123');
                });
            });

            it('should not commit and validate the value', async () => {
                const onChange = sinon.spy();
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput max={10} onChange={onChange} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('123');
                    expect(onChange).not.to.have.been.called;
                    expect(driver.nativeInput).to.have.value('123');
                });
            });

            describe('enter', () => {
                it('should commit the entered value', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEnter();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
                it('should not commit already committed value', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEnter();
                        driver.pressEnter();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
            });

            describe('focus', () => {
                it('should commit on blur', async () => {
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.blur();

                        assertCommit(driver.nativeInput, onChange, 123);
                    });
                });
            });

            describe('esc', () => {
                it('should discard uncommitted changes', async () => {
                    const initialValue = 3;
                    const onChange = sinon.spy();
                    const {driver, waitForDom} = clientRenderer.render(
                        <NumberInput value={initialValue} onChange={onChange} />
                    ).withDriver(NumberInputDriver);

                    await waitForDom(() => {
                        driver.typeIn('123');

                        driver.pressEsc();

                        expect(onChange).not.to.have.been.called;
                        expect(driver.nativeInput).to.have.value(String(initialValue));
                    });
                });
            });
        });
    });

    describe('children', () => {
        it('should render an elements provided by prefix suffix props', async () => {
            const {driver, waitForDom} = clientRenderer.render(
                <NumberInput
                    prefix={<span data-slot="prefix" data-automation-id="PREFIX">prefix</span>}
                    suffix={<span data-slot="suffix" data-automation-id="SUFFIX">suffix</span>}
                />
            ).withDriver(NumberInputDriver);

            await waitForDom(() => {
                expect(driver.prefix).to.be.present();
                expect(driver.suffix).to.be.present();
            });
        });
    });

    describe('uncontrolled input', () => {

        describe('defaultValue prop', () => {

            it('should set the value of input', async () => {
                const value = 11;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={value} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() =>
                    expect(driver.nativeInput).to.have.value(String(value))
                );
            });

            it('should only set the value of the input once', async () => {
                const initialValue = 11;

                const {driver, waitForDom} = clientRenderer.render(
                    <StatefulUncontrolledNumberInput initialValue={initialValue} />
                ).withDriver(StatefulUnctontrolledNumberInputDriver);

                await waitForDom(() => {
                    const numberInput = driver.input;

                    driver.click();
                    driver.click();
                    driver.click();

                    expect(numberInput).to.have.value(String(initialValue));
                });
            });

        });

        describe('treating DOM as the source of truth', () => {

            it('should allow the user to enter values', async () => {
                const initialValue = 1;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={initialValue} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    driver.typeIn('23');
                    expect(driver.nativeInput).to.have.value(String(123));
                });
            });

            it('should be controlled by stepper correctly', async () => {
                const initialValue = 1;
                const newValue = 3;
                const {driver, waitForDom} = clientRenderer.render(
                    <NumberInput defaultValue={initialValue} />
                ).withDriver(NumberInputDriver);

                await waitForDom(() => {
                    (driver.nativeInput as HTMLInputElement).value = String(newValue);

                    driver.clickIncrement();

                    expect(driver.nativeInput).to.have.value(String(newValue + 1));
                });
            });

        });

    });
});
