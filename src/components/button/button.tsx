import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './button.st.css';

export const Button = stylable(styles)(props => {
    return <button {...props}/>;
});
