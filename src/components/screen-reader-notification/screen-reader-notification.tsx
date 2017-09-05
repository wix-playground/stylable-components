import * as React from 'react';
import {SBStateless} from 'stylable-react-component';
import styles from './screen-reader-notification.st.css';

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
