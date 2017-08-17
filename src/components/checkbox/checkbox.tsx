import * as React from 'react';
import { SBComponent } from 'stylable-react-component';
import { root } from 'wix-react-tools';
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
    children?: any;
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
    public static defaultProps: CheckBoxProps = {
        value: false,
        boxIcon: DefaultCheckBoxSVG,
        tickIcon: DefaultTickMarkSVG,
        indeterminateIcon: DefaultIndeterminateSVG,
        onChange: () => { },
        disabled: false,
        readonly: false,
        indeterminate: false,
        tabIndex: 0
    };

    public state = {isFocused: false};

    private inputRef: HTMLInputElement | null = null;

    public render() {
        const BoxIcon = this.props.boxIcon!;
        const IndeterminateIcon = this.props.indeterminateIcon!;
        const TickIcon = this.props.tickIcon!;
        const rootProps = root(this.props, {
            'data-automation-id': 'CHECKBOX_ROOT',
            'className': 'root'
        });
        const cssStates = {
            checked: this.props.value,
            disabled: this.props.disabled,
            readonly: this.props.readonly,
            indeterminate: this.props.indeterminate,
            focused: this.state.isFocused
        };

        return (
            <div
                {...rootProps as any}
                onClick={this.handleClick}
                cssStates={cssStates}
                role="checkbox"
                aria-checked={this.props.indeterminate ? 'mixed' : this.props.value}
            >

                <input
                    {...this.getInputImplicitProps()}
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="nativeCheckbox"
                    defaultChecked={this.props.value}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    ref={ref => this.inputRef = ref}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
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

    private handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        this.inputRef && this.inputRef.click();
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
            this.props.indeterminate ?
                this.props.onChange!({...e, value: true}) :
                this.props.onChange!({...e, value: !this.props.value});
        }
    }

    private handleFocus = () => {
        this.setState({isFocused: true});
    }

    private handleBlur = () => {
        this.setState({isFocused: false});
    }

    private getInputImplicitProps = (): React.HTMLAttributes<HTMLInputElement> => {
        const {value, boxIcon, indeterminate, indeterminateIcon, tickIcon,
               onChange, children, disabled, readonly, ...rest} = this.props;
        return {...rest};
    }
}
