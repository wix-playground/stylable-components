import React = require('react');
import {ReactElement} from "react";

interface RadioGroupProps {
    children: JSX.Element[];
    onChange: any;
}

let counter = 0;

export class RadioGroup extends React.Component<RadioGroupProps, {}> {

    constructor(props: RadioGroupProps) {
        super(props);
        counter++;
    }

    childrenOnClick = (e: any) => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (
            <div data-automation-id="RADIO_GROUP">
                {React.Children.map(this.props.children, (child, index) => {
                    if (React.isValidElement(child) && child.type === RadioButton) {
                        const props = Object.assign({}, child.props, {automationId: 'RADIO_BUTTON_' + index, onClick: this.childrenOnClick, name: 'name' + counter});
                        return React.cloneElement(child as ReactElement<any>, props);
                    }
                })}
            </div>);
    }
}

interface RadioButtonProps {
    value: string;
    name?: string;
    onClick?: any;
    automationId?: string;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> {
    render() {
        return (<input type="radio" data-automation-id={this.props.automationId} onClick={this.props.onClick} value={this.props.value} name={this.props.name}/>)
    }

}
