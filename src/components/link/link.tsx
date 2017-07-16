import * as React from 'react';

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
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
