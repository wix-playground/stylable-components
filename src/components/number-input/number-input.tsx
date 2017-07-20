import * as React from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import {KeyCodes} from '../../common/key-codes';

const styles = require('./number-input.css');

function noop() {}

function isNumber(value: number | undefined): value is number {
    return typeof value == 'number';
}

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: number
    onChangeValue?: (value: number | undefined) => void
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

    private setValue(next: number | undefined) {
        const {onChangeValue, min, max, value} = this.props;
        const nextInRange = isNumber(next) ?
            Math.min(max!, Math.max(min!, next))
            : next;

        if(value !== nextInRange) {
            onChangeValue!(nextInRange);
        }
    }

    private stepValue(direction: Direction) {
        const {value, step, min, max} = this.props;
        const next = (direction == INCREASE ?
            isNumber(value) ? value + step! : step! :
            isNumber(value) ? value - step! : -step!);

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
        const value = e.target.value;
        const next = value !== '' ?
            Number(e.target.value) :
            undefined;

        this.setValue(next);
    }

    render() {
        const {value, step, min, max, onChangeValue, ...props} = this.props;
        const disableIncrement = props.disabled || (isNumber(value) && value >= max!);
        const disableDecrement = props.disabled || (isNumber(value) && value <= min!);

        return <div className={styles['number-input']}>
            <input
                {...props}
                data-automation-id="NATIVE_INPUT_NUMBER"
                type="number"
                // In case the value is undefined and the user
                // changes it to a number React would trigger
                // a warning (in DEV mode) that the input is changed from
                // being uncontrolled to controlled state.
                // This is necessary in order to be able
                // to use native placeholders.
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
