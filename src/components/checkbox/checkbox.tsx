import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {StylableProps} from '../../types/props';
import {noop} from '../../utils';
import styles from './checkbox.st.css';


export interface CheckBoxProps extends FormInputProps<boolean>, StylableProps {
    tickIcon?: React.ReactNode;
    indeterminateIcon?: React.ReactNode;
    children?: React.ReactNode;
    error?: boolean;
    indeterminate?: boolean;
    ['aria-controls']?: string[];
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

    private nativeInput: HTMLInputElement;

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
                onClick={this.handleClick}
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
                    onClick={this.handleInputClick}
                    onChange={this.handleChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    autoFocus={this.props.autoFocus}
                    name={this.props.name}
                    aria-controls={this.props['aria-controls']}
                    ref={ref => this.nativeInput = ref!}
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

    private handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
            this.handleChange(e);
            this.nativeInput && this.nativeInput.focus();
            this.setState({isFocused: false});
    }

    private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.props.onChange!({
                value: this.props.indeterminate ? true : !this.props.value
            });
        }
    }

    // handleInputClick will be called only on pressing "space" key when nativeInput has focus
    private handleInputClick: React.MouseEventHandler<HTMLInputElement> = e => {
        e.stopPropagation();
        this.setState({isFocused: true});
    }

    private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        this.state.isFocused && this.setState({isFocused: false});
    }

    private handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        !this.state.isFocused && this.setState({isFocused: true});
    }
}
