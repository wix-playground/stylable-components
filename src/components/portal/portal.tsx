import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export class Portal extends React.PureComponent<PortalProps, {}> {
    private container: HTMLDivElement | null;
    private portalContent: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        this.portalContent = (
            <div data-automation-id="PORTAL" className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        );

        return null;
    }

    public componentDidMount() {
        this.renderPortal();
    }

    public componentDidUpdate() {
        this.renderPortal();
    }

    public componentWillUnmount() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    public getPortalContainer(): HTMLDivElement | null {
        return this.container;
    }

    private renderPortal() {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portalContent, this.getContainer());
    }

    private getContainer() {
        return this.container = this.container || document.body.appendChild(document.createElement('div'));
    }
}
