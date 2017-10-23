import * as React from 'react';

export interface TabProps {
    value?: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const Tab: React.StatelessComponent<TabProps> = props => null;
