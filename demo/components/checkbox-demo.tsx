import React = require('react');
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {CheckBox, CheckBoxIconProps} from "../../src/components/checkbox/checkbox";

export const demoCheckBoxText: string = 'I agree to the terms above';
export const demoCheckBoxInitialValue: boolean = false;

const style = require('./checkbox-demo.css');

@observer
export class CheckBoxDemo extends React.Component<{},{value: boolean}> {

    @observable value: boolean = demoCheckBoxInitialValue;

    handleChange = (val: boolean) => {this.value = val};

    render() {
        return (
            <div>
                <CheckBox value={this.value}
                          text={demoCheckBoxText}
                          boxIcon={CheckBoxSVG}
                          tickIcon={TickMarkSVG}
                          onChange={this.handleChange}/> <br/>
                <button disabled={!this.value}>
                    Submit
                </button>
            </div>
        )
    }
}

const CheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIconDefault + (props.value ? ' ' + style.boxIconChecked :'')}
             viewBox="0 0 16 16"
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg" >
            <path fill="none" stroke="#D1D1D1" d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const TickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg" >
            <path stroke="#FFF" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};
