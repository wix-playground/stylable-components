import * as React from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import {KeyCodes} from '../../common/key-codes';

const styles = require('./number-input.css');

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number
    onChangeValue?: (value: number) => void
    step?: number
    min?: number
    max?: number
}

const defaultProps = {
    step: 1,
    onChangeValue: noop,
    min: -Infinity,
    max: Infinity
}

type Direction = 'increase' | 'decrease'

const INCREASE: Direction = 'increase';
const DECREASE: Direction = 'decrease';

export class NumberInput extends React.Component<NumberInputProps, {}>{
    static defaultProps = defaultProps;

    private setValue(next: number) {
        const {onChangeValue, min, max, value} = this.props;
        const nextInRange = Math.min(max!, Math.max(min!, next));

        if(value !== nextInRange) {
            onChangeValue!(nextInRange);
        }
    }

    private stepValue(direction: Direction) {
        const {value, step, min, max} = this.props;
        const next = (direction == INCREASE ?
            value + step! :
            value - step!);

        this.setValue(next);
    }

    private handleIncrement: React.MouseEventHandler<HTMLElement> =
        () => this.stepValue(INCREASE);

    private handleDecrement: React.MouseEventHandler<HTMLElement> =
        () => this.stepValue(DECREASE);

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
        switch (e.keyCode) {
            case KeyCodes.UP:
                this.stepValue(INCREASE);
                e.preventDefault();
                break;
            case KeyCodes.DOWN:
                this.stepValue(DECREASE);
                e.preventDefault();
                break;
        }
    }

    private handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const value = Number(e.target.value);
        this.setValue(value);
    }

    render() {
        const {value, step, min, max, ...props} = this.props;
        const disableIncrement = props.disabled || value >= max!;
        const disableDecrement = props.disabled || value <= min!;

        return <div className={styles['number-input']}>
            <input
                {...props}
                data-automation-id="NATIVE_INPUT_NUMBER"
                type="number"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
            <Stepper
                data-automation-id="NUMBER_INPUT_STEPPER"
                className={styles['stepper']}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                disableIncrement={disableIncrement}
                disableDecrement={disableDecrement}
            />
        </div>;
    }
}

interface StepperProps extends React.HTMLProps<HTMLElement> {
    onIncrement?: Function
    onDecrement?: Function
    disableIncrement?: boolean
    disableDecrement?: boolean
}

const Stepper: React.StatelessComponent<StepperProps> =
    ({
        onIncrement = noop,
        onDecrement = noop,
        disableIncrement = false,
        disableDecrement = false,
        ...props
    }) => (
        <div {...props}>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className={styles['stepper-increment']}
                onClick={() => onIncrement()}
                disabled={disableIncrement}
            >
                <ChevronUpIcon className={styles['stepper-control-icon']} />
            </button>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className={styles['stepper-decrement']}
                onClick={() => onDecrement()}
                disabled={disableDecrement}
            >
                <ChevronDownIcon className={styles['stepper-control-icon']}/>
            </button>
        </div>
    );

function noop() {}
