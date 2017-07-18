import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { KeyCodes } from '../../src/common/key-codes';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('outputs an input element with type="number" by default', async () => {
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

    it('renders a stepper', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <NumberInput value={0} />
        );

        await waitForDom(() => {
            const stepper = select('NUMBER_INPUT_STEPPER');

            expect(stepper).to.be.present();
        });
    });

    describe('<Stepper />', () => {
        it('renders increment and decrement controls', async () => {
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

                    expect(input).to.have.value(String(value + step));
                    expect(onChange).to.have.been.calledWith(value + step);
                });
            });

            it('should not increase the value by one step when value + step > max', async () => {
                const value = 2;
                const step = 3;
                const max = 4;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} max={max} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_INCREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    expect(input).to.have.value(String(value));
                    expect(onChange).not.to.have.been.called;
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

                    expect(input).to.have.value(String(value - step));
                    expect(onChange).to.have.been.calledWith(value - step);
                });
            });

            it('should not decrease the value when value - step < min', async () => {
                const value = 1;
                const step = 2;
                const min = 0;
                const onChange = sinon.spy();
                const {select, waitForDom} = clientRenderer.render(
                    <NumberInput value={value} step={step} min={min} onChange={onChange} />
                );

                await waitForDom(() => {
                    const increment = select('STEPPER_DECREMENT');
                    const input = select('NATIVE_INPUT_NUMBER');

                    simulate.click(increment);

                    expect(input).to.have.value(String(value));
                    expect(onChange).not.to.have.been.called;
                });
            });
        });
    });
});
