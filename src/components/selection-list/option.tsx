import React = require('react');
import {stylable} from 'wix-react-tools';
import style from './option.st.css';
import {SelectionListItemValue} from './selection-list-model';

export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    focused?: boolean;
    id?: string;
    selected?: boolean;
    // The value is not used by the option component, it only exists to expose the option's value to the list model.
    value?: SelectionListItemValue;
}

export const SelectionListOption: React.SFC<OptionProps> = stylable(style)(
    props => (
        <div
            id={props.id}
            role="option"
            aria-selected={props.selected || undefined}
            aria-disabled={props.disabled || undefined}
            style-state={{
                disabled: Boolean(props.disabled),
                selected: Boolean(props.selected),
                focused:  Boolean(props.focused)
            }}
        >
            {props.children}
        </div>
    )
);
