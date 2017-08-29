import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import styles from './checkbox.st.css';

export interface CheckBoxProps extends FormInputProps<boolean> {
    boxIcon: React.ComponentType<CheckBoxIconProps>;
    tickIcon: React.ComponentType<CheckBoxIconProps>;
    indeterminateIcon: React.ComponentType<CheckBoxIconProps>;
    children?: React.ReactNode;
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
    tabIndex: number;
    id: string;
}

export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

export interface CheckBoxState {
    isFocused: boolean;
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={styles.boxIconDefault}
            data-automation-id="CHECKBOX_BOX"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
        >
            <path d="M.5.5h15v15H.5z" />
        </svg>
    );
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={styles.tickIcon}
            data-automation-id="CHECKBOX_TICKMARK"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
        >
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6" />
        </svg>
    );
};

const DefaultIndeterminateSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={styles.indeterminateIcon}
            data-automation-id="CHECKBOX_INDETERMINATE"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            focusable="false"
        >
            <line x1="4" y1="8" x2="12" y2="8" />
        </svg>
    );
};

@SBComponent(styles)
export class CheckBox extends React.Component<Partial<CheckBoxProps>, CheckBoxState> {
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
        const rootProps = root(this.props, {
            'data-automation-id': 'CHECKBOX_ROOT',
            'className': 'root'
        });
        const cssStates = {
            checked: this.props.value!,
            disabled: this.props.disabled!,
            readonly: this.props.readonly!,
            indeterminate: this.props.indeterminate!,
            focused: this.state.isFocused
        };

        return (
            <div
                {...rootProps}
                onClick={this.handleChange}
                cssStates={cssStates}
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
                />

                <BoxIcon
                    value={this.props.value}
                    indeterminate={this.props.indeterminate}
                    disabled={this.props.disabled}
                />

                {this.props.indeterminate &&
                    <IndeterminateIcon
                        value={this.props.value}
                        indeterminate={this.props.indeterminate}
                        disabled={this.props.disabled}
                    />
                }
                {!this.props.indeterminate && this.props.value &&
                    <TickIcon
                        value={this.props.value}
                        indeterminate={this.props.indeterminate}
                        disabled={this.props.disabled}
                    />
                }

                {this.props.children}
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
