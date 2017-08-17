import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {ItemValue} from './basic-list';
import listStyle from './selection-list.st.css';

export interface OptionProps {
    value?: ItemValue;
    disabled?: boolean;
    selected?: boolean;
    focused?: boolean;
}

@SBComponent(listStyle)
export class Option extends React.Component<OptionProps, {}> {
    public render() {
        const props = {
            cssStates: {
                disabled: this.props.disabled,
                selected: this.props.selected,
                focused:  this.props.focused
            }
        };

        return (
            <div
                className="item"
                data-value={this.props.value}
                data-disabled={this.props.disabled || undefined}
                {...props as React.HtmlHTMLAttributes<HTMLDivElement>}
            >
                {this.props.children}
            </div>
        );
    }
}
