import * as React from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
const styles = require('./number-input.css');

export interface NumberInputProps {
    value: number
    onChange?: (value: number) => void
    step?: number
    min?: number
    max?: number
}

export interface NumberInputState {
    value: number
}

const defaultProps = {
    step: 1,
    onChange: noop,
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

        this.state = {value: props.value}
    }

    private setValue(value: number) {
        const {onChange} = this.props;

        this.setState({value});
        onChange!(value);
    }

    private stepValue(direction: Direction) {
        const {step, min, max} = this.props;
        const {value} = this.state;
        const next = direction == INCREASE ?
            Math.max(value + step!, min!) :
            Math.min(value - step!, max!);

        this.setValue(next);
    }

    private handleIncrement: React.EventHandler<any> = () => {
        this.stepValue(INCREASE);
    }

    private handleDecrement: React.EventHandler<any> = () => {
        this.stepValue(DECREASE);
    }

    private handleChange: React.ChangeEventHandler<any> = e => {
        const value = Number(e.target.value);
        this.setValue(value);
    }

    componentWillReceiveProps({value}: NumberInputProps) {
        if (this.state.value !== value) {
            this.setState({value: value});
        }
    }

    render() {
        const {step, min, max} = this.props;
        const {value} = this.state;
        const disableIncrement = value + step! > max!;
        const disableDecrement = value - step! < min!;

        return <div className={styles['number-input']}>
            <input
                data-automation-id="NATIVE_INPUT_NUMBER"
                type="number"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={this.handleChange}
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
