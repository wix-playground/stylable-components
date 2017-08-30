import {codes as KeyCodes} from 'keycode';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {isNumber, noop} from '../../utils';
import styles from './number-input.st.css';
import {Stepper} from '../stepper';

export interface NumberInputProps {
    className?: string;
    value?: number;
    defaultValue?: number;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: boolean;
    onChange?(value?: number): void;
    onInput?(value: string): void;
}

interface DefaultProps {
    step: number;
    min: number;
    max: number;
    onChange(value?: number): void;
    onInput(value: string): void;
}

export type SlotElement = React.ReactElement<{'data-slot': string}>;

export interface Affix {
    prefix: SlotElement[];
    suffix: SlotElement[];
}

export interface NumberInputState {
    value?: number;
    focus: boolean;
    error: boolean;
}

enum Slot {
    Prefix = 'prefix',
    Suffix = 'suffix'
}

enum Direction {
    Increase = 'increase',
    Decrease = 'decrease'
}

function getAffix(children: React.ReactNode): Affix {
    return React.Children
        .toArray(children)
        .reduce((affix: Affix, child) => {
            if (typeof child === 'object') {
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
        });
}

const DEFAULTS: DefaultProps = {
    step: 1,
    min: -Infinity,
    max: Infinity,
    onChange: noop,
    onInput: noop
};

function getPropWithDefault<Prop extends keyof NumberInputProps & keyof DefaultProps>(
    props: NumberInputProps,
    name: Prop
): (DefaultProps & NumberInputProps)[Prop] {
    return props[name] === undefined ? DEFAULTS[name] : props[name];
}

@SBComponent(styles)
export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
    public static defaultProps = {
        onChange: DEFAULTS.onChange,
        onInput: DEFAULTS.onInput
    };

    private committed = true;

    private inputRef: HTMLInputElement | null = null;

    private get isUncontrolled(): boolean {
        return this.props.defaultValue !== undefined;
    }

    private get currentValue(): number | undefined {
        return (
            this.isUncontrolled ?
                this.inputRef ?
                    this.inputRef.value !== '' ?
                        Number(this.inputRef.value) :
                        undefined :
                    this.props.defaultValue :
                this.state.value
        );
    }

    constructor(props: NumberInputProps) {
        super(props);

        this.state = {
            value: isNumber(props.value) ? props.value : props.defaultValue,
            focus: false,
            error: Boolean(props.error)
        };
    }

    public componentWillReceiveProps({min, max, step, value, defaultValue}: NumberInputProps) {
        if (defaultValue === undefined && value !== this.state.value) {
            this.committed = true;
            this.setState({value});
        }
    }

    public render() {
        const {value, focus} = this.state;
        const {
            step, min, max,
            placeholder, name,
            disabled, required,
            children, error
        } = this.props;
        const disableIncrement = disabled || (isNumber(value) && value >= max!);
        const disableDecrement = disabled || (isNumber(value) && value <= min!);
        const {prefix, suffix} = getAffix(children);

        return (
            <div
                cssStates={{
                    disabled: Boolean(disabled),
                    error: Boolean(error),
                    focus
                }}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {prefix.length > 0 ?
                    <div className="prefix">
                        {prefix}
                    </div> : null
                }
                <input
                    ref={input => this.inputRef = input}
                    className="native-input"
                    data-automation-id="NATIVE_INPUT_NUMBER"
                    type="number"
                    name={name}
                    value={isNumber(value) ? value : ''}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                />
                {suffix.length > 0 ?
                    <div className="suffix">
                        {suffix}
                    </div> : null
                }
                <Stepper
                    className="stepper"
                    data-automation-id="NUMBER_INPUT_STEPPER"
                    onUp={this.handleIncrement}
                    onDown={this.handleDecrement}
                    disableUp={disableIncrement}
                    disableDown={disableDecrement}
                />
            </div>
        );
    }

    private validate(value?: number) {
        const min = getPropWithDefault(this.props, 'min');
        const max = getPropWithDefault(this.props, 'max');
        return isNumber(value) ?
            Math.min(max, Math.max(min, value))
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

        if (value !== next) {
            this.committed = false;
            this.setState({value: next});
        }
    }

    private stepValue(direction: Direction, multiplier = 1) {
        const value = this.currentValue;
        let step = getPropWithDefault(this.props, 'step');

        step = step * multiplier;

        const next = (direction === Direction.Increase ?
            isNumber(value) ? value + step : step :
            isNumber(value) ? value - step : -step);

        this.commit(next);
    }

    private handleIncrement = () => this.stepValue(Direction.Increase);

    private handleDecrement = () => this.stepValue(Direction.Decrease);

    private handleFocus: React.FocusEventHandler<HTMLElement> =
        e => this.setState({focus: true})

    private handleBlur: React.FocusEventHandler<HTMLElement> =
        e => this.setState({focus: false})

    private handleInputKeyDown: React.KeyboardEventHandler<HTMLElement> = e => {
        switch (e.keyCode) {
            case KeyCodes.up:
                this.stepValue(Direction.Increase, e.shiftKey ? 10 : 1);
                e.preventDefault();
                break;
            case KeyCodes.down:
                this.stepValue(Direction.Decrease, e.shiftKey ? 10 : 1);
                e.preventDefault();
                break;
            case KeyCodes.enter:
                this.commit(this.state.value);
                e.preventDefault();
                break;
            case KeyCodes.esc:
                this.revert();
                e.preventDefault();
                break;
        }
    }

    private handleInputBlur: React.FocusEventHandler<HTMLInputElement> =
        e => this.commit(this.state.value)

    private handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
        e => {
            const {onInput} = this.props;
            const value = e.target.value;
            const next = value !== '' ?
                Number(e.target.value) :
                undefined;

            this.updateValue(next);
            onInput!(value);
        }
}
