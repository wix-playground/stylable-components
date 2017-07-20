import React = require('react');
import {EventHandler, ReactElement, SyntheticEvent} from "react";
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
const style = require('./radio-group.css');

export interface RadioGroupProps {
    children?: any;
    dataSource?: string[];
    onChange: (e: string) => void;
    disabled?: boolean;
    location?: "right" | "left";
    name?: string;
}

let counter = 0;

export interface RadioState {
    checked: boolean;
}

@observer
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    name: string;
    checkedArray: Array<RadioState>;

    static defaultProps = {
        location: 'right',
        disabled: false
    };

    constructor(props: RadioGroupProps) {
        super(props);
        this.checkedArray = [];
        let flag = true;
        if (this.props.children) {
            for (let i = 0; i < this.props.children.length; i++) {
                this.checkedArray.push(observable({checked: flag ? this.props.children[i].props.checked: false}));
                if (this.props.children[i].props.checked) {
                    flag = false;
                }
            }
        } else if(this.props.dataSource) {
            for (let i = 0; i < this.props.dataSource.length; i++) {
                this.checkedArray.push(observable({checked: false}));
            }
        }
        this.name = this.props.name ? this.props.name : 'name_' + counter++;
    }

    childrenOnClick(index: number) {
        return (e: string) => {
            this.checkedArray.forEach((value) => {
                value.checked = false;
            });
            this.checkedArray[index].checked = true;
            this.props.onChange(e);
        };
    }

    render() {
        let childArray;
        if (this.props.children) {
            childArray = React.Children.map(this.props.children, (child, index) => {
                if (React.isValidElement(child) &&  child.type === RadioButton) {
                    const props = {automationId: 'RADIO_BUTTON_' + index,
                        checked: this.checkedArray[index].checked,
                        onClick: this.childrenOnClick(index),
                        disabled: this.props.disabled ? true : (child.props as RadioButtonProps).disabled,
                        location: this.props.location,
                        name: this.name};
                    return React.cloneElement(child as ReactElement<any>, props);
                } else {
                    return child;
                }
            })
        } else if (this.props.dataSource) {
            childArray = this.props.dataSource.map((item, index) => {
                return <RadioButton key={index} value={item} onClick={this.childrenOnClick(index)} automationId={'RADIO_BUTTON_' + index} />
            })
        }
        return (
            <div data-automation-id="RADIO_GROUP">
                {childArray}
            </div>);
    }
}

export interface RadioButtonProps {
    value: string;
    checked?: boolean;
    name?: string;
    onClick?: (e: string) => void;
    disabled?: boolean;
    location?: "right" | "left";
    automationId?: string;
}

@observer
export class RadioButton extends React.Component<RadioButtonProps, {}> {

    static defaultProps: RadioButtonProps = {
        value: '',
        checked: false,
        name: '',
        onClick: () => {},
        location: 'right',
        disabled: false,
        automationId: ''
    };

    @action
    onClick: EventHandler<SyntheticEvent<HTMLDivElement>> = () => {
        if (!this.props.disabled) {
            this.props.onClick!(this.props.value);
        }
    };

    render() {
        return (
            <div data-automation-id={this.props.automationId} className={style['radio-container']} onClick={this.onClick}>
                {this.props.location === "left" ? <span data-automation-id="LABEL">{this.props.value}</span> : ''}
                <div data-automation-id="INPUT_CONTAINER" className={this.props.disabled ? style['disabled'] : style['enabled']}>
                    {this.props.checked ? checkedRadioSvg(this.props.disabled!) : emptyRadioSvg(this.props.disabled!)}
                    <input type="radio"
                           className={style['radio-input']}
                           data-automation-id={'INPUT'}
                           value={this.props.value}
                           checked={this.props.checked}
                           name={this.props.name}
                           disabled={this.props.disabled}
                           readOnly={true}/>
                </div>
                {this.props.location === "right" ? <span data-automation-id="LABEL">{this.props.value}</span> : ''}
            </div>
        )
    }
}

function emptyRadioSvg(disabled: boolean) {
    const svgColor = disabled ? "#d1d1d1" : "#4A90E2";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={style['radio-svg']} viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7.5" fill="none" fillRule="evenodd" stroke={svgColor} />
        </svg>
    )
}

function checkedRadioSvg(disabled: boolean) {
    const svgColor = disabled ? "#d1d1d1" : "#4A90E2";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={style['radio-svg']} viewBox="0 0 16 16">
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
