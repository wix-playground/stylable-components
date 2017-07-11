import React = require('react');
import {ReactElement} from "react";

interface RadioGroupProps {
    children: JSX.Element[];
    onChange: any;
}

export class RadioGroup extends React.Component<RadioGroupProps, {}> {

    childrenOnClick = (e: any) => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (
            <div data-automation-id="RADIO_GROUP">
                {React.Children.map(this.props.children, (child, index) => {
                    if (React.isValidElement(child) && child.type === RadioButton) {
                        const props = Object.assign({}, child.props, {automationId: 'RADIO_BUTTON_' + index, onClick: this.childrenOnClick});
                        return React.cloneElement(child as ReactElement<any>, props);
                    }
                })}
            </div>);
    }
}

interface RadioButtonProps {
    value: string;
    onClick?: any;
    automationId?: string;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> {
    render() {
        return (<input type="radio" data-automation-id={this.props.automationId} onClick={this.props.onClick} value={this.props.value}/>)
    }

}
