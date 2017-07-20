import * as React from 'react';
import {Stepper} from './stepper';
import {KeyCodes} from '../../common/key-codes';

const styles = require('./number-input.css');

function noop() {}

function isNumber(value?: number): value is number {
    return typeof value == 'number';
}

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: number
    onChangeValue?: (value: number | undefined) => void
    step?: number
    min?: number
    max?: number
}

export interface NumberInputState {
    value?: number
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

export class NumberInput extends React.Component<NumberInputProps, NumberInputState>{
    static defaultProps = defaultProps;

    constructor(props: NumberInputProps) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    private committed = true;

    private validate(value?: number) {
        const {min, max} = this.props;
        return isNumber(value) ?
          Math.min(max!, Math.max(min!, value))
          : value;
    }

    private commit(value?: number) {
        const {onChangeValue} = this.props;
        const valueInRange = this.validate(value);

        this.updateValue(valueInRange);

        if (!this.committed) {
            onChangeValue!(valueInRange);
            this.committed = true;
        }
    }

    private updateValue(next?: number) {
        const {value} = this.state;

        if(value !== next) {
            this.committed = false;
            this.setState({value: next});
        }
    }

    private stepValue(direction: Direction) {
        const {value} = this.state;
        const {step, min, max} = this.props;
        const next = (direction == INCREASE ?
            isNumber(value) ? value + step! : step! :
            isNumber(value) ? value - step! : -step!);

        this.commit(next);
    }

    private handleIncrement: React.MouseEventHandler<HTMLElement> =
        () => this.stepValue(INCREASE);

    private handleDecrement: React.MouseEventHandler<HTMLElement> =
        () => this.stepValue(DECREASE);

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> =
        e => {
            switch (e.keyCode) {
                case KeyCodes.UP:
                    this.stepValue(INCREASE);
                    e.preventDefault();
                    break;
                case KeyCodes.DOWN:
                    this.stepValue(DECREASE);
                    e.preventDefault();
                    break;
                case KeyCodes.ENTER:
                    this.commit(this.state.value);
                    e.preventDefault();
                    break;
            }
        }

    private handleBlur: React.FocusEventHandler<HTMLInputElement> =
        e => this.commit(this.state.value);

    private handleChange: React.ChangeEventHandler<HTMLInputElement> =
        e => {
            const value = e.target.value;
            const next = value !== '' ?
                Number(e.target.value) :
                undefined;

            this.updateValue(next);
        }

    componentWillReceiveProps({value}: NumberInputProps) {
        if (value !== this.state.value) {
            this.committed = true;
            this.setState({value});
        }
    }

    render() {
        const {value} = this.state;
        const {step, min, max, onChangeValue, ...props} = this.props;
        const disableIncrement = props.disabled || (isNumber(value) && value >= max!);
        const disableDecrement = props.disabled || (isNumber(value) && value <= min!);

        return <div className={styles['number-input']}>
            <input
                {...props}
                data-automation-id="NATIVE_INPUT_NUMBER"
                type="number"
                value={isNumber(value) ? value : ''}
                min={min}
                max={max}
                step={step}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
            />
            <Stepper
                data-automation-id="NUMBER_INPUT_STEPPER"
                className={styles['stepper']}
                onUp={this.handleIncrement}
                onDown={this.handleDecrement}
                disableUp={disableIncrement}
                disableDown={disableDecrement}
            />
        </div>;
    }
}
