import * as React from 'react';
import {stylable} from 'wix-react-tools';
import theme from '../../demo/style-default.st.css';

export const WithThemeDAID = 'THEMED_CONTAINER';
export const WithTheme = (Node?: React.ReactNode): React.SFC => {
    return stylable(theme)(
        () => <div data-automation-id={WithThemeDAID}>{Node}</div>
    );
};
