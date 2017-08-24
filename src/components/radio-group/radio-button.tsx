import {action} from 'mobx';
import {observer} from 'mobx-react';
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

@SBComponent(style) @observer
export class RadioButton extends React.Component<RadioButtonProps, {}> {
    public static defaultProps: Partial<RadioButtonProps> = {
        onChange: noop,
        location: 'right',
        checked: false // required for a bug in firefox
    };

    public render() {
        const rootProps = root(this.props, {
            className: 'root'
        });

        const cssStates = {
            disabled: this.props.disabled,
            isLeftLabel: this.props.location === 'left'
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
                />
                <div className="contentContainer">
                    <div
                        data-automation-id="INPUT_CONTAINER"
                        className={this.props.disabled ? style.disabled : style.enabled}
                    >
                        {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                    </div>
                    <span className="radioLabel" data-automation-id="LABEL">{this.props.value}</span>
                    {this.props.children}
                </div>
            </div>
        );
    }

    @action
    private onRootClick: React.EventHandler<RadioChangeEvent> = e => {
        if (!this.props.disabled && !this.props.readOnly) {
            this.props.onChange!({...e, value: this.props.value});
        }
    }
}

function emptyRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.radioSVG}
            viewBox="0 0 16 16"
            data-automation-id="UNCHECKED_RADIO_ICON"
        >
            <circle cx="8" cy="8" r="7.5" fill="none"/>
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
        >
            <defs>
                <circle id="a" cx="8" cy="8" r="8"/>
            </defs>
            <g fill="none">
                <circle cx="8" cy="8" r="6.75" stroke="#FFF" strokeWidth="2.5" className="checkMark"/>
                <circle cx="8" cy="8" r="7.5"/>
            </g>
        </svg>
    );
}
