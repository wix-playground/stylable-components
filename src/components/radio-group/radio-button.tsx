import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import style from './radio-button.st.css';

export interface RadioButtonProps extends FormInputProps<string> {
    checked?: boolean;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    className?: string;
}

export interface RadioButtonState {
    isFocused: boolean;
}

@stylable(style)
@properties
export class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    public static defaultProps: Partial<RadioButtonProps> = {
        onChange: noop,
        checked: false, // required for a bug in firefox
        tabIndex: 0
    };

    public state: RadioButtonState = {isFocused: false};

    public render() {
        const styleState = {
            checked: this.props.checked,
            disabled: this.props.disabled,
            focused: this.state.isFocused
        };

        return (
            <div
                data-automation-id="RADIO_BUTTON_ROOT"
                onClick={this.onChange}
                style-state={styleState}
                role="radio"
                aria-checked={this.props.checked}
            >
                <input
                    type="radio"
                    className="radioInput"
                    data-automation-id="NATIVE_INPUT"
                    onChange={this.onChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    value={this.props.value}
                    tabIndex={this.props.tabIndex}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    name={this.props.name}
                />
                <div className="contentContainer">
                    <div
                        data-automation-id="INPUT_CONTAINER"
                        className="iconContainer"
                    >
                        {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                    </div>
                    <span className="radioLabel" data-automation-id="LABEL">{this.props.value}</span>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private onChange = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.props.onChange!({value: this.props.value!});
        }
    }

    private onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({isFocused: true});
    }

    private onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({isFocused: false});
    }
}

function emptyRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.radioSVG}
            viewBox="0 0 16 16"
            data-automation-id="UNCHECKED_RADIO_ICON"
            focusable="false"
        >
            <circle cx="8" cy="8" r="7.5"/>
        </svg>
    );
}

function checkedRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={style.radioSVG}
            viewBox="0 0 16 16"
            data-automation-id="CHECKED_RADIO_ICON"
            focusable="false"
        >
            <defs>
                <circle id="a" cx="8" cy="8" r="8"/>
            </defs>
            <g>
                <circle cx="8" cy="8" r="6.75" stroke="#FFF" strokeWidth="2.5" className="checkMark"/>
                <circle cx="8" cy="8" r="7.5"/>
            </g>
        </svg>
    );
}
