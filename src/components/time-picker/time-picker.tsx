import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, Format, Segment,
    isNumber, isTimeSegment, isValidValue, pad2, TimeSegment, to24, toAmpm
} from './utils';

export interface Props {
    value?: string;
    onChange?: (value: string) => void;
    format?: Format;
    placeholder?: string;
    disabled?: boolean;
}

export interface State {
    inputValue: string;
    focus: boolean;
    hh?: number;
    mm?: number;
    ampm: Ampm;
}

const isTouch =  'ontouchstart' in window || Boolean(navigator.msMaxTouchPoints);
const is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
const ampmLabels = {
    [Ampm.AM]: 'AM',
    [Ampm.PM]: 'PM',
    [Ampm.NONE]: '',
};
const selectionIndexes = {
    hh: [0, 2],
    mm: [3, 5],
    ampm: [6, 8]
};

function segmentsToInputValue({hh, mm, ampm}: {hh?: number, mm?: number, ampm: Ampm}) {
    return [
        hh ? pad2(hh) : '00',
        ':',
        mm ? pad2(mm) : '00',
        ' ',
        ampmLabels[ampm]
    ].join('').trim();
}

function propsValueToSegments(value?: string, format?: Format) {
    const isAmpm = format === 'ampm';
    if (!value) {
        return {
            ampm: isAmpm ? Ampm.AM : Ampm.NONE,
        };
    }
    const [hh24, mm] = value.split(':').map(Number);
    const {hh, ampm} = toAmpm(hh24);
    return {
        hh: isAmpm ? hh : hh24,
        ampm: isAmpm ? ampm : Ampm.NONE,
        mm
    };
}

@SBComponent(styles)
export default class TimePicker extends React.Component<Props, State> {
    public static defaultProps = {
        format: is12TimeFormat ? 'ampm' : '24hr'
    };
    private input: HTMLInputElement | null;
    private lastValue: string | undefined;
    private currentSegment: Segment | undefined;

    constructor(props: Props) {
        super();
        const segments = propsValueToSegments(props.value, props.format);
        this.lastValue = props.value;
        this.state = {
            focus: false,
            ...segments,
            inputValue: segmentsToInputValue(segments)
        };
    }

    public render() {
        const {focus, inputValue} = this.state;
        return <div cssStates={{focus}}>
            <input
                type="text"
                tabIndex={isTouch ? -1 : 0}
                className="input"
                ref={elem => this.input = elem}
                value={inputValue}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                onKeyDown={this.onInputKeyDown}
                onClick={this.onInputClick}
            />
            <input
                className="native-input"
                tabIndex={isTouch ? 0 : -1}
                type="time"
                value={this.getValue()}
            />
        </div>
    }

    private getValue() {
        const {hh, mm, ampm} = this.state;
        return [
            to24(hh || 0, ampm),
            mm || 0
        ].map(String).map(pad2).join(':');
    }

    private select(segment: Segment) {
        const indexes = selectionIndexes[segment];
        this.currentSegment = segment;
        this.input!.selectionStart = indexes[0];
        this.input!.selectionEnd = indexes[1];
    }
    private moveSelection(step: number) {
        const segments = Object.keys(selectionIndexes) as Segment[]
        const index = segments.indexOf(this.currentSegment!);
        const nextSegment = segments[index + step];
        if (nextSegment) {
            this.select(nextSegment);
        }
    }

    private updateSegmentValue(name: Segment, value: number | Ampm) {
        const {hh, mm, ampm} = this.state;
        this.setState({
            [name as any]: value,
            inputValue: segmentsToInputValue({
                hh, mm, ampm,
                [name]: value
            })
        }, () => {
            this.select(name);
            this.commit();
        })
    }

    private toggleAmpm() {
        this.updateSegmentValue('ampm', 1 - this.state.ampm);
    }

    private changeValue(step: number) {
        const name = this.currentSegment;
        if (!isTimeSegment(name)) {
            return this.toggleAmpm();
        }
        const {hh, mm, ampm} = this.state;
        const newValue = (this.state[name] || 0) + step;

        if (isValidValue(newValue, name, ampm)) {
            this.updateSegmentValue(name, newValue);
        }
    }

    private onInputClick = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const cursorPosition = e.currentTarget.selectionStart;
        let key: Segment;
        let currentSegment: Segment = 'hh';

        for (key in selectionIndexes) {
            if (cursorPosition >= selectionIndexes[key][0] && cursorPosition <= selectionIndexes[key][1]) {
                currentSegment = key;
            }
        }
        this.select(currentSegment)
    }

    private onInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {format} = this.props;
        const {ampm} = this.state;
        const {value} = e.currentTarget;
        const match = value.match(/^(\d{1,2}):(\d{1,2})(?:\s(AM|PM))?$/);
        if (!match) {
            return;
        }
        const hh = Number(match[1]);
        const mm = Number(match[2]);

        if (
            !isValidValue(Number(match[1]), 'hh', ampm) ||
            !isValidValue(Number(match[2]), 'mm', ampm) ||
            format === 'ampm' && !match[3]
        ) {
            return;
        }

        const input = this.input!
        const cursorPosition = input.selectionStart;
        const currentSegment = this.state.hh !== hh ? 'hh' : 'mm';
        const updatedValue = this.state.hh !== hh ? hh : mm;
        const shouldWaitForInput = isValidValue(updatedValue * 10, currentSegment, ampm);
        const inputValue = shouldWaitForInput ?
            value : segmentsToInputValue({hh, mm, ampm});

        this.setState({
            inputValue,
            hh,
            mm
        }, () => {
            if (shouldWaitForInput) {
                input.selectionStart = input.selectionEnd = cursorPosition;
            } else {
                this.currentSegment = currentSegment;
                this.moveSelection(+1);
                this.commit();
            }
        });

    }

    private onInputFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: true});
    }
    private onInputBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: false});
    }

    private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = keycode(e.keyCode);

        // do not allow to unset selection by preventing all non digets and not system keys
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !/^\d$/.test(keyCode)) {
            e.preventDefault();
        }

        switch(keyCode) {
            case 'left':
                this.moveSelection(-1)
                break;
            case 'right':
                this.moveSelection(1)
                break;
            case 'tab':
                this.moveSelection(e.shiftKey ? -1 : 1)
                break;
            case 'up':
                this.changeValue(+1)
                break;
            case 'down':
                this.changeValue(-1)
                break;
            case 'space':
            case 'enter':
                if (this.currentSegment === 'ampm') {
                    this.toggleAmpm();
                }
        }
    }


    private commit = () => {
        const value = this.getValue();
        if (this.props.onChange && this.lastValue !== value) {
            this.lastValue = value;
            this.props.onChange(value);
        }
    }

}

/*
@SBComponent(styles)
export default class TimePicker extends React.Component<Props, State> {
    public static defaultProps = {
        format: is12TimeFormat ? 'ampm' : '24hr'
    };

    private inputs: {
        [key: string]: HTMLInputElement | HTMLDivElement | null
    } = {};
    private lastValue: string | undefined;

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
            <div
                data-automation-id="TIME_PICKER"
                cssStates={{focus: Boolean(currentInput), disabled: disabled!}}
                onClick={this.onRootClick}
            >
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
                                onFocus={this.onInputFocus}
                                onBlur={this.onInputBlur}
                                onKeyDown={this.onInputKeyDown}
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
                        onFocus={this.onAmpmFocus}
                        onBlur={this.onAmpmBlur}
                        onMouseDown={this.onAmpmMouseDown}
                        onKeyDown={this.onAmpmKeyDown}
                    />
                }
                {!showPlaceholder && !disabled &&
                    <Stepper
                        className="stepper"
                        disableUp={!isValidValue(stepperCurrentValue + 1, stepperCurrentInput, ampm)}
                        disableDown={!isValidValue(stepperCurrentValue - 1, stepperCurrentInput, ampm)}
                        onUp={this.createStepperHandler(+1)}
                        onDown={this.createStepperHandler(-1)}
                    />
                }
                <input
                    className="native-input"
                    ref={elem => this.inputs.nativeInput = elem}
                    tabIndex={isTouch ? 0 : -1}
                    type="time"
                    value={this.getValue()}
                    onChange={this.onNativeChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
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

    private onRootClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            this.inputs.hh!.focus();
        }
    }

    private onInputFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            currentInput: e.currentTarget.name
        });
        if (isTouch) {
            this.showNativeKeyboard();
        } else {
            e.currentTarget.select();
        }
    }

    private onInputBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
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

    private onAmpmFocus = () => this.setState({currentInput: 'ampm'});
    private onAmpmBlur = () => this.setState({currentInput: null});

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

    private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name as TimePart;
        switch (keycode(e.keyCode)) {
            case 'backspace':
                if (!this.state[name].length) {
                    e.preventDefault();
                    this.moveFocus(-1);
                }
                break;
            case 'left':
                e.preventDefault();
                this.moveFocus(-1);
                break;
            case 'right':
                e.preventDefault();
                this.moveFocus(+1);
                break;
        }
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
            case 'left':
                e.preventDefault();
                this.moveFocus(-1);
                break;
            case 'right':
                e.preventDefault();
                this.moveFocus(+1);
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
        if (this.props.disabled) {
            return;
        }
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
*/
