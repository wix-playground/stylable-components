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

    // Label and value are not used by the Option component, but SelectionList reads them for its own needs.
    label?: string;
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
