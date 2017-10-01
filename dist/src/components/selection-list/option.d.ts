/// <reference types="react" />
import React = require('react');
import { SelectionListItemValue } from './selection-list-model';
export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    focused?: boolean;
    selected?: boolean;
    value?: SelectionListItemValue;
}
export declare const Option: React.SFC<OptionProps>;
