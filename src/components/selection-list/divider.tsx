import React = require('react');
import {stylable} from 'wix-react-tools';
import style from './divider.st.css';

export const SelectionListDividerSymbol = Symbol('divider');

export const SelectionListDivider: React.SFC = stylable(style)(
    () => <div data-automation-id="DIVIDER" />
);
