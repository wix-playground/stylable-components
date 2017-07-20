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

export interface NumberInputState {
    value: number | undefined
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

    private commit(value: number | undefined) {
        const {onChangeValue} = this.props;

        if (!this.committed) {
            onChangeValue!(value);
            this.committed = true;
        }
    }


    private setValue(next: number | undefined) {
        const {onChangeValue, min, max, value} = this.props;
        const nextInRange = isNumber(next) ?
            Math.min(max!, Math.max(min!, next))
            : next;

        if(value !== nextInRange) {
            this.committed = false;
            this.setState({value: nextInRange});
        }

        return nextInRange;
    }

    private setAndCommit(value: number | undefined) {
        const nextInRange = this.setValue(value);
        this.commit(nextInRange);
    }

    private stepValue(direction: Direction) {
        const {value, step, min, max} = this.props;
        const next = (direction == INCREASE ?
            isNumber(value) ? value + step! : step! :
            isNumber(value) ? value - step! : -step!);

        this.setAndCommit(next);
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
            case KeyCodes.ENTER:
                this.commit(this.state.value);
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
