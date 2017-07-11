import React = require('react');
import {CheckBox} from "../src/components/checkbox/checkbox";

export const demoCheckBoxText: string = 'covfefe';
export const demoCheckBoxInitialValue: boolean = false;


export class CheckBoxDemo extends React.Component<{},{value: boolean}> {

    constructor() {
        super();
        this.state = {value: demoCheckBoxInitialValue};
    }

    handleChange = (val: boolean) => {this.setState({value: val})};

    render() {
        return (
            <div>
                <CheckBox value={this.state.value}
                          text={demoCheckBoxText}
                          boxIcon={'/test/assets/uncheckedCheckbox.svg'}
                          tickIcon={'/test/assets/tickMark.svg'}
                          onChange={this.handleChange}/>
            </div>
        )
    }

}
