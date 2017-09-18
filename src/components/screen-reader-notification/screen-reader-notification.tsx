import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './screen-reader-notification.st.css';

export const ScreenReaderNotification: React.SFC =
    stylable(styles)(({children}: {children: React.ReactNode}) => {
        return (
            <p
                data-automation-id="SCREEN_READER_NOTIFICATION"
                role="alert"
                children={children}
            />
        );
});
