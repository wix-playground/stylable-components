import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import style from './toggle.st.css';

export interface Props {
    className?: string;
    checked?: boolean;
    error?: boolean;
    disabled?: boolean;
    onChange?: (selected: boolean) => void;
    label?: string;
    tabIndex?: number;
    required?: boolean;
    name?: string;
    rtl?: boolean;
}
export interface State {
    focus: boolean;
}

@SBComponent(style)
export default class Toggle extends React.Component<Props, State> {
    public static defaultProps = {
        checked: false,
        disabled: false,
        error: false,
        rtl: false,
        required: false
    };

    public state = {
        focus: false
    };

    private shouldResetFocus: boolean = false;

    public render() {
        const {
            checked,
            disabled,
            error,
            rtl,
            label,
            name,
            required,
            tabIndex
        } = this.props;
        const {focus} = this.state;

        return (
            <label
                data-automation-id="TOGGLE"
                onMouseDown={this.onMouseDown}
                cssStates={{
                    checked: checked!,
                    disabled: disabled!,
                    focus: focus!,
                    error: error!,
                    rtl: rtl!
                }}
            >
                {!disabled &&
                    <input
                        data-automation-id="TOGGLE_INPUT"
                        className="input"
                        type="checkbox"
                        name={name}
                        aria-label={label}
                        checked={checked}
                        required={required}
                        onChange={this.toggle}
                        tabIndex={tabIndex}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                    />
                }
                <div className="switch-wrap">
                    <div className="switch"/>
                </div>
            </label>
        );
    }

    private onInputFocus = () => this.setState({focus: true});
    private onInputBlur = () => this.setState({focus: false});

    private toggle = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked);
        }
        if (this.shouldResetFocus) {
            this.setState({focus: false});
            this.shouldResetFocus = false;
        }
    }

    private onMouseDown = () => {
        this.shouldResetFocus = true;
    }
}
