import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {CheckBox, CheckBoxIconProps} from '../../src';
import style from './checkbox-demo.st.css';

export const demoCheckBoxText: string = 'Yes, I\'m over 18 years old';

@SBComponent(style)
export class CheckBoxDemo extends React.Component<{}, {}> {
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
        );
    }
}

export class BasicDemo extends React.Component<{}, {value: boolean}> {

    state = {
        value: false
    };

    handleChange = (val: boolean) => { this.setState({value: val}); };

    render() {
        return (
            <div data-automation-id="BASIC_DEMO">
                <CheckBox value={this.state.value}
                          onChange={this.handleChange}>
                    <span data-automation-id="BASIC_LABEL" className={style.label}>{demoCheckBoxText}</span>
                </CheckBox> <br/>
                <button disabled={!this.state.value} data-automation-id="BUTTON_SUBMIT">
                    Proceed
                </button>
            </div>
        );
    }
}

export class DisabledDemo extends React.Component<{}, {value: boolean}> {

    state = {
        value: false
    };

    handleChange = (val: boolean) => { this.setState({value: val} ); };

    render() {
        return (
            <div>
                <span data-automation-id="DISABLED_DEMO">
                    <CheckBox value={this.state.value}
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
        );
    }
}

export class IndeterminateDemo extends React.Component<{}, {value1: boolean, value2: boolean}> {

    state = {
        value1: true,
        value2: false
    };

    render() {
        return (
            <ul data-automation-id="INDETERMINATE_DEMO">
                <CheckBox value={this.state.value1 && this.state.value2}
                          onChange={(val: boolean) => { this.setState({value1: val, value2: val}); }}
                          indeterminate={this.state.value1 !== this.state.value2}
                          data-automation-id="INDETERMINATE_DEMO_TOP_LEVEL">
                    <span data-automation-id="DISABLED_LABEL" className={style.label}>All Options</span>
                </CheckBox>
                <li  style={{listStyle: 'none', marginLeft: '1em'}}>
                    <CheckBox value={this.state.value1}
                              onChange={(val: boolean) => this.setState({value1: val})}
                              data-automation-id="INDETERMINATE_DEMO_OPTION1">
                        <span className={style.label}>Option1</span>
                    </CheckBox>
                </li>
                <li  style={{listStyle: 'none', marginLeft: '1em'}}>
                    <CheckBox value={this.state.value2}
                              onChange={(val: boolean) => this.setState({value2: val})}
                              data-automation-id="INDETERMINATE_DEMO_OPTION2">
                        <span className={style.label}>Option2</span>
                    </CheckBox>
                </li>
            </ul>
        );
    }
}

class CustomIconsDemo extends React.Component<{}, {value: boolean}> {

    state = {
        value: false
    };

    handleChange = (val: boolean) => { this.setState({value: val} ); };

    render() {
        return (
            <div>
                <CheckBox value={this.state.value} onChange={this.handleChange} boxIcon={CheckBoxSVG} tickIcon={TickMarkSVG}>
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
    );
};

const CheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIcon + (props.value ? ' ' + style.boxIconChecked : '')}
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M 10,1 20,20 1,20 z"/>
        </svg>
    );
};
