import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, ampmLabels, Format,
    formatTimeChunk, is12TimeFormat, isTimeSegment, isTouch,
    isValidValue, Segment, selectionIndexes, TimeSegment, to24, toAmpm, validInputStringRE
} from './utils';

export interface Props {
    value?: string;
    onChange?: (value: string) => void;
    format?: Format;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
}

export interface State {
    inputValue: string;
    focus: boolean;
    hh?: number;
    mm?: number;
    ampm: Ampm;
    currentSegment: Segment;
}

const ampmSwitch = {
    [Ampm.AM]: Ampm.PM,
    [Ampm.PM]: Ampm.AM,
    [Ampm.NONE]: Ampm.NONE
};

function segmentsToInputValue({hh, mm, ampm}: {hh?: number, mm?: number, ampm: Ampm}): string {
    if (hh === undefined && mm === undefined) {
        return '';
    }
    const timeString = `${formatTimeChunk(hh || 0)}:${formatTimeChunk(mm || 0)}`;
    const ampmLabel = ampmLabels[ampm];
    return ampmLabel ? (timeString + ' ' + ampmLabel) : timeString;
}

function defaultValue(format: Format, hh: string = '00'): string {
    return hh + ':00' + (format === 'ampm' ? ' AM' : '');
}

function propsValueToSegments(value?: string, format?: Format): {hh?: number, mm?: number, ampm: Ampm} {
    const isAmpm = format === 'ampm';
    if (!value) {
        return {
            ampm: isAmpm ? Ampm.AM : Ampm.NONE
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
        format: is12TimeFormat ? 'ampm' : '24hr',
        disabled: false
    };
    private input: HTMLInputElement | null;
    private lastValue: string | undefined;

    constructor(props: Props) {
        super();
        this.lastValue = props.value;
        this.state = {
            focus: false,
            currentSegment: 'hh',
            ...this.getInitialSegments(props)
        };
    }

    public componentWillReceiveProps(props: Props) {
        if (props.value !== this.props.value) {
            this.setState(this.getInitialSegments(props));
        }
    }

    public render() {
        const {focus, ampm, inputValue, currentSegment} = this.state;
        const {label, name, placeholder, disabled, format} = this.props;
        const currentIsTime = isTimeSegment(currentSegment);
        const currentSegmentValue = this.state[currentSegment] || 0;

        return (
            <div
                data-automation-id="TIME_PICKER"
                cssStates={{focus, disabled: disabled!}}
            >
                <input
                    data-automation-id="TIME_PICKER_INPUT"
                    type="text"
                    tabIndex={isTouch ? -1 : 0}
                    className="input"
                    ref={elem => this.input = elem}
                    value={inputValue}
                    placeholder={placeholder || defaultValue(format!)}
                    disabled={disabled}
                    name={name}
                    aria-label={label}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    onKeyDown={this.onInputKeyDown}
                    onMouseDown={this.onInputMouseDown}
                    onClick={this.onInputClick}
                />
                {!isTouch && !disabled && inputValue &&
                    <Stepper
                        className="stepper"
                        disableUp={
                            currentIsTime &&
                            !isValidValue(currentSegmentValue + 1, currentSegment as any, ampm)
                        }
                        disableDown={
                            currentIsTime &&
                            !isValidValue(currentSegmentValue - 1, currentSegment as any, ampm)
                        }
                        onUp={this.onStepperUp}
                        onDown={this.onStepperDown}
                    />
                }
                {isTouch &&
                    <label className="label">
                        <input
                            className="native-input"
                            type="time"
                            name={name}
                            aria-label={label}
                            value={this.getValue()}
                            disabled={disabled}
                            onFocus={this.onNantiveInputFocus}
                            onBlur={this.onInputBlur}
                            onChange={this.onNativeInputChange}
                        />
                    </label>
                }
            </div>
        );
    }

    private getInitialSegments(props: Props): Pick<State, 'hh' | 'mm' | 'ampm' | 'inputValue'> {
        const segments = propsValueToSegments(props.value, props.format);
        return {
            ...segments,
            inputValue: segmentsToInputValue(segments)
        };
    }

    private getValue(): string {
        const {hh = 0, mm = 0, ampm} = this.state;
        const hhString = formatTimeChunk(to24(hh, ampm));
        const mmString = formatTimeChunk(mm);
        return `${hhString}:${mmString}`;
    }

    private select(segment: Segment): boolean {
        const indexes = selectionIndexes[segment];
        const input = this.input!;
        const cursorPosition = input.selectionStart;
        input.selectionStart = indexes[0];
        input.selectionEnd = indexes[1];
        this.setState({currentSegment: segment});
        return input.selectionStart !== input.selectionEnd;
    }
    private moveSelection(step: number): boolean {
        const segments = Object.keys(selectionIndexes) as Segment[];
        const index = segments.indexOf(this.state.currentSegment!);
        const nextSegment = segments[index + step];
        if (nextSegment) {
            return this.select(nextSegment);
        }
        return false;
    }

    private updateSegmentValue(name: Segment, value: number | Ampm): void {
        const {hh, mm, ampm} = this.state;
        this.setState({
            [name as any]: value,
            inputValue: segmentsToInputValue({
                hh, mm, ampm,
                [name]: value
            })
        }, () => {
            this.input!.focus();
            this.select(name);
            this.commit();
        });
    }

    private toggleAmpm(): void {
        this.updateSegmentValue('ampm', ampmSwitch[this.state.ampm]);
    }

    private changeValue(step: number): void {
        const {currentSegment} = this.state;
        if (!isTimeSegment(currentSegment)) {
            return this.toggleAmpm();
        }
        const {ampm} = this.state;
        const newValue = (this.state[currentSegment] || 0) + step;

        if (isValidValue(newValue, currentSegment, ampm)) {
            this.updateSegmentValue(currentSegment, newValue);
        }
    }

    private onStepperUp = () => this.changeValue(1);
    private onStepperDown = () => this.changeValue(-1);

    private onInputMouseDown = (e: any): void => {
        // when user select text with double click
        if (e.detail > 1) {
            e.preventDefault();
        }
    }

    private onInputClick = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const cursorPosition = e.currentTarget.selectionStart;
        let key: Segment;
        let currentSegment: Segment = 'hh';

        for (key in selectionIndexes) {
            if (cursorPosition >= selectionIndexes[key][0] && cursorPosition <= selectionIndexes[key][1]) {
                currentSegment = key;
            }
        }
        if (currentSegment === 'ampm') {
            this.toggleAmpm();
        } else {
            this.select(currentSegment);
        }
    }

    private onInputChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const {format} = this.props;
        const {ampm} = this.state;
        let {value} = e.currentTarget;
        if (value.length === 1) {
            value = defaultValue(format!, value);
        }
        const match = value.match(validInputStringRE);
        if (!match) {
            return;
        }
        const hh = Number(match[1]);
        const mm = Number(match[2]);

        if (
            !isValidValue(hh, 'hh', ampm) ||
            !isValidValue(mm, 'mm', ampm) ||
            (format === 'ampm' && !match[3])
        ) {
            return;
        }

        const input = this.input!;
        const cursorPosition = input.selectionStart;
        const currentSegment = this.state.hh !== hh ? 'hh' : 'mm';
        const updatedValue = this.state.hh !== hh ? hh : mm;
        const shouldWaitForInput = isValidValue(updatedValue * 10, currentSegment, ampm);
        const inputValue = shouldWaitForInput ?
            value : segmentsToInputValue({hh, mm, ampm});

        this.setState({
            inputValue,
            currentSegment,
            hh,
            mm
        }, () => {
            if (shouldWaitForInput) {
                input.selectionStart = input.selectionEnd = cursorPosition;
            } else {
                this.moveSelection(1);
                this.commit();
            }
        });

    }

    private onNativeInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const segments = propsValueToSegments(value, this.props.format);
        const inputValue = segmentsToInputValue(segments);
        this.setState({
            ...segments,
            inputValue
        }, this.commit);
    }

    private onNantiveInputFocus = () => {
        this.setState({focus: true});
    }

    private onInputFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: true});
        const input = this.input!;
        // initial focus (default tab behaviour)
        if (input.selectionEnd - input.selectionStart === input.value.length) {
            e.preventDefault();
            this.select('hh');
        }
    }
    private onInputBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: false});
    }

    private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const {currentSegment} = this.state;
        const keyCode = keycode(e.keyCode);

        // prevent default for and char (a-z) and also for any didgit (0-9) for ampm segment
        // this is needed to disallow user to move reset select state on input
        if (/^\D$/.test(keyCode) || /^\d$/.test(keyCode) && currentSegment === 'ampm') {
            e.preventDefault();
        }

        switch (keyCode) {
            case 'left':
                e.preventDefault();
                this.moveSelection(-1);
                break;
            case 'right':
                e.preventDefault();
                this.moveSelection(1);
                break;
            case 'tab':
                const moved = this.moveSelection(e.shiftKey ? -1 : 1);
                if (moved) {
                    e.preventDefault();
                }
                break;
            case 'up':
                e.preventDefault();
                this.changeValue(1);
                break;
            case 'down':
                e.preventDefault();
                this.changeValue(-1);
                break;
            case 'backspace':
                e.preventDefault();
                if (isTimeSegment(currentSegment) && this.state[currentSegment]) {
                    this.updateSegmentValue(currentSegment, 0);
                } else {
                    this.moveSelection(-1);
                }
                break;
            case 'space':
            case 'enter':
                e.preventDefault();
                if (!isTimeSegment(currentSegment)) {
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
