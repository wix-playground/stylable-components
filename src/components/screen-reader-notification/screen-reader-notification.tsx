import * as React from 'react';
import {Stylesheet} from 'stylable';
import {SBStateless} from 'stylable-react-component';
import styles from './screen-reader-notification.st.css';

export type Stylesheet = Stylesheet;
export const ScreenReaderNotification = SBStateless(
    ({children}: {children: React.ReactNode}) => {
        return (
            <p
                role="alert"
                children={children}
            />
        );
    },
    styles
);
