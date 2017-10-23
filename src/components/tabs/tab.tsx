import * as React from 'react';

export interface TabProps {
    value?: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}

const Tab: React.StatelessComponent<TabProps> = props => null;
