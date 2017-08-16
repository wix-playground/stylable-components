import * as React from 'react';
import { SBComponent } from 'stylable-react-component';
import { root } from 'wix-react-tools';
import style from './checkbox.st.css';

export interface CheckBoxProps {
    value: boolean;
    boxIcon: React.ComponentType<CheckBoxIconProps>;
    tickIcon: React.ComponentType<CheckBoxIconProps>;
    indeterminateIcon: React.ComponentType<CheckBoxIconProps>;
    onChange: (value: boolean) => void;
    children?: any;
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
    id?: string;
    tabIndex?: number;
}

export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={style.boxIconDefault}
            data-automation-id="CHECKBOX_BOX"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M.5.5h15v15H.5z" />
        </svg>
    );
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={style.tickIcon}
            data-automation-id="CHECKBOX_TICKMARK"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6" />
        </svg>
    );
};

const DefaultIndeterminateSVG: React.SFC<CheckBoxIconProps> = props => {
    return (
        <svg
            className={style.indeterminateIcon}
            data-automation-id="CHECKBOX_INDETERMINATE"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
        >
            <line x1="4" y1="8" x2="12" y2="8" />
        </svg>
    );
};

@SBComponent(style)
export class CheckBox extends React.Component<Partial<CheckBoxProps>, {}> {
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
            indeterminate: this.props.indeterminate
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
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="nativeCheckbox"
                    defaultChecked={this.props.value}
                    disabled={this.props.disabled}
                    id={this.props.id}
                    onChange={this.handleChange}
                    ref={ref => this.inputRef = ref}
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

    private handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        this.inputRef && this.inputRef.click();
    }

    private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
            this.props.indeterminate ? this.props.onChange!(true) : this.props.onChange!(!this.props.value);
        }
    }
}
