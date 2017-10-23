import * as React from 'react';

export interface TabProps {
    value?: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}

export class Tab extends React.Component<TabProps> {
    public render() {
        return null;
    }
}
