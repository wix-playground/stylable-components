import * as keycode from 'keycode';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import styles from './time-picker.st.css';
import {Ampm, FormatPart, isNumber, isValidValue, pad2, to24, toAmpm} from './utils';

export interface Props {
    value?: string;
    onChange?: (value: string) => void;
    use12Hours?: boolean;
    placeholder?: string;
}

export interface State {
    focus: boolean;
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
        use12Hours: is12TimeFormat
    };

    private inputs: {
        [key: string]: HTMLInputElement | null
    } = {}
    private committed = false

    constructor(props: Props) {
        super();
        this.state = {
            focus: false,
            ...this.getTimeParts(props.value, props.use12Hours)
        };
    }

    public componentWillReceiveProps(props: Props) {
        if (props.value && !this.state.focus) {
            this.setState(this.getTimeParts(props.value, props.use12Hours));
        }
    }

    public render() {
        const {focus, ampm} = this.state;
        const {use12Hours, value, placeholder} = this.props;
        const showPlaceholder = Boolean(placeholder) && !this.state.hh;
        const inputs = showPlaceholder ? ['hh'] : ['hh', 'mm'];
        const ampmLabel = ampm === Ampm.AM ? 'AM' : 'PM';

        return (
            <div data-automation-id="TIME_PICKER" cssStates={{focus}}>
                <div className="inputs">
                    {inputs.map((key: FormatPart) =>
                        <div className="input-wrap" key={key}>
                            <input
                                data-automation-id={'TIME_PICKER_' + key.toUpperCase()}
                                tabIndex={isTouch ? -1 : undefined}
                                placeholder={showPlaceholder ? placeholder : '––'}
                                cssStates={{wide: showPlaceholder}}
                                className="input"
                                ref={elem => this.inputs[key] = elem}
                                name={key}
                                value={this.state[key]}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                            />
                        </div>
                    )}
                </div>
                {use12Hours && !showPlaceholder && !isTouch &&
                    <input
                        data-automation-id="TIME_PICKER_AMPM_INPUT"
                        className="input ampm"
                        ref={elem => this.inputs.ampm = elem}
                        name="ampm"
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        value={ampmLabel}
                        onKeyDown={this.onAmpmKeyDown}
                        onKeyUp={this.onAmpmKeyUp}
                    />
                }
                {use12Hours && !showPlaceholder && isTouch &&
                    <div
                        data-automation-id="TIME_PICKER_AMPM_DIV"
                        className="ampm"
                        children={ampmLabel}
                        onTouchStart={this.onAmpmClick}
                    />
                }
                <input
                    className="native-input"
                    ref={elem => this.inputs.nativeInput = elem}
                    tabIndex={isTouch ? undefined : -1 }
                    type="time"
                    value={this.getValue()}
                    onChange={this.onNativeChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }

    private getTimeParts(value?: string, use12Hours?: boolean) {
        if (!value) {
            return {
                hh: '',
                mm: '',
                ampm: use12Hours ? Ampm.AM : Ampm.NONE
            };
        }
        const [hh24, mm] = value.split(':').map(pad2);
        const {hh, ampm} = toAmpm(Number(hh24));
        return {
            hh: use12Hours ? pad2(hh) : hh24,
            ampm: use12Hours ? ampm : Ampm.NONE,
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

    private onFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({focus: true});
        if (isTouch) {
            this.showNativeKeyboard();
        } else {
            e.currentTarget.select();
        }
    }

    private onBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const update: Partial<State> = {
            focus: false
        };
        if (name === 'hh' || name === 'mm') {
            update[name] = pad2(this.state[name]);
        }
        this.setState(update as State);
        this.commit();
    }

    private moveFocus(currentRefName: string, increment: number): boolean {
        const refIndex = inputNames.indexOf(currentRefName);
        const next = this.inputs[inputNames[refIndex + increment]];

        if (next) {
            next.focus();
            return true;
        }
        return false;
    }

    private onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {use12Hours} = this.props;
        const {ampm} = this.state;
        const {value} = e.currentTarget;
        const name = e.currentTarget.name as FormatPart;
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
        this.committed = false;
        this.setState(nextState, () => {
            if (!shouldWaitForInput) {
                this.commit();
                this.moveFocus(name, 1);
            }
        });
    }

    private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name as FormatPart;
        if (keycode(e.keyCode) !== 'backspace' || this.state[name].length) {
            return;
        }
        e.preventDefault();
        this.moveFocus(name, -1);
    }

    private onNativeChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.committed = false;
        this.setState(this.getTimeParts(value, this.props.use12Hours), this.commit);
    }

    private onAmpmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (keycode(e.keyCode)) {
            case 'space':
            case 'enter':
                this.toggleAmpm();
                break;
            case 'backspace':
                e.preventDefault();
                this.moveFocus('ampm', -1);
                break;
        }
    }

    private onAmpmKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.currentTarget.select();
    }

    private onAmpmClick = () => {
        const {focus} = this.state;
        this.toggleAmpm(() => {
            this.inputs.nativeInput!.blur();
            if (focus) {
                this.showNativeKeyboard();
            }
        });
    }

    private toggleAmpm = (cb?: () => void) => {
        const {hh, ampm} = this.state;
        this.setState({ampm: 1 - ampm}, () => {
            this.committed = false;
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
        if (this.props.onChange && !this.committed) {
            this.committed = true;
            this.props.onChange(this.getValue());
        }
    }

}
