import React = require('react');
import {EventHandler, ReactElement} from "react";
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

export interface RadioGroupProps {
    children: JSX.Element[];
    onChange: any;
    name?: string;
}

let counter = 0;

interface RadioState {
    checked: boolean;
}

@observer
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    name: string;
    checkedArray: Array<RadioState>;

    constructor(props: RadioGroupProps) {
        super(props);
        this.checkedArray = [];
        for (let i = 0; i < this.props.children.length; i++) {
            this.checkedArray.push(observable({checked:false}))
        }
        this.name = this.props.name ? this.props.name : 'name_' + counter;
        counter++;
    }

    childrenOnClick(index: number) {
        return (e: any) => {
            this.checkedArray.forEach((value) => {
                value.checked = false;
            });
            this.checkedArray[index].checked = true;
            this.props.onChange(e.target.value);
        };
    }

    render() {
        return (
            <div data-automation-id="RADIO_GROUP">
                {React.Children.map(this.props.children, (child, index) => {
                    if (React.isValidElement(child) && child.type === RadioButton) {
                        const props = Object.assign({}, child.props, {automationId: 'RADIO_BUTTON_' + index, checked: this.checkedArray[index].checked, onClick: this.childrenOnClick(index), name: this.name});
                        return React.cloneElement(child as ReactElement<any>, props);
                    }
                })}
            </div>);
    }
}

export interface RadioButtonProps {
    value: string;
    checked?: boolean;
    name?: string;
    onClick?: any;
    automationId?: string;
}

@observer
export class RadioButton extends React.Component<RadioButtonProps, {}> {

    static defaultProps: RadioButtonProps = {
        value: '',
        checked: false,
        name: '',
        onClick: () => {},
        automationId: ''
    };

    @action
    onClick: EventHandler<any> = (e: MouseEvent) => {
        this.props.onClick(e);
    };

    render() {
        return (
            <div data-automation-id={this.props.automationId} onClick={this.onClick}>
                {this.props.checked ? checkedRadioSvg() : emptyRadioSvg()}
                <input type="radio" data-automation-id={'INPUT'} value={this.props.value} checked={this.props.checked} name={this.props.name}/>
            </div>
        )
    }
}

function emptyRadioSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7.5" fill="none" fillRule="evenodd" stroke="#4A90E2"/>
        </svg>
    )
}

function checkedRadioSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
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
