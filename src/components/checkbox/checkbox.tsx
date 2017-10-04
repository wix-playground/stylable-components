import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import styles from './checkbox.st.css';

export interface CheckBoxProps extends FormInputProps<boolean>, properties.Props {
    tickIcon?: React.ReactNode;
    indeterminateIcon?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    readonly?: boolean;
    indeterminate?: boolean;
    tabIndex?: number;
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
        const {
            value, disabled, readonly,
            indeterminate, id, tabIndex,
            indeterminateIcon, tickIcon, children
        } = this.props;

        const styleState = {
            checked: value!,
            disabled: disabled!,
            readonly: readonly!,
            indeterminate: indeterminate!,
            focus: this.state.isFocused
        };

        return (
            <div
                data-automation-id="CHECKBOX_ROOT"
                onClick={this.handleChange}
                style-state={styleState}
                role="checkbox"
                aria-checked={indeterminate ? 'mixed' : value}
            >
                <input
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="nativeCheckbox"
                    checked={value}
                    disabled={disabled}
                    onChange={this.handleChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    id={id}
                    tabIndex={tabIndex}
                />

                <span
                    className="box"
                    data-automation-id="CHECKBOX_BOX"
                >
                    {indeterminate ? indeterminateIcon : (value && tickIcon)}
                </span>

                {children ? (
                        <div
                            data-automation-id="CHECKBOX_CHILD_CONTAINER"
                            className="childContainer"
                        >
                            {children}
                        </div>
                    ) : null
                }
            </div>
        );
    }

    private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
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
