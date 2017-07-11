import * as React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    /** URL the link points to */
    href: string;

    /** Content to be wrapped  */
    children: React.ReactNode;
}

export class Link extends React.Component<LinkProps, {}>{
    render() {
        const { children, ...rest } = this.props;
        return <a {...rest}>{children}</a>
    }
}
