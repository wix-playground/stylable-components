import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from '../../demo/style.st.css';

export const WithTheme = (Component: any, theme = styles): React.SFC => {
    return stylable(theme)(() => <div>{Component}</div>);
};
