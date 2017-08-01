import React = require('react');
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {CheckBox, CheckBoxIconProps} from "../../src";
import style from './checkbox-demo.st.css';
import buttonStyle from '../../src/style/default-theme/controls/button.st.css';
import {SBComponent} from "stylable-react-component";

export const demoCheckBoxText: string = "Yes, I'm over 18 years old";

@observer @SBComponent(style)
export class CheckBoxDemo extends React.Component<{},{}> {
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
export class BasicDemo extends React.Component<{}, {}> {
    @observable value: boolean = false;

    handleChange = (val: boolean) => { this.value = val };

    render() {
        return (
            <div data-automation-id="BASIC_DEMO">
                <CheckBox value={this.value}
                          onChange={this.handleChange}>
                    <span data-automation-id="BASIC_LABEL" className={style.label}>{demoCheckBoxText}</span>
                </CheckBox> <br/>
                <button className={buttonStyle.root} disabled={!this.value} data-automation-id="BUTTON_SUBMIT">
                    Proceed
                </button>
            </div>
        )
    }
}

@observer
export class DisabledDemo extends React.Component<{}, {}> {
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
                <span>
                    <CheckBox value={true} disabled indeterminate>
                        <span className={style.label}>Indeterminate</span>
                    </CheckBox>
                </span>
            </div>
        )
    }
}

@observer
export class IndeterminateDemo extends React.Component<{}, {}> {
    @observable value1: boolean = true;
    @observable value2: boolean = false;

    render() {
        return (
            <ul data-automation-id="INDETERMINATE_DEMO">
                <span data-automation-id="INDETERMINATE_DEMO_TOP_LEVEL">
                    <CheckBox value={this.value1 && this.value2}
                              onChange={(val: boolean) => { this.value1 = this.value2 = val}}
                              indeterminate={this.value1 !== this.value2}>
                        <span data-automation-id="DISABLED_LABEL" className={style.label}>All Options</span>
                    </CheckBox>
                </span>
                <li  style={{listStyle:'none', marginLeft:'1em'}} data-automation-id="INDETERMINATE_DEMO_OPTION1">
                    <CheckBox value={this.value1} onChange={(val: boolean) => this.value1 = val}>
                        <span className={style.label}>Option1</span>
                    </CheckBox>
                </li>
                <li  style={{listStyle:'none', marginLeft:'1em'}} data-automation-id="INDETERMINATE_DEMO_OPTION2">
                    <CheckBox value={this.value2} onChange={(val: boolean) => this.value2 = val} data-automation-id="INDETERMINATE_DEMO_OPTION2">
                        <span className={style.label}>Option2</span>
                    </CheckBox>
                </li>
            </ul>
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
