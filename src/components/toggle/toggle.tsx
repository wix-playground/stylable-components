import * as PropTypes from 'prop-types';
import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {isRTLContext} from '../../utils';
import {FormInputProps} from '../../types/forms';
import style from './toggle.st.css';

export interface Props extends FormInputProps<boolean> {
    className?: string;
    error?: boolean;
    disabled?: boolean;
    label?: string;
    tabIndex?: number;
    required?: boolean;
    name?: string;
}
export interface State {
    focus: boolean;
}

@stylable(style)
export default class Toggle extends React.Component<Props, State> {
    public static defaultProps = {
        value: false,
        disabled: false,
        error: false,
        required: false
    };
    public static contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };

    public state = {
        focus: false
    };

    private shouldResetFocus: boolean = false;

    public render() {
        const {
            value,
            disabled,
            error,
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
                style-state={{
                    checked: value!,
                    disabled: disabled!,
                    focus: focus!,
                    error: error!,
                    rtl: isRTLContext(this.context)
                }}
            >
                {!disabled &&
                    <input
                        data-automation-id="TOGGLE_INPUT"
                        className="input"
                        type="checkbox"
                        name={name}
                        aria-label={label}
                        checked={value}
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
        const {disabled, value, onChange} = this.props;
        if (!disabled && onChange) {
            onChange({value: !value});
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
