import React = require('react');
import {SBComponent} from 'stylable-react-component';
import listStyle from '../selection-list.st.css';
import {ItemValue} from './model';

export interface OptionProps {
    value?: ItemValue;
    disabled?: boolean;
    selected?: boolean;
    focused?: boolean;
}

@SBComponent(listStyle)
export class OptionStylable extends React.PureComponent<OptionProps, {}> {
    public render() {
        return (
            <div
                className="item"
                data-value={this.props.value}
                data-disabled={this.props.disabled || undefined}
                cssStates={{
                    disabled: Boolean(this.props.disabled),
                    selected: Boolean(this.props.selected),
                    focused:  Boolean(this.props.focused)
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

const state = `data-${listStyle.$stylesheet.namespace}-`;
export class OptionNoStylable extends React.PureComponent<OptionProps, {}> {
    public render() {
        return React.createElement('div', {
            'className': listStyle.item,
            'data-value': this.props.value,
            'data-disabled': this.props.disabled || undefined,
            [state + 'disabled']: this.props.disabled || undefined,
            [state + 'selected']: this.props.selected || undefined,
            [state + 'focused']: this.props.focused || undefined
        }, this.props.children);
    }
}

export const Option = OptionStylable;
