import React = require('react');
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {CheckBox, CheckBoxIconProps} from "../../src";

export const demoCheckBoxText: string = "Yes, I'm over 18 years old";
export const demoCheckBoxInitialValue: boolean = false;

const style = require('./checkbox-demo.st.css').default;

@observer
export class CheckBoxDemo extends React.Component<{}, { value: boolean }> {

    @observable valueDisabled: boolean = demoCheckBoxInitialValue;


    handleChangeDisabled = (val: boolean) => {
        this.valueDisabled = val
    };

    render() {
        return (
            <div>
                <div>
                    <h3>Basic CheckBox</h3>
                    <BasicDemo/>
                </div>

                <div>
                    <h3>Disabled</h3>
                    <DisabledDemo/>
                </div>

                <div>
                    <h3>Indeterminate</h3>
                    <IndeterminateDemo/>
                </div>

                <div>
                    <h3>Custom Icons</h3>
                    <CustomIconsDemo/>
                </div>
            </div>
        )
    }
}

@observer
class BasicDemo extends React.Component<{}, {}> {
    @observable value: boolean = false;

    handleChange = (val: boolean) => { this.value = val };

    render() {
        return (
            <div data-automation-id="BASIC_DEMO">
                <CheckBox value={this.value}
                          onChange={this.handleChange}>
                    <span data-automation-id="BASIC_LABEL" className={style.label}>{demoCheckBoxText}</span>
                </CheckBox> <br/>
                <button disabled={!this.value} data-automation-id="BUTTON_SUBMIT">
                    Proceed
                </button>
            </div>
        )
    }
}

@observer
class DisabledDemo extends React.Component<{}, {}> {
    @observable value: boolean = false;

    handleChange = (val: boolean) => { this.value = val };

    render() {
        return (
            <div>
                <span data-automation-id="DISABLED_DEMO">
                    <CheckBox value={this.value}
                              onChange={this.handleChange}
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
        )
    }
}

@observer
class IndeterminateDemo extends React.Component<{}, {}> {
    @observable values: { option1: boolean, option2: boolean } = {option1: true, option2: false};

    onChanger(field: 'option1' | 'option2') {
        return (value: boolean) => this.values[field] = value
    }

    render() {
        return (
            <li data-automation-id="INDETERMINATE_DEMO">
                <CheckBox value={this.values.option1 && this.values.option2}
                          onChange={(val: boolean) => {
                              this.onChanger('option1')(val);
                              this.onChanger('option2')(val)
                          }}
                          indeterminate={this.values.option1 !== this.values.option2}>
                    <span data-automation-id="DISABLED_LABEL" className={style.label}>All Options</span>
                </CheckBox>
                <ul>
                    <CheckBox value={this.values.option1} onChange={this.onChanger('option1')}>
                        <span className={style.label}>Option1</span>
                    </CheckBox>
                </ul>
                <ul>
                    <CheckBox value={this.values.option2} onChange={this.onChanger('option2')}>
                        <span className={style.label}>Option2</span>
                    </CheckBox>
                </ul>
            </li>

        )
    }
}

@observer
class CustomIconsDemo extends React.Component<{},{}> {
    @observable value: boolean = false;

    handleChange = (val: boolean) => { this.value = val };

    render() {
        return (
            <div>
                <CheckBox value={this.value} onChange={this.handleChange} boxIcon={CheckBoxSVG} tickIcon={TickMarkSVG}>
                    <span className={style.label}>I choose triangle</span>
                </CheckBox>
            </div>
        );
    }
}

const TickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg" height="16" width="16">
            <circle cx="10" cy="14" r="4"/>
        </svg>
    )
};

const CheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIcon + (props.value ? ' ' + style.boxIconChecked : '')}
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M 10,1 20,20 1,20 z"/>
        </svg>
    )
};
