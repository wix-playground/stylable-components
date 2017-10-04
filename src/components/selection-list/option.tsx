import React = require('react');
import {stylable} from 'wix-react-tools';
import {SelectionListItemValue} from './selection-list-model';
import listStyle from './selection-list.st.css';

export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    focused?: boolean;
    id?: string;
    selected?: boolean;
    value?: SelectionListItemValue;
}

export const Option: React.SFC<OptionProps> = stylable(listStyle)(
    (props: OptionProps) => (
        <div
            id={props.id}
            className="item"
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
