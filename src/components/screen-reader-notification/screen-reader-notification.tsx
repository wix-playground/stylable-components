import * as React from 'react';

export function ScreenReaderNotification({children}: {children: string}) {
    return (
        <p
            style={{
                position: 'fixed',
                bottom: '100%',
                left: '100%'
            }}
            role="alert"
            children={children}
        />
    );
}
