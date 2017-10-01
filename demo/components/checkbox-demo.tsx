import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ChangeEvent, CheckBox} from '../../src';
import style from './checkbox-demo.st.css';

export const demoCheckBoxText: string = 'Yes, I\'m over 18 years old';

@stylable(style)
export class CheckBoxDemo extends React.Component<{}, {}> {
    public render() {
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
                    <h3>Custom Checkbox</h3>
                    <CustomCheckboxDemo/>
                </div>
            </div>
        );
    }
}

export class BasicDemo extends React.Component<{}, {value: boolean}> {
    public state = {
        value: false
    };

    public render() {
        return (
            <div data-automation-id="BASIC_DEMO">
                <CheckBox
                    data-automation-id="BASIC_DEMO_CHECKBOX"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <span data-automation-id="BASIC_LABEL" className={style.label}>{demoCheckBoxText}</span>
                </CheckBox> <br/>
                <button disabled={!this.state.value} data-automation-id="BUTTON_SUBMIT">
                    Proceed
                </button>
            </div>
        );
    }
    private handleChange = (e: ChangeEvent<boolean>) => { this.setState({value: e.value}); };
}

export class DisabledDemo extends React.Component<{}, {value: boolean}> {

    public state = {
        value: false
    };

    public render() {
        return (
            <div>
                <span data-automation-id="DISABLED_DEMO">
                    <CheckBox
                        data-automation-id="DISABLED_DEMO_CHECKBOX"
                        value={this.state.value}
                        onChange={this.handleChange}
                        disabled
                    >
                        <span data-automation-id="DISABLED_LABEL" className={style.label}>Unchecked</span>
                    </CheckBox>
                </span>
                <span>
                    <CheckBox
                        value={true}
                        disabled
                    >
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

    private handleChange = (e: ChangeEvent<boolean>) => { this.setState({value: e.value}); };
}

export class IndeterminateDemo extends React.Component<{}, {value1: boolean, value2: boolean}> {

    public state = {
        value1: true,
        value2: false
    };

    public render() {
        return (
            <ul data-automation-id="INDETERMINATE_DEMO">
                <CheckBox
                    value={this.state.value1 && this.state.value2}
                    onChange={this.onChangeParent}
                    indeterminate={this.state.value1 !== this.state.value2}
                    data-automation-id="INDETERMINATE_DEMO_TOP_LEVEL"
                >
                    <span data-automation-id="DISABLED_LABEL" className={style.label}>All Options</span>
                </CheckBox>
                <li style={{listStyle: 'none', marginLeft: '1em'}}>
                    <CheckBox
                        value={this.state.value1}
                        onChange={this.onChangeChild1}
                        data-automation-id="INDETERMINATE_DEMO_OPTION1"
                    >
                        <span className={style.label}>Option1</span>
                    </CheckBox>
                </li>
                <li  style={{listStyle: 'none', marginLeft: '1em'}}>
                    <CheckBox
                        value={this.state.value2}
                        onChange={this.onChangeChild2}
                        data-automation-id="INDETERMINATE_DEMO_OPTION2"
                    >
                        <span className={style.label}>Option2</span>
                    </CheckBox>
                </li>
            </ul>
        );
    }

    private onChangeParent = (e: ChangeEvent<boolean>) => { this.setState({value1: e.value, value2: e.value}); };
    private onChangeChild1 = (e: ChangeEvent<boolean>) => { this.setState({value1: e.value}); };
    private onChangeChild2 = (e: ChangeEvent<boolean>) => { this.setState({value2: e.value}); };
}

export class CustomCheckboxDemo extends React.Component<{}, {value: boolean}> {
    public state = {
        value: false
    };

    public render() {
        return (
            <div data-automation-id="CUSTOMCHECKBOX_DEMO">
                <CheckBox
                    data-automation-id="CUSTOM_DEMO_CHECKBOX"
                    value={this.state.value}
                    onChange={this.handleChange}
                    className={style.customDemo}
                >
                    <span data-automation-id="CUSTOM_LABEL" className={style.label}>I'm a custom checkbox</span>
                </CheckBox>
            </div>
        );
    }
    private handleChange = (e: ChangeEvent<boolean>) => { this.setState({value: e.value}); };
}
