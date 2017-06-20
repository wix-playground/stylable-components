import * as React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    type?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';

    /** Content to be wrapped  */
    children: React.ReactNode;
}

export class Heading extends React.Component<HeadingProps, {}>{
    static defaultProps: Partial<HeadingProps> = { type: 'H1' }

    render() {
        const { children, ...rest } = this.props;
        return React.createElement(this.props.type!.toLowerCase(), rest, children);
    }
}
