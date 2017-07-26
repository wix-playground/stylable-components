import React = require('react');
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {CheckBox, CheckBoxIconProps} from "../../src";

export const demoCheckBoxText: string = 'I agree to the terms above';
export const demoCheckBoxInitialValue: boolean = false;

const style = require('./checkbox-demo.st.css').default;

@observer
export class CheckBoxDemo extends React.Component<{},{value: boolean}> {

    @observable valueBasic: boolean = demoCheckBoxInitialValue;
    @observable valueDisabled: boolean = demoCheckBoxInitialValue;

    handleChangeBasic = (val: boolean) => {this.valueBasic = val};
    handleChangeDisabled = (val: boolean) => {this.valueDisabled = val};

    render() {
        return (
            <div>
                <div data-automation-id="BASIC_DEMO">
                    <h3>Basic CheckBox</h3>
                    <CheckBox value={this.valueBasic}
                              onChange={this.handleChangeBasic}>
                        <span data-automation-id="BASIC_LABEL" className={style.label}>{demoCheckBoxText}</span>
                    </CheckBox> <br/>
                    <button disabled={!this.valueBasic} data-automation-id="BUTTON_SUBMIT">
                        Submit
                    </button>
                </div>

                <div>
                    <h3>Disabled</h3>
                    <span data-automation-id="DISABLED_DEMO">
                        <CheckBox value={this.valueDisabled}
                                  onChange={this.handleChangeDisabled}
                                  disabled>
                            <span data-automation-id="DISABLED_LABEL" className={style.label}>Unchecked</span>
                        </CheckBox>
                    </span>
                    <span>
                        <CheckBox value={true} disabled>
                            <span className={style.label}>Checked</span>
                        </CheckBox>
                    </span>
                </div>
            </div>
        )
    }
}

const CheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIconDefault + (props.value ? ' ' + style.boxIconChecked :'')}
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg" >
            <path d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const TickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg" >
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};
