import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
    open: boolean;
    style?: React.CSSProperties;
}

export class Portal extends React.PureComponent<PortalProps, {}> {
    private container: Element | null;
    private portal: React.DOMElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        this.createPortal();
        return null;
    }

    public componentDidMount() {
        this.renderPortal();
    }

    public componentDidUpdate() {
        if (!this.props.open) {
            this.destroyPortal();
        } else {
            this.renderPortal();
        }
    }

    public componentWillUnmount() {
        this.destroyPortal();
    }

    private renderPortal() {
        if (!this.props.open) { return; }
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portal, this.upsertContainer());
    }

    private destroyPortal() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    private upsertContainer() {
        if (!this.container) {
            this.container = document.body.appendChild(document.createElement('div'));
        }

        return this.container;
    }

    private createPortal() {
        if (!this.portal) {
            if (!this.props.children) {
                this.portal = <div data-automation-id="PORTAL" />;
            }

            this.portal = (
                <div
                    data-automation-id="PORTAL"
                    style={this.props.style}
                >
                    {this.props.children}
                </div>);
        } else {
            this.portal = React.cloneElement(this.portal, this.props.style);
        }

    }
}
