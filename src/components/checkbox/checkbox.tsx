import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import styles from './checkbox.st.css';

export interface CheckBoxProps extends FormInputProps<boolean>, properties.Props {
    boxIcon?: React.ComponentType<CheckBoxIconProps>;
    tickIcon?: React.ComponentType<CheckBoxIconProps>;
    indeterminateIcon?: React.ComponentType<CheckBoxIconProps>;
    children?: React.ReactNode;
    indeterminate?: boolean;
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

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = properties(props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
        >
            <path d="M.5.5h15v15H.5z" />
        </svg>
    );
});

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = properties(props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
        >
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6" />
        </svg>
    );
});

const DefaultIndeterminateSVG: React.SFC<CheckBoxIconProps> = properties(props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            focusable="false"
        >
            <line x1="4" y1="8" x2="12" y2="8" />
        </svg>
    );
});

@stylable(styles)
@properties
export class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
    public static defaultProps: Partial<CheckBoxProps> = {
        boxIcon: DefaultCheckBoxSVG,
        tickIcon: DefaultTickMarkSVG,
        indeterminateIcon: DefaultIndeterminateSVG,
        onChange: noop,
        indeterminate: false,
        tabIndex: 0
    };

    public state: CheckBoxState = {isFocused: false};

    public render() {
        const BoxIcon = this.props.boxIcon!;
        const IndeterminateIcon = this.props.indeterminateIcon!;
        const TickIcon = this.props.tickIcon!;
        const styleState = {
            checked: this.props.value!,
            disabled: this.props.disabled!,
            readonly: this.props.readOnly!,
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
                    required={this.props.required}
                />

                <BoxIcon
                    className="boxIcon"
                    data-automation-id="CHECKBOX_BOX"
                />

                {this.props.indeterminate &&
                    <IndeterminateIcon
                        className="indeterminateIcon"
                        data-automation-id="CHECKBOX_INDETERMINATE"
                    />
                }
                {!this.props.indeterminate && this.props.value &&
                    <TickIcon
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
        if (!this.props.disabled && !this.props.readOnly) {
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
