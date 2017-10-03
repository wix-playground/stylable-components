import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import styles from './checkbox.st.css';

export interface CheckBoxProps extends FormInputProps<boolean>, properties.Props {
    children?: React.ReactNode;
    disabled?: boolean;
    readonly?: boolean;
    indeterminate?: boolean;
    tabIndex?: number;
    id?: string;
}

export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface CheckBoxState {
    isFocused: boolean;
}

@stylable(styles)
@properties
export class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
    public static defaultProps: Partial<CheckBoxProps> = {
        indeterminate: false,
        tabIndex: 0
    };

    public state: CheckBoxState = {isFocused: false};

    public render() {
        const styleState = {
            checked: this.props.value!,
            disabled: this.props.disabled!,
            readonly: this.props.readonly!,
            indeterminate: this.props.indeterminate!,
            focus: this.state.isFocused
        };

        return (
            <div
                data-automation-id="CHECKBOX_ROOT"
                onClick={this.handleChange}
                style-state={styleState}
                role="checkbox"
                aria-checked={this.props.indeterminate ? 'mixed' : this.props.value}
            >

                <input
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="hiddenInput"
                    checked={this.props.value}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                />

                <span
                    className="boxIcon"
                    data-automation-id="CHECKBOX_BOX"
                />

                {this.props.indeterminate &&
                    <span
                        className="indeterminateIcon"
                        data-automation-id="CHECKBOX_INDETERMINATE"
                    />
                }
                {!this.props.indeterminate && this.props.value &&
                    <span
                        className="tickIcon"
                        data-automation-id="CHECKBOX_TICKMARK"
                    />
                }
                {
                    this.props.children ?
                    <div data-automation-id="CHECKBOX_CHILD_CONTAINER" className="childContainer">
                        {this.props.children}
                    </div> : null
                }
            </div>
        );
    }

    private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
                this.props.onChange!({value: this.props.indeterminate ? true : !this.props.value});
        }
    }

    private handleInputFocus = () => {
        this.setState({isFocused: true});
    }

    private handleInputBlur = () => {
        this.setState({isFocused: false});
    }
}
