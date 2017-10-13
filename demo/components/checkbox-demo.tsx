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
                    <h3>Error</h3>
                    <ErrorDemo />
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

@stylable(style)
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

@stylable(style)
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

@stylable(style)
export class ErrorDemo extends React.Component<{}, {value: boolean}> {

    public state = {
        value: false
    };

    public render() {
        return (
            <div>
                <span data-automation-id="ERROR_DEMO">
                    <CheckBox
                        data-automation-id="ERROR_DEMO_CHECKBOX"
                        value={this.state.value}
                        onChange={this.handleChange}
                        error
                    >
                        <span data-automation-id="ERROR_LABEL" className={style.label}>Unchecked</span>
                    </CheckBox>
                </span>
                <span>
                    <CheckBox
                        value={true}
                        error
                    >
                        <span className={style.label}>Checked</span>
                    </CheckBox>
                </span>
                <span>
                    <CheckBox value={true} error indeterminate>
                        <span className={style.label}>Indeterminate</span>
                    </CheckBox>
                </span>
            </div>
        );
    }

    private handleChange = (e: ChangeEvent<boolean>) => { this.setState({value: e.value}); };
}

@stylable(style)
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

@stylable(style)
class CustomIconsDemo extends React.Component<{}, {value: boolean}> {
    public state = {
        value: false
    };

    public render() {
        return (
            <div className="customInput">
                <CheckBox
                    value={this.state.value}
                    onChange={this.handleChange}
                    tickIcon={(
                        <svg
                            viewBox="0 0 11 11"
                            xmlns="http://www.w3.org/2000/svg"
                            className="customTickIcon"
                            data-automation-id="CHECKBOX_TICKMARK"
                            focusable="false"
                        >
                            <circle cx="5.5" cy="5.5" r="2.5" />
                        </svg>
                    )}
                    id="myCustomCheckbox"
                    aria-labelledby="customLabel"
                />
                <label id="customLabel" htmlFor="myCustomCheckbox">
                    <span className={style.label} >I choose circle</span>
                </label>
            </div>
        );
    }
    private handleChange = (e: ChangeEvent<boolean>) => { this.setState({value: e.value}); };
}
