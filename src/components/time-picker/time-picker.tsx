import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import {Stepper} from '../stepper';
import styles from './time-picker.st.css';
import {
    Ampm, Format, Segment,
    isTimeSegment, isValidValue, pad2, TimeSegment, to24, toAmpm
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
        format: is12TimeFormat ? 'ampm' : '24hr',
        disabled: false
    };
    private input: HTMLInputElement | null;
    private nativeInput: HTMLInputElement | null;
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
        const {focus, ampm, inputValue} = this.state;
        const {value, disabled} = this.props;
        const currentSegment = isTimeSegment(this.currentSegment) ? this.currentSegment : 'hh';
        const currentSegmentValue = this.state[currentSegment] || 0;

        return <div cssStates={{focus, disabled: disabled!}}>
            <input
                type="text"
                tabIndex={isTouch ? -1 : 0}
                className="input"
                ref={elem => this.input = elem}
                value={inputValue}
                disabled={disabled}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                onKeyDown={this.onInputKeyDown}
                onClick={this.onInputClick}
            />
            {!isTouch && !disabled &&
                <Stepper
                    className="stepper"
                    disableUp={!isValidValue(currentSegmentValue + 1, currentSegment, ampm)}
                    disableDown={!isValidValue(currentSegmentValue - 1, currentSegment, ampm)}
                    onUp={this.createStepperHandler(+1)}
                    onDown={this.createStepperHandler(-1)}
                />
            }
            <input
                className="native-input"
                tabIndex={isTouch ? 0 : -1}
                ref={elem => this.nativeInput = elem}
                type="time"
                value={this.getValue()}
                disabled={disabled}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                onChange={this.onNativeInputChange}
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
        const input = this.input!;
        this.currentSegment = segment;
        input.selectionStart = indexes[0];
        input.selectionEnd = indexes[1];
        return input.selectionStart !== input.selectionEnd;
    }
    private moveSelection(step: number) {
        const segments = Object.keys(selectionIndexes) as Segment[]
        const index = segments.indexOf(this.currentSegment!);
        const nextSegment = segments[index + step];
        if (nextSegment) {
            return this.select(nextSegment);
        }
        return false;
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
            this.input!.focus();
            this.select(name);
            this.commit();
        });
    }

    private toggleAmpm() {
        this.updateSegmentValue('ampm', 1 - this.state.ampm);
    }

    private changeValue(step: number) {
        const name = this.currentSegment || 'hh';
        if (!isTimeSegment(name)) {
            return this.toggleAmpm();
        }
        const {hh, mm, ampm} = this.state;
        const newValue = (this.state[name] || 0) + step;

        if (isValidValue(newValue, name, ampm)) {
            this.updateSegmentValue(name, newValue);
        }
    }

    private createStepperHandler = (step: number) => () => this.changeValue(step)

    private onInputClick = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const cursorPosition = e.currentTarget.selectionStart;
        let key: Segment;
        let currentSegment: Segment = 'hh';

        for (key in selectionIndexes) {
            if (cursorPosition >= selectionIndexes[key][0] && cursorPosition <= selectionIndexes[key][1]) {
                currentSegment = key;
            }
        }
        this.select(currentSegment);
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

    private onNativeInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const segments = propsValueToSegments(value, this.props.format);
        const inputValue = segmentsToInputValue(segments);
        this.setState({
            ...segments,
            inputValue
        }, this.commit);
    }

    private onInputFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: true});
        if (isTouch) {
            if (e.currentTarget !== this.nativeInput) {
                this.nativeInput!.focus();
                this.nativeInput!.click();
            }
        } else {
            const input = this.input!;
            // Initial focus (default tab behaviour)
            if (input.selectionEnd - input.selectionStart === input.value.length) {
                e.preventDefault();
                this.select('hh');
            }
        }
    }
    private onInputBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: false});
    }

    private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = keycode(e.keyCode);

        if (/[a-z]/.test(keyCode)) {
            return e.preventDefault();
        }

        switch(keyCode) {
            case 'left':
                this.moveSelection(-1)
                break;
            case 'right':
                this.moveSelection(1)
                break;
            case 'tab':
                const moved = this.moveSelection(e.shiftKey ? -1 : 1)
                if (moved) {
                    e.preventDefault();
                }
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
