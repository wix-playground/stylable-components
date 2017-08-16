import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {SelectionListItemValue} from './selection-list-model';
import listStyle from './selection-list.st.css';

export interface OptionProps {
    value?: SelectionListItemValue;
    disabled?: boolean;
    selected?: boolean;
    focused?: boolean;
}

@SBComponent(listStyle)
export class Option extends React.Component<OptionProps, {}> {
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
