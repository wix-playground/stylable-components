import * as React from 'react';
import styles from './number-input.st.css';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from './stepper';
import {KeyCodes} from '../../common/key-codes';

export type WithReactChildren<T> = T & {children: React.ReactNode};

export interface NumberInputProps {
    value?: number
    placeholder?: string
    min?: number
    max?: number
    step?: number
    required?: boolean
    disabled?: boolean
    label?: string
    name?: string
    error?: boolean
    onChange?(value: number | undefined): void
    onInput?(value: string | undefined): void
}

export type SlotElement = React.ReactElement<{'data-slot': string}>;

export interface Affix {
    prefix: SlotElement[]
    suffix: SlotElement[]
}

export interface NumberInputState {
    value?: number
}

enum Slot {
    Prefix = 'prefix',
    Suffix = 'suffix'
}

enum Direction {
    Increase = 'increase',
    Decrease = 'decrease'
}

function noop() {}

function isNumber(value?: number): value is number {
    return typeof value == 'number';
}

function getAffix(children: React.ReactNode): Affix {
    return React.Children
        .toArray(children)
        .reduce((affix, child) => {
            if (typeof child == 'object') {
                child as React.ReactElement<{}>;

                switch (child.props['data-slot']) {
                    case Slot.Prefix:
                        affix.prefix.push(child);
                        break;
                    case Slot.Suffix:
                        affix.suffix.push(child);
                        break;
                }
            }

            return affix;
        },
        {
            prefix: [],
            suffix: []
        } as Affix);
}

@SBComponent(styles)
export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
    static defaultProps = {
        step: 1,
        min: -Infinity,
        max: Infinity,
        onChange: noop,
        onInput: noop
    };

    constructor(props: WithReactChildren<NumberInputProps>) {
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
        const {onChange} = this.props;
        const valueInRange = this.validate(value);

        this.updateValue(valueInRange);

        if (!this.committed) {
            onChange!(valueInRange);
            this.committed = true;
        }
    }

    private revert() {
        const {value} = this.props;
        this.updateValue(value);
        this.committed = true;
    }

    private updateValue(next?: number) {
        const {value} = this.state;

        if(value !== next) {
            this.committed = false;
            this.setState({value: next});
        }
    }

    private stepValue(e: React.SyntheticEvent<HTMLElement>, direction: Direction) {
        const {value} = this.state;
        const {step, min, max} = this.props;
        const next = (direction == Direction.Increase ?
            isNumber(value) ? value + step! : step! :
            isNumber(value) ? value - step! : -step!);

        this.commit(next);
    }

    private handleIncrement: React.MouseEventHandler<HTMLElement> =
        e => this.stepValue(e, Direction.Increase);

    private handleDecrement: React.MouseEventHandler<HTMLElement> =
        e => this.stepValue(e, Direction.Decrease);

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> =
        e => {
            switch (e.keyCode) {
                case KeyCodes.UP:
                    this.stepValue(e, Direction.Increase);
                    e.preventDefault();
                    break;
                case KeyCodes.DOWN:
                    this.stepValue(e, Direction.Decrease);
                    e.preventDefault();
                    break;
                case KeyCodes.ENTER:
                    this.commit(this.state.value);
                    e.preventDefault();
                    break;
                case KeyCodes.ESCAPE:
                    this.revert();
                    e.preventDefault();
                    break;
            }
        }

    private handleBlur: React.FocusEventHandler<HTMLInputElement> =
        e => this.commit(this.state.value);

    private handleChange: React.ChangeEventHandler<HTMLInputElement> =
        e => {
            const {onInput} = this.props;
            const value = e.target.value;
            const next = value !== '' ?
                Number(e.target.value) :
                undefined;

            this.updateValue(next);
            onInput!(value);
        }

    componentWillReceiveProps({value, children}: WithReactChildren<NumberInputProps>) {
        const changes: Partial<NumberInputState> = {};

        if (value !== this.state.value) {
            this.committed = true;
            changes.value = value;
        }

        if (Object.keys(changes).length > 0) {
            this.setState(changes as NumberInputState);
        }
    }

    render() {
        const {value} = this.state;
        const {step, min, max, onInput, children, ...inputProps} = this.props;
        const disableIncrement = inputProps.disabled || (isNumber(value) && value >= max!);
        const disableDecrement = inputProps.disabled || (isNumber(value) && value <= min!);
        const {prefix, suffix} = getAffix(children);

        return <div>
            {prefix.length > 0 ?
                <div className='prefix'>
                    {prefix}
                </div> : null
            }
            <input
                {...inputProps}
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
            {suffix.length > 0 ?
                <div className='suffix'>
                    {suffix}
                </div> : null
            }
            <Stepper
                data-automation-id="NUMBER_INPUT_STEPPER"
                onUp={this.handleIncrement}
                onDown={this.handleDecrement}
                disableUp={disableIncrement}
                disableDown={disableDecrement}
            />
        </div>;
    }
}
