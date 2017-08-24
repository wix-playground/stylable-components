import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {noop} from '../../utils';
import style from './radio-button.st.css';

export interface RadioChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    value: string;
}

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    checked?: boolean;
    name?: string;
    onChange?: (event: RadioChangeEvent) => void;
    disabled?: boolean;
    location?: 'right' | 'left';
}

export interface RadioButtonState {
    isFocused: boolean;
}

@SBComponent(style)
export class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    public static defaultProps: Partial<RadioButtonProps> = {
        onChange: noop,
        location: 'right',
        checked: false, // required for a bug in firefox
        tabIndex: 0
    };

    public state: RadioButtonState = {isFocused: false};

    private inputRef: HTMLInputElement | null = null;

    public render() {
        const rootProps = root(this.props, {
            className: 'root'
        });

        const cssStates = {
            checked: this.props.checked,
            disabled: this.props.disabled,
            isLeftLabel: this.props.location === 'left',
            focused: this.state.isFocused
        };

        const {onChange, location, children, ...restOfProps} = this.props;
        return (
            <div
                {...rootProps}
                onClick={this.onRootClick}
                cssStates={cssStates}
            >
                <input
                    {...restOfProps}
                    type="radio"
                    className="radioInput"
                    data-automation-id="NATIVE_INPUT"
                    ref={ref => this.inputRef = ref}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                />
                <div className="contentContainer">
                    <div
                        data-automation-id="INPUT_CONTAINER"
                        className="iconContainer"
                    >
                        {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                    </div>
                    <span className="radioLabel" data-automation-id="LABEL">{this.props.value}</span>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private onRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
        this.inputRef && this.inputRef.click();
    }

    private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.props.onChange!({...e, value: this.props.value});
        }
    }

    private onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({isFocused: true});
    }

    private onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({isFocused: false});
    }
}

function emptyRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.radioSVG}
            viewBox="0 0 16 16"
            data-automation-id="UNCHECKED_RADIO_ICON"
            focusable="false"
        >
            <circle cx="8" cy="8" r="7.5"/>
        </svg>
    );
}

function checkedRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={style.radioSVG}
            viewBox="0 0 16 16"
            data-automation-id="CHECKED_RADIO_ICON"
            focusable="false"
        >
            <defs>
                <circle id="a" cx="8" cy="8" r="8"/>
            </defs>
            <g>
                <circle cx="8" cy="8" r="6.75" stroke="#FFF" strokeWidth="2.5" className="checkMark"/>
                <circle cx="8" cy="8" r="7.5"/>
            </g>
        </svg>
    );
}
