import * as React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '../../icons'
const styles = require('./number-input.css')

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

<<<<<<< .merge_file_fvGHX8
export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
  static defaultProps: Partial<NumberInputProps> = defaultProps
=======
export class NumberInput extends React.Component<NumberInputProps, NumberInputState>{
>>>>>>> .merge_file_62KG6k

  constructor(props: NumberInputProps) {
    super(props)

<<<<<<< .merge_file_fvGHX8
    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps: NumberInputProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  render() {
    const { value } = this.state

    return <div className={styles['number-input']}>
      <input
        data-automation-id='NATIVE_INPUT_NUMBER'
        type='number'
        value={value}
        onChange={this.handleChange}
      />
      <Stepper
        data-automation-id='NUMBER_INPUT_STEPPER'
        className={styles.stepper}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
    </div>
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { onChange = defaultProps.onChange } = this.props
    const value = Number(e.target.value)

    this.setState({ value })
    onChange(value)
  }

  private handleIncrement: React.EventHandler<React.SyntheticEvent<HTMLElement>> = e => {
    const {
      max = defaultProps.max,
      step = defaultProps.step,
      onChange = defaultProps.onChange
    } = this.props
    const { value } = this.state
    const next = value + step

    if (next <= max) {
      this.setState({ value: next })
      onChange(next)
    }
  }

  private handleDecrement: React.EventHandler<React.SyntheticEvent<HTMLElement>> = e => {
    const {
      min = defaultProps.min,
      step = defaultProps.step,
      onChange = defaultProps.onChange
    } = this.props
    const { value } = this.state
    const next = value - step

    if (next >= min) {
      this.setState({ value: next })
      onChange(next)
    }
  }
}

interface StepperProps extends React.HTMLProps<HTMLElement> {
  onIncrement?: Function
  onDecrement?: Function
}

const Stepper: React.StatelessComponent<StepperProps> =
  ({ onIncrement = noop, onDecrement = noop, ...props }) => (
    <div {...props}>
      <button
        data-automation-id='STEPPER_INCREMENT'
        className={styles['stepper-increment']}
        onClick={() => onIncrement()}
      >
        <ChevronUpIcon className={styles['stepper-control-icon']} />
      </button>
      <button
        data-automation-id='STEPPER_DECREMENT'
        className={styles['stepper-decrement']}
        onClick={() => onDecrement()}
      >
        <ChevronDownIcon className={styles['stepper-control-icon']} />
      </button>
    </div>
  )

function noop() {return}
=======
        this.state = {value: props.value}
    }

    private handleChange: React.ChangeEventHandler<any> = e => {
        const {onChange = defaultProps.onChange} = this.props;
        const value = Number(e.target.value);

        this.setState({value});
        onChange(value);
    }

    private handleIncrement: React.EventHandler<any> = e => {
        const {
            step = defaultProps.step,
            onChange = defaultProps.onChange
        } = this.props;
        const {value} = this.state;
        const next = value + step;

        this.setState({value: next});
        onChange(next);
    }

    private handleDecrement: React.EventHandler<any> = e => {
        const {
            step = defaultProps.step,
            onChange = defaultProps.onChange
        } = this.props;
        const {value} = this.state;
        const next = value - step;

        this.setState({value: next});
        onChange(next);
    }

    componentWillReceiveProps({value}: NumberInputProps) {
        if (this.state.value !== value) {
            this.setState({value: value});
        }
    }

    render() {
        const {
            step = defaultProps.step,
            min = defaultProps.min,
            max = defaultProps.max
        } = this.props;
        const {value} = this.state;
        const disableIncrement = value + step > max;
        const disableDecrement = value - step < min;

        return <div className={styles['number-input']}>
            <input
                data-automation-id="NATIVE_INPUT_NUMBER"
                type="number"
                value={value}
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
                data-automation-id="STEPPER_INCREMENT"
                className={styles['stepper-increment']}
                onClick={() => onIncrement()}
                disabled={disableIncrement}
            >
                <ChevronUpIcon className={styles['stepper-control-icon']} />
            </button>
            <button
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
>>>>>>> .merge_file_62KG6k
