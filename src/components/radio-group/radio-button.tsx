import {action} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import style from './radio-group.st.css';

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
        onClick: () => {},
        location: 'right'
    };

    public render() {
        const rootProps = root(this.props, {
            className: 'radioContainer'
        });

        return (
            <div
                {...rootProps}
                onClick={this.onClick}
            >
                {
                    this.props.location === 'left' && (
                        <span className="leftLabel" data-automation-id="LABEL">{this.props.value}</span>
                    )
                }
                <div
                    data-automation-id="INPUT_CONTAINER"
                    className={this.props.disabled ? style.disabled : style.enabled}
                >
                    {
                        this.props.checked ?
                            checkedRadioSvg(this.props.disabled!) :
                            emptyRadioSvg(this.props.disabled!)
                    }
                    <input
                        type="radio"
                        className="radioInput"
                        data-automation-id={'INPUT'}
                        value={this.props.value}
                        checked={this.props.checked}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        readOnly={true}
                    />
                </div>
                {
                    this.props.location === 'right' && (
                        <span
                            className="rightLabel"
                            data-automation-id="LABEL"
                        >
                            {this.props.value}
                        </span>
                    )
                }
                {this.props.children}
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

function emptyRadioSvg(disabled: boolean) {
    const svgColor = disabled ? '#d1d1d1' : '#4A90E2';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.radioSVG}
            viewBox="0 0 16 16"
        >
            <circle cx="8" cy="8" r="7.5" fill="none" fillRule="evenodd" stroke={svgColor} />
        </svg>
    );
}

function checkedRadioSvg(disabled: boolean) {
    const svgColor = disabled ? '#d1d1d1' : '#4A90E2';
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
            <g fill="none" fillRule="evenodd">
                <use fill={svgColor} xlinkHref="#a"/>
                <circle cx="8" cy="8" r="6.75" stroke="#FFF" strokeWidth="2.5"/>
                <circle cx="8" cy="8" r="7.5" stroke={svgColor}/>
            </g>
        </svg>
    );
}
