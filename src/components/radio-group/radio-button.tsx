import {action} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {noop} from '../../utils';
import style from './radio-button.st.css';

export interface RadioButtonProps {
    key?: number;
    value: string;
    checked?: boolean;
    name?: string;
    onClick?: (e: string) => void;
    disabled?: boolean;
    location?: 'right' | 'left';
    'data-automation-id'?: string;
}

@SBComponent(style) @observer
export class RadioButton extends React.Component<RadioButtonProps, {}> {
    public static defaultProps: RadioButtonProps = {
        value: '',
        onClick: noop,
        location: 'right',
        checked: false  // required for a bug in firefox
    };

    public render() {
        const rootProps = root(this.props, {
            className: 'root'
        });

        const cssStates = {
            disabled: this.props.disabled,
            isLeftLabel: this.props.location === 'left'
        };

        return (
            <div
                {...rootProps}
                onClick={this.onClick}
                cssStates={cssStates}
            >
                <div className="contentContainer">
                <div
                    data-automation-id="INPUT_CONTAINER"
                    className={this.props.disabled ? style.disabled : style.enabled}
                >
                    {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                    <input
                        type="radio"
                        className="radioInput"
                        data-automation-id="INPUT"
                        value={this.props.value}
                        checked={this.props.checked}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        readOnly={true}
                    />
                </div>

                {this.props.value && <span className="radioLabel" data-automation-id="LABEL">{this.props.value}</span>}
                {this.props.children}
                </div>
            </div>
        );
    }

    @action
    private onClick: React.EventHandler<React.SyntheticEvent<HTMLDivElement>> = () => {
        if (!this.props.disabled) {
            this.props.onClick!(this.props.value);
        }
    }
}

function emptyRadioSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.radioSVG}
            viewBox="0 0 16 16"
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
