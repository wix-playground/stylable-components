import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {noop} from '../../utils';
import styles from './checkbox.st.css';

export interface CheckBoxChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    value: boolean;
}

export interface CheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
    value: boolean;
    boxIcon: React.ComponentType<CheckBoxIconProps>;
    tickIcon: React.ComponentType<CheckBoxIconProps>;
    indeterminateIcon: React.ComponentType<CheckBoxIconProps>;
    onChange: (event: CheckBoxChangeEvent) => void;
    children?: React.ReactNode;
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
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

    private inputRef: HTMLInputElement | null = null;

    public render() {
        const {value, boxIcon, indeterminate, indeterminateIcon, tickIcon,
               onChange, children, disabled, readonly, ...rest} = this.props;

        const BoxIcon = boxIcon!;
        const IndeterminateIcon = indeterminateIcon!;
        const TickIcon = tickIcon!;
        const rootProps = root(this.props, {
            'data-automation-id': 'CHECKBOX_ROOT',
            'className': 'root'
        });
        const cssStates = {
            checked: value!,
            disabled: disabled!,
            readonly: readonly!,
            indeterminate: indeterminate!,
            focused: this.state.isFocused
        };

        return (
            <div
                {...rootProps as React.HTMLAttributes<HTMLDivElement>}
                onClick={this.handleRootClick}
                cssStates={cssStates}
                role="checkbox"
                aria-checked={indeterminate ? 'mixed' : value}
            >

                <input
                    {...rest}
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="nativeCheckbox"
                    checked={value}
                    disabled={disabled}
                    onChange={this.handleInputChange}
                    ref={this.handleInputRef}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                />

                <BoxIcon
                    value={value}
                    indeterminate={indeterminate}
                    disabled={disabled}
                />

                {indeterminate &&
                    <IndeterminateIcon
                        value={value}
                        indeterminate={indeterminate}
                        disabled={disabled}
                    />
                }
                {!indeterminate && value &&
                    <TickIcon
                        value={value}
                        indeterminate={indeterminate}
                        disabled={disabled}
                    />
                }

                {children}
            </div>
        );
    }

    private handleRootClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        this.inputRef && this.inputRef.click();
    }

    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
                this.props.onChange!({...e, value: this.props.indeterminate ? true : !this.props.value});
        }
    }

    private handleInputFocus = () => {
        this.setState({isFocused: true});
    }

    private handleInputBlur = () => {
        this.setState({isFocused: false});
    }

    private handleInputRef = (ref: HTMLInputElement | null) => {
        this.inputRef = ref;
    }
}
