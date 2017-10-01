/// <reference types="react" />
import * as React from 'react';
export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare class Portal extends React.PureComponent<PortalProps> {
    private container;
    private portalContent;
    render(): null;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getPortalContainer(): HTMLDivElement | null;
    private renderPortal();
    private getContainer();
}
