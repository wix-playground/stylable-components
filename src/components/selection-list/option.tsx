import React = require('react');
import {SBStateless} from 'stylable-react-component';
import {SelectionListItemValue} from './selection-list-model';
import listStyle from './selection-list.st.css';

export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    focused?: boolean;
    selected?: boolean;
    value?: SelectionListItemValue;
}

export const Option: React.SFC<OptionProps> = SBStateless(
    props => (
        <div
            className="item"
            data-value={props.disabled ? undefined : props.value}
            cssStates={{
                disabled: Boolean(props.disabled),
                selected: Boolean(props.selected),
                focused:  Boolean(props.focused)
            }}
        >
            {props.children}
        </div>
    ),
    listStyle
);
