import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, ampmLabels, Format,
    formatTimeChunk, getCircularValue, is12TimeFormat, isNative,
    isTimeSegment, isValidValue, Segment, TimeSegment, to24, toAmpm
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
    focus: boolean;
    hh?: string;
    mm?: string;
    format: Format;
    ampm: Ampm;
    currentSegment: Segment;
}

const ampmSwitch = {
    [Ampm.AM]: Ampm.PM,
    [Ampm.PM]: Ampm.AM,
    [Ampm.NONE]: Ampm.NONE
};
const segments: Segment[] = ['hh', 'mm', 'ampm'];

function propsValueToSegments(value?: string, format?: Format): {hh?: string, mm?: string, ampm: Ampm} {
    const isAmpm = format === 'ampm';
    if (!value) {
        return {
            ampm: isAmpm ? Ampm.AM : Ampm.NONE
        };
    }
    const [hh24, mm] = value.split(':').map(Number);
    const {hh, ampm} = toAmpm(hh24);
    return {
        mm: formatTimeChunk(mm),
        hh: formatTimeChunk(isAmpm ? hh : hh24),
        ampm: isAmpm ? ampm : Ampm.NONE
    };
}

@SBComponent(styles)
export class TimePicker extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        format: is12TimeFormat ? 'ampm' : '24h',
        disabled: false
    };
    private segments: {
        hh?: HTMLInputElement | null,
        mm?: HTMLInputElement | null,
        ampm?: HTMLDivElement | null
    };
    private lastValue: string | undefined;

    constructor(props: Props) {
        super();
        const format = isNative ? '24h' : props.format!;
        this.lastValue = props.value;
        this.segments = {};
        this.state = {
            format,
            focus: false,
            currentSegment: 'hh',
            ...propsValueToSegments(props.value, format)
        };
    }

    public componentWillReceiveProps(props: Props, state: State) {
        if (props.value !== this.props.value) {
            this.setState(propsValueToSegments(props.value, this.state.format), () => {
                const {focus, currentSegment} = this.state;
                if (!isNative && focus && currentSegment) {
                    this.select(currentSegment);
                }
            });
        }
    }

    public render() {
        const {focus, hh, mm, ampm, format} = this.state;
        const {label, placeholder, disabled} = this.props;
        const isValueSet = hh !== undefined || mm !== undefined;
        const timeSegments: TimeSegment[] = ['hh', 'mm'];

        return (
            <div
                data-automation-id="TIME_PICKER"
                cssStates={{
                    focus,
                    disabled: disabled!,
                    empty: !isValueSet
                }}
            >
                {timeSegments.map(segment =>
                    <div key={segment} className={'input-wrap ' + segment}>
                        <input
                            data-automation-id={'TIME_PICKER_INPUT_' + segment.toUpperCase()}
                            className="input"
                            type="text"
                            tabIndex={isNative ? -1 : 0}
                            ref={elem => this.segments[segment] = elem}
                            value={this.state[segment] || ''}
                            placeholder="00"
                            disabled={disabled}
                            name={segment}
                            onMouseDown={this.onInputMouseDown}
                            onChange={this.onInputChange}
                            onFocus={this.onInputFocus}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                        />
                    </div>
                )}
                {format === 'ampm' &&
                    <div
                        data-automation-id="TIME_PICKER_AMPM"
                        className="ampm"
                        ref={elem => this.segments.ampm = elem}
                        tabIndex={disabled || isNative ? -1 : 0}
                        children={ampmLabels[ampm]}
                        onMouseDown={this.onAmpmMouseDown}
                        onFocus={this.onAmpmFocus}
                        onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                    />
                }
                {placeholder && !isValueSet &&
                    <div
                        data-automation-id="TIME_PICKER_PLACEHOLDER"
                        className="placeholder"
                        children={placeholder}
                        onClick={this.onPlaceholderClick}
                    />
                }
                {!isNative && !disabled && isValueSet &&
                    <Stepper
                        className="stepper"
                        onUp={this.onStepperUp}
                        onDown={this.onStepperDown}
                    />
                }
                <label className="label" cssStates={{visible: isNative}}>
                    <input
                        className="native-input"
                        type="time"
                        tabIndex={isNative ? 0 : -1}
                        name={name}
                        aria-label={label}
                        value={this.getValue()}
                        disabled={disabled}
                        onFocus={this.onNantiveInputFocus}
                        onBlur={this.onBlur}
                        onChange={this.onNativeInputChange}
                    />
                </label>
            </div>
        );
    }

    private getValue(): string {
        const {hh = 0, mm = 0, ampm} = this.state;
        const hhString = formatTimeChunk(to24(Number(hh), ampm));
        const mmString = formatTimeChunk(mm);
        return `${hhString}:${mmString}`;
    }

    private select(segment: Segment): void {
        const input = this.segments[segment]!;
        this.setState({
            currentSegment: segment
        }, () => {
            input.focus();
            if (isTimeSegment(segment)) {
                (input as HTMLInputElement).select();
            }
        });
    }

    private moveSelection(step: number): boolean {
        const index = segments.indexOf(this.state.currentSegment!);
        const nextSegment = segments[index + step];
        if (this.segments[nextSegment]) {
            this.select(nextSegment);
            return true;
        }
        return false;
    }

    private updateSegmentValue(name: Segment, value: string | Ampm): void {
        this.setState({
            [name as any]: value
        }, () => {
            if (isTimeSegment(name)) {
                this.select(name);
            }
            this.commit();
        });
    }

    private toggleAmpm(shouldSelect: boolean): void {
        this.updateSegmentValue('ampm', ampmSwitch[this.state.ampm]);
        if (shouldSelect) {
            this.segments.ampm!.focus();
        } else {
            this.segments.ampm!.blur();
        }
    }

    private changeValue(step: number): void {
        const {currentSegment, ampm} = this.state;
        if (!isTimeSegment(currentSegment)) {
            return this.toggleAmpm(true);
        }
        let newValue: any = Number(this.state[currentSegment] || 0) + step;
        newValue = getCircularValue(currentSegment, newValue, ampm);
        newValue = formatTimeChunk(newValue);
        this.updateSegmentValue(currentSegment, newValue);
    }

    private onPlaceholderClick = () => this.segments.hh!.focus();

    private onStepperUp = () => this.changeValue(1);
    private onStepperDown = () => this.changeValue(-1);

    private onAmpmMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!this.props.disabled) {
            this.toggleAmpm(document.activeElement === this.segments.ampm);
        }
    }

    private onAmpmFocus = (e: React.SyntheticEvent<HTMLDivElement>) => {
        this.setState({focus: true, currentSegment: 'ampm'});
    }

    private onInputMouseDown = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        e.preventDefault();
        e.currentTarget.focus();
    }

    private onInputChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const {ampm} = this.state;
        const {value} = e.currentTarget;
        const name = e.currentTarget.name as TimeSegment;
        const numValue = Number(value);
        if (!isValidValue(numValue, name, ampm)) {
            return;
        }
        const shouldWaitForInput = isValidValue(numValue * 10, name, ampm);
        this.setState({
            currentSegment: name,
            [name as any]: shouldWaitForInput ? value : formatTimeChunk(value)
        }, () => {
            if (!shouldWaitForInput) {
                this.moveSelection(1);
                this.commit();
            }
        });
    }

    private onNativeInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState(
            propsValueToSegments(e.currentTarget.value, this.state.format),
            this.commit
        );
    }

    private onNantiveInputFocus = () => {
        this.setState({focus: true});
    }

    private onInputFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {hh, mm} = this.state;
        const input = e.currentTarget;
        const update: Pick<State, TimeSegment | 'focus' | 'currentSegment'> = {
            focus: true,
            currentSegment: e.currentTarget.name as Segment
        };
        if (!hh && !mm) {
            update.hh = '12';
            update.mm = '00';
        }
        this.setState(update, () => {
            input.select();
        });
    }
    private onBlur = (e: React.SyntheticEvent<HTMLElement>) => {
        this.setState({focus: false});
        this.commit();
    }

    private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        const {currentSegment} = this.state;
        const keyCode = keycode(e.keyCode);

        // prevent default for and char (a-z)
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
                    this.updateSegmentValue(currentSegment, '00');
                } else {
                    this.moveSelection(-1);
                }
                break;
            case 'space':
            case 'enter':
                e.preventDefault();
                if (isTimeSegment(currentSegment)) {
                    this.moveSelection(1);
                } else {
                    this.toggleAmpm(true);
                }
                break;
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
