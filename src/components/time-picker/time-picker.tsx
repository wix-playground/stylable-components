import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, ampmLabels, Format,
    formatTimeChunk, getCircularValue, is12TimeFormat, isTimeSegment,
    isTouch, isValidValue, Segment, selectionIndexes, TimeSegment, to24, toAmpm, validInputStringRE
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
    format: Format;
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
    return `${formatTimeChunk(hh || 0)}:${formatTimeChunk(mm || 0)}`;
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
    private ampm: HTMLDivElement | null;
    private lastValue: string | undefined;

    constructor(props: Props) {
        super();
        const format = isTouch ? '24h' : props.format!;
        this.lastValue = props.value;
        this.state = {
            format,
            focus: false,
            currentSegment: 'hh',
            ...this.getInitialSegments(props.value, format)
        };
    }

    public componentWillReceiveProps(props: Props, state: State) {
        if (props.value !== this.props.value) {
            this.setState(this.getInitialSegments(props.value, state.format), () => {
                const {focus, currentSegment} = this.state;
                if (focus && currentSegment) {
                    this.select(currentSegment);
                }
            });
        }
    }

    public render() {
        const {focus, inputValue, ampm, format} = this.state;
        const {label, name, placeholder, disabled} = this.props;

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
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    onMouseDown={this.onInputMouseDown}
                    onMouseUp={this.onInputMouseUp}
                    onClick={this.onInputClick}
                />
                {format === 'ampm' && inputValue &&
                    <div
                        data-automation-id="TIME_PICKER_AMPM"
                        className="ampm"
                        ref={elem => this.ampm = elem}
                        tabIndex={disabled || isTouch ? -1 : 0}
                        children={ampmLabels[ampm]}
                        onMouseDown={this.onAmpmMouseDown}
                        onFocus={this.onAmpmFocus}
                        onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                    />
                }
                {!isTouch && !disabled && inputValue &&
                    <Stepper
                        className="stepper"
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
                            onBlur={this.onBlur}
                            onChange={this.onNativeInputChange}
                        />
                    </label>
                }
            </div>
        );
    }

    private getInitialSegments(value: string | undefined, format: Format): Pick<State, Segment | 'inputValue'> {
        const segments = propsValueToSegments(value, format);
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

    private select(segment: Segment) {
        const indexes = selectionIndexes[segment];
        const input = this.input!;
        this.setState({
            currentSegment: segment,
            inputValue: segmentsToInputValue(this.state)
        }, () => {
            if (isTimeSegment(segment)) {
                input.focus();
                input.selectionStart = indexes[0];
                input.selectionEnd = indexes[1];
            } else {
                this.ampm!.focus();
            }
        });
    }
    private moveSelection(step: number): boolean {
        const {ampm} = this.state;
        const segments = Object.keys(selectionIndexes) as Segment[];
        const index = segments.indexOf(this.state.currentSegment!);
        const nextSegment = segments[index + step];
        if (isTimeSegment(nextSegment) || nextSegment === 'ampm' && this.ampm) {
            this.select(nextSegment);
            return true;
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
            if (isTimeSegment(name)) {
                this.input!.focus();
                this.select(name);
            }
            this.commit();
        });
    }

    private toggleAmpm(shouldSelect: boolean): void {
        this.updateSegmentValue('ampm', ampmSwitch[this.state.ampm]);
        if (shouldSelect) {
            this.ampm!.focus();
        } else {
            this.ampm!.blur();
        }
    }

    private changeValue(step: number): void {
        const {currentSegment, ampm} = this.state;
        if (!isTimeSegment(currentSegment)) {
            return this.toggleAmpm(true);
        }
        const newValue = getCircularValue(currentSegment, (this.state[currentSegment] || 0) + step, ampm);
        this.updateSegmentValue(currentSegment, newValue);
    }

    private onStepperUp = () => this.changeValue(1);
    private onStepperDown = () => this.changeValue(-1);

    private onAmpmMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        this.toggleAmpm(document.activeElement === this.ampm);
    }

    private onAmpmFocus = (e: React.SyntheticEvent<HTMLDivElement>) => {
        this.setState({focus: true, currentSegment: 'ampm'});
    }

    private onInputMouseDown = (e: any): void => {
        // when user select text with double click
        if (e.detail > 1) {
            e.preventDefault();
        }
    }
    private onInputMouseUp = (e: any): void => e.preventDefault();

    private getSegmentUnderCursor(): Segment {
        const cursorPosition = this.input!.selectionStart;
        let key: Segment;
        for (key in selectionIndexes) {
            if (cursorPosition >= selectionIndexes[key][0] && cursorPosition <= selectionIndexes[key][1]) {
                return key;
            }
        }
        return 'hh';
    }

    private onInputClick = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const currentSegment = this.getSegmentUnderCursor();
        this.select(currentSegment);
    }

    private onInputChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const {ampm, format} = this.state;
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
            !isValidValue(mm, 'mm', ampm)
        ) {
            return;
        }

        const input = this.input!;
        const cursorPosition = this.input!.selectionStart;
        const currentSegment = this.getSegmentUnderCursor() as TimeSegment;
        const updatedValue = currentSegment === 'hh' ? hh : mm;
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
        const segments = propsValueToSegments(value, this.state.format);
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
        if (!this.state.inputValue) {
            return this.updateSegmentValue('hh', 1);
        }

        const input = this.input!;
        // initial focus (default tab behaviour)
        if (input.selectionEnd - input.selectionStart === input.value.length) {
            e.preventDefault();
            this.select('hh');
        }
    }
    private onBlur = (e: React.SyntheticEvent<HTMLElement>) => {
        this.setState({
            focus: false,
            inputValue: segmentsToInputValue(this.state)
        });
        this.commit();
    }

    private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        const {currentSegment} = this.state;
        const keyCode = keycode(e.keyCode);

        // prevent default for and char (a-z) and also for any didgit (0-9) for ampm segment
        // this is needed to disallow user to move reset select state on input
        if (
            isTimeSegment(currentSegment) &&
            /^\D$/.test(keyCode) &&
            !e.ctrlKey && !e.altKey && !e.metaKey
        ) {
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
            case 'page up':
                e.preventDefault();
                if (currentSegment === 'mm') {
                    this.changeValue(10);
                }
                break;
            case 'page down':
                e.preventDefault();
                if (currentSegment === 'mm') {
                    this.changeValue(-10);
                }
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
                    this.toggleAmpm(true);
                }
        }
    }

    private commit = () => {
        const value = this.getValue();
        if (this.state.inputValue && this.props.onChange && this.lastValue !== value) {
            this.lastValue = value;
            this.props.onChange(value);
        }
    }

}
