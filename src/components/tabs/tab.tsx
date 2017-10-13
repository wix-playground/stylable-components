import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';

export interface TabProps extends properties.Props {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}

@properties
export class Tab extends React.Component<TabProps> {
    public render() {
        const {children} = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }
}
