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

    public render() {
        const {value, boxIcon, tickIcon, indeterminateIcon, onChange, disabled,
               readonly, indeterminate, tabIndex, id, children, ...rest} = this.props;
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
                indeterminate: indeterminate!
        };

        return (
            <div
                {...rootProps as any}
                onClick={this.onClick}
                cssStates={cssStates}
                role="checkbox"
                aria-checked={indeterminate ? 'mixed' : value}
                tabIndex={tabIndex}
            >

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

                <input
                    data-automation-id="NATIVE_CHECKBOX"
                    type="checkbox"
                    className="nativeCheckbox"
                    defaultChecked={value}
                    disabled={disabled}
                    id={id}
                />
            </div>
        );
    }

    private onClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        if (!this.props.disabled && !this.props.readonly) {
            this.props.indeterminate ? this.props.onChange!(true) : this.props.onChange!(!this.props.value);
        }
    }
}
