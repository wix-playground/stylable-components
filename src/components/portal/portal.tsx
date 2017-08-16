import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
    open: boolean;
    style?: React.CSSProperties;
}

export class Portal extends React.PureComponent<PortalProps, {}> {
    private container: Element | null;
    private portal: React.ReactElement<any>;

    public render() {
        this.createPortal();
        return null;
    }

    public componentDidMount() {
        if (this.props.open) {
            this.renderPortal();
        }
    }

    public componentDidUpdate() {
        if (this.props.open) {
            this.renderPortal();
        }
    }

    public componentWillReceiveProps(newProps: PortalProps) {
        if (!newProps.open && this.props.open) {
            this.destroyPortal();
        }
    }

    public componentWillUnmount() {
        this.destroyPortal();
    }

    private renderPortal() {
        this.container = this.getContainer();
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portal, this.container);
    }

    private destroyPortal() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    private getContainer() {
        return this.container ? this.container : document.body.appendChild(document.createElement('div'));
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
