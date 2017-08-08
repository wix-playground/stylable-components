import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, TimePart, Format,
    isTimePart, isNumber, isValidValue, pad2, to24, toAmpm
} from './utils';

export interface Props {
    value?: string;
    onChange?: (value: string) => void;
    format?: Format;
    placeholder?: string;
    disabled?: boolean;
}

export interface State {
    currentInput: string | null;
    prevInput: string | null;
    hh: string;
    mm: string;
    ampm: Ampm;
}

const isTouch =  'ontouchstart' in window || Boolean(navigator.msMaxTouchPoints);
const is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
const inputNames: string[] = ['hh', 'mm', 'ampm'];

@SBComponent(styles)
export default class TimePicker extends React.Component<Props, State> {
    public static defaultProps = {
        format: is12TimeFormat ? 'ampm' : '24hr'
    };

    private inputs: {
        [key: string]: HTMLInputElement | HTMLDivElement | null
    } = {}
    private lastValue: string | undefined

    constructor(props: Props) {
        super();
        this.lastValue = props.value;
        this.state = {
            currentInput: null,
            prevInput: null,
            ...this.getTimeParts(props.value, props.format)
        };
    }

    public componentWillReceiveProps(props: Props) {
        if (props.value && !this.state.currentInput) {
            this.setState(this.getTimeParts(props.value, props.format));
        }
    }
    public shouldComponentUpdate(props: Props, state: State) {
        return props.value !== this.props.value || this.state !== state;
    }

    public render() {
        const {currentInput, ampm, hh, mm} = this.state;
        const {disabled, format, value, placeholder} = this.props;
        const timeSet = Boolean(hh);
        const showPlaceholder = Boolean(placeholder) && !timeSet;
        const inputs = showPlaceholder ? ['hh'] : ['hh', 'mm'];
        const ampmLabel = ampm === Ampm.AM ? 'AM' : 'PM';
        const stepperCurrentInput = this.getStepperInputName();
        const stepperCurrentValue = Number(this.state[stepperCurrentInput]);

        return (
            <div data-automation-id="TIME_PICKER" cssStates={{focus: Boolean(currentInput), disabled: disabled!}}>
                <div className="inputs">
                    {inputs.map((key: TimePart) =>
                        <div className="input-wrap" key={key}>
                            <input
                                data-automation-id={'TIME_PICKER_' + key.toUpperCase()}
                                tabIndex={isTouch ? -1 : 0}
                                placeholder={showPlaceholder ? placeholder : '00'}
                                cssStates={{wide: showPlaceholder}}
                                className="input"
                                ref={elem => this.inputs[key] = elem}
                                name={key}
                                value={this.state[key]}
                                disabled={disabled}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                            />
                        </div>
                    )}
                </div>
                {format === 'ampm' && !showPlaceholder &&
                    <div
                        data-automation-id="TIME_PICKER_AMPM"
                        tabIndex={0}
                        ref={elem => this.inputs.ampm = elem}
                        className="ampm"
                        cssStates={{unset: !timeSet}}
                        children={ampmLabel}
                        onFocus={() => this.setState({currentInput: 'ampm'})}
                        onBlur={() => this.setState({currentInput: null})}
                        onMouseDown={this.onAmpmMouseDown}
                        onKeyDown={this.onAmpmKeyDown}
                    />
                }
                {!showPlaceholder && !disabled &&
                    <Stepper
                        disableUp={!isValidValue(stepperCurrentValue + 1, stepperCurrentInput, ampm)}
                        disableDown={!isValidValue(stepperCurrentValue - 1, stepperCurrentInput, ampm)}
                        onUp={this.createStepperHandler(+1)}
                        onDown={this.createStepperHandler(-1)}
                    />
                }
                <input
                    className="native-input"
                    ref={elem => this.inputs.nativeInput = elem}
                    tabIndex={isTouch ? 0 : -1 }
                    type="time"
                    value={this.getValue()}
                    onChange={this.onNativeChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
    private getStepperInputName() {
        return isTimePart(this.state.prevInput) ?
            this.state.prevInput : 'hh';
    }

    private getTimeParts(value?: string, format?: Format) {
        const isAmpm = format === 'ampm';
        if (!value) {
            return {
                hh: '',
                mm: '',
                ampm: isAmpm ? Ampm.AM : Ampm.NONE
            };
        }
        const [hh24, mm] = value.split(':').map(pad2);
        const {hh, ampm} = toAmpm(Number(hh24));
        return {
            hh: isAmpm ? pad2(hh) : hh24,
            ampm: isAmpm ? ampm : Ampm.NONE,
            mm
        };
    }

    private getValue() {
        const {hh, mm, ampm} = this.state;
        return [
            to24(Number(hh), ampm),
            mm
        ].map(String).map(pad2).join(':');
    }

    private createStepperHandler = (increment: number) => () => {
        const name = this.getStepperInputName();

        this.setState({
            [name as any]: pad2(Number(this.state[name]) + increment)
        }, () => {
            this.commit();
            if (!isTouch) {
                this.inputs[name]!.focus();
            }
        });
    }

    private onFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            currentInput: e.currentTarget.name
        });
        if (isTouch) {
            this.showNativeKeyboard();
        } else {
            e.currentTarget.select();
        }
    }

    private onBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const update: Partial<State> = {
            currentInput: null,
            prevInput: this.state.currentInput
        };
        if (isTimePart(name)) {
            update[name] = pad2(this.state[name]);
        }
        this.setState(update as State);
        this.commit();
    }

    private moveFocus(increment: number): boolean {
        const {currentInput} = this.state;
        if (!currentInput) {
            return false;
        }
        const refIndex = inputNames.indexOf(currentInput);
        const next = this.inputs[inputNames[refIndex + increment]];

        if (next) {
            next.focus();
            return true;
        }
        return false;
    }

    private onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {ampm} = this.state;
        const {value} = e.currentTarget;
        const name = e.currentTarget.name as TimePart;
        if (!isNumber(value)) {
            return;
        }
        const numValue = Number(value);

        if (!isValidValue(numValue, name, ampm)) {
            return;
        }

        const shouldWaitForInput = isValidValue(numValue * 10, name, ampm);
        const nextState = {
            [name as any]: shouldWaitForInput ? value : pad2(value)
        };
        this.setState(nextState, () => {
            if (!shouldWaitForInput) {
                this.commit();
                this.moveFocus(1);
            }
        });
    }

    private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name as TimePart;
        if (keycode(e.keyCode) !== 'backspace' || this.state[name].length) {
            return;
        }
        e.preventDefault();
        this.moveFocus(-1);
    }

    private onNativeChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState(this.getTimeParts(value, this.props.format), this.commit);
    }

    private onAmpmKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (keycode(e.keyCode)) {
            case 'space':
            case 'enter':
            case 'up':
            case 'down':
                e.preventDefault();
                this.toggleAmpm();
                break;
            case 'backspace':
                e.preventDefault();
                this.inputs.mm!.focus();
                break;
        }
    }

    private onAmpmMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const {currentInput} = this.state;
        e.preventDefault();
        this.toggleAmpm(() => {
            this.inputs.nativeInput!.blur();
            if (currentInput) {
                this.showNativeKeyboard();
            }
        });
    }

    private toggleAmpm = (cb?: () => void) => {
        const {hh, ampm} = this.state;
        this.setState({ampm: 1 - ampm}, () => {
            this.commit();
            if (cb) {
                cb();
            }
        });
    }

    private showNativeKeyboard = () => {
        this.inputs.nativeInput!.focus();
        this.inputs.nativeInput!.click();
    }

    private commit = () => {
        const value = this.getValue();
        if (this.props.onChange && this.lastValue !== value) {
            this.lastValue = value;
            this.props.onChange(value);
        }
    }

}
