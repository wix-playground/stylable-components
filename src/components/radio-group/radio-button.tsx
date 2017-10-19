import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {StylableProps} from '../../types/props';
import {noop} from '../../utils';
import style from './radio-button.st.css';

export interface RadioButtonProps extends FormInputProps<string>, StylableProps {
    checked?: boolean;
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
                    className="hiddenInput"
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
                    autoFocus={this.props.autoFocus}
                />
                <div className="contentContainer" data-automation-id="CONTENT_CONTAINER">
                    <span className="button" data-automation-id="ICON" />
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
