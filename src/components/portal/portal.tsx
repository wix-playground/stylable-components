import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export class Portal extends React.PureComponent<PortalProps, {}> {
    private container: Element | null;
    private portalContent: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        this.portalContent = (
            <div data-automation-id="PORTAL" style={this.props.style}>
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

    private renderPortal() {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portalContent, this.getContainer());
    }

    private getContainer() {
        return this.container = this.container || document.body.appendChild(document.createElement('div'));
    }
}
