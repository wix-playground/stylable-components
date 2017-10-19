import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import styles from './checkbox.st.css';

export interface CheckBoxProps extends FormInputProps<boolean>, properties.Props {
    tickIcon?: React.ReactNode;
    indeterminateIcon?: React.ReactNode;
    children?: React.ReactNode;
    error?: boolean;
    indeterminate?: boolean;
    id?: string;
}

export interface CheckBoxState {
    isFocused: boolean;
}

@stylable(styles)
@properties
export class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
    public static defaultProps: Partial<CheckBoxProps> = {
        tickIcon: (
            <span
                className={`${styles.icon} ${styles.tickIcon}`}
                data-automation-id="CHECKBOX_TICKMARK"
            />
        ),
        indeterminateIcon: (
            <span
                className={`${styles.icon} ${styles.indeterminateIcon}`}
                data-automation-id="CHECKBOX_INDETERMINATE"
            />
        ),
        onChange: noop,
        indeterminate: false,
        tabIndex: 0
    };

    public state: CheckBoxState = {isFocused: false};

    public render() {

        const styleState = {
            checked: this.props.value!,
            disabled: this.props.disabled!,
            readonly: this.props.readOnly!,
            indeterminate: this.props.indeterminate!,
            focus: this.state.isFocused,
            error: this.props.error
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
                    className="nativeCheckbox"
                    checked={this.props.value}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    autoFocus={this.props.autoFocus}
                    name={this.props.name}
                />

                <span
                    className="box"
                    data-automation-id="CHECKBOX_BOX"
                >
                    {this.props.indeterminate ?
                        this.props.indeterminateIcon : (this.props.value && this.props.tickIcon)}
                </span>

                {this.props.children ? (
                        <div
                            data-automation-id="CHECKBOX_CHILD_CONTAINER"
                            className="childContainer"
                        >
                            {this.props.children}
                        </div>
                    ) : null
                }
            </div>
        );
    }

    private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.props.onChange!({
                value: this.props.indeterminate ? true : !this.props.value
            });
        }
    }

    private handleInputFocus = () => {
        this.setState({isFocused: true});
    }

    private handleInputBlur = () => {
        this.setState({isFocused: false});
    }
}
