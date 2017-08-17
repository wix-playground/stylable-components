import React = require('react');
import {SBStateless} from 'stylable-react-component';
import listStyle from './selection-list.st.css';

export const divider = {};

export const Divider: React.SFC<{}> = SBStateless(
    () => <div className="divider" data-automation-id="DIVIDER" />,
    listStyle
);
