import React = require('react');
import {EventHandler, ReactElement} from "react";
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
const style = require('./radio-group.css');

export interface RadioGroupProps {
    data: string[];
    onChange: any;
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

    constructor(props: RadioGroupProps) {
        super(props);
        this.checkedArray = [];
        for (let i = 0; i < this.props.data.length; i++) {
            this.checkedArray.push(observable({checked: false}))
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
        return (
            <div data-automation-id="RADIO_GROUP">
                {this.props.data.map((value: string, index: number) => {
                    return (
                        <RadioButton key={index} value={value} checked={this.checkedArray[index].checked} onClick={this.childrenOnClick(index)} name={this.name} location={this.props.location ? this.props.location : 'right'} automationId={'RADIO_BUTTON_' + index}/>
                    );
                })}
            </div>);
    }
}

export interface RadioButtonProps {
    value: string;
    checked?: boolean;
    name?: string;
    onClick?: any;
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
        automationId: ''
    };

    @action
    onClick: EventHandler<any> = () => {
        this.props.onClick(this.props.value);
    };

    render() {
        return (
            <div data-automation-id={this.props.automationId} className={style['radio-container']} onClick={this.onClick}>
                {this.props.location === "left" ? <span data-automation-id="LABEL">{this.props.value}</span> : ''}
                <div data-automation-id="INPUT_CONTAINER">
                    {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                    <input type="radio" className={style['radio-input']} data-automation-id={'INPUT'} value={this.props.value} checked={this.props.checked} name={this.props.name} readOnly={true}/>
                </div>
                {this.props.location === "right" ? <span data-automation-id="LABEL">{this.props.value}</span> : ''}
            </div>
        )
    }
}

function emptyRadioSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={style['radio-svg']} viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7.5" fill="none" fillRule="evenodd" stroke="#4A90E2"/>
        </svg>
    )
}

function checkedRadioSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={style['radio-svg']} viewBox="0 0 16 16">
            <defs>
                <circle id="a" cx="8" cy="8" r="8"/>
            </defs>
            <g fill="none" fillRule="evenodd">
                <use fill="#4A90E2" xlinkHref="#a"/>
                <circle cx="8" cy="8" r="6.75" stroke="#FFF" strokeWidth="2.5"/>
                <circle cx="8" cy="8" r="7.5" stroke="#4A90E2"/>
            </g>
        </svg>

    );
}
