import React = require('react');
import {stylable} from 'wix-react-tools';
import listStyle from './selection-list.st.css';

export const divider = Symbol('divider');

export const Divider: React.SFC = stylable(listStyle)(
    () => <div className="divider" data-automation-id="DIVIDER" />
);
