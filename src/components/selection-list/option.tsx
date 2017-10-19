import React = require('react');
import {stylable} from 'wix-react-tools';
import style from './option.st.css';
import {SelectionListItemValue} from './selection-list-model';

export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    focused?: boolean;
    selected?: boolean;
    value?: SelectionListItemValue;
}

export const SelectionListOption: React.SFC<OptionProps> = stylable(style)(
    props => (
        <div
            data-value={props.disabled ? undefined : props.value}
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
