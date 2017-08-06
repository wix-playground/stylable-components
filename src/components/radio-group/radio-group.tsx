import React = require('react');
import {EventHandler, ReactElement, SyntheticEvent} from "react";
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
const style = require('./radio-group.st.css').default;

export interface RadioGroupProps {
    children?: any;
    dataSource?: RadioButtonProps[];
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
export class RadioGroup extends React.Component<Partial<RadioGroupProps>, {}> {
    name: string;
    checkedArray: Array<RadioState>;

    static defaultProps = {
        dataSource: [],
        location: 'right',
        disabled: false
    };

    constructor(props: RadioGroupProps) {
        super(props);
        this.checkedArray = [];
        if (this.props.children) {
            this.initCheckedArray(this.props.children, true);
        } else if(this.props.dataSource) {
            this.initCheckedArray(this.props.dataSource, false);
        }
        this.name = this.props.name ? this.props.name : 'radio_group_' + counter++;
    }

    initCheckedArray(dataArray: any[], isChildren: boolean = false) {
        let noCheckedRadioButton = true;
        for(let i = 0; i < dataArray.length; i++) {
            let button = dataArray[i];
            if (isChildren) {
                button = dataArray[i].props;
            }
            this.checkedArray.push(observable({checked: noCheckedRadioButton ? button.checked: false}));
            if (button.checked) {
                noCheckedRadioButton = false;
            }
        }
    }

    childrenOnClick(index: number) {
        return (value: string) => {
            this.checkedArray.forEach((data) => {
                data.checked = false;
            });
            this.checkedArray[index].checked = true;
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
    }

    createChildrenFromDataSource(): React.ReactNode[] {
        const childArray: React.ReactNode[] = [];
        if(Array.isArray(this.props.dataSource)) {
            this.props.dataSource!.forEach((data, index) => {
                const props: RadioButtonProps = {
                    key: index,
                    value: data.value,
                    automationId: 'RADIO_BUTTON_' + index,
                    checked: this.checkedArray[index].checked,
                    onClick: this.childrenOnClick(index),
                    disabled: this.props.disabled || data.disabled,
                    location: this.props.location,
                    name: this.name
                };
                childArray.push(React.createElement(RadioButton, props))
            })
        }
        return childArray;
    }

    createChildren(dataArray: any): React.ReactNode[] {
        const childArray: React.ReactNode[] = [];
        for (let index = 0; index < dataArray.length; index++) {
            const data = dataArray[index];

            if (data.type === RadioButton) {
                const props: RadioButtonProps = {
                    key: index,
                    value: data.props.value,
                    automationId: 'RADIO_BUTTON_' + index,
                    checked: this.checkedArray[index].checked,
                    onClick: this.childrenOnClick(index),
                    disabled: this.props.disabled || data.props.disabled,
                    location: this.props.location,
                    name: this.name};

                childArray.push(React.cloneElement(data as ReactElement<any>, props));
            } else {
                childArray.push(React.cloneElement(data as ReactElement<any>, {key: index,
                    checked: this.checkedArray[index].checked,
                    onClick: action(this.childrenOnClick(index))}));
            }
        }
        return childArray;
    }

    render() {
        let childArray: React.ReactNode[] = [];

        if (this.props.children) {
            if (React.isValidElement(this.props.children)) {
                childArray.push(this.props.children);
            } else {
                childArray = this.createChildren(this.props.children);
            }
        } else if (this.props.dataSource!.length > 0) {
            childArray = this.createChildrenFromDataSource();
        }

        return (
            <div data-automation-id="RADIO_GROUP">
                {childArray}
            </div>);
    }
}

export interface RadioButtonProps {
    key?: number;
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
                {this.props.location === "left" ? <span className={style.leftLabel} data-automation-id="LABEL">{this.props.value}</span> : ''}
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
                {this.props.location === "right" ? <span className={style.rightLabel} data-automation-id="LABEL">{this.props.value}</span> : ''}
                {this.props.children}
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
