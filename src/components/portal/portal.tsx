import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
    open: boolean;
    style?: React.CSSProperties;
}

export class Portal extends React.Component<PortalProps, {}> {
    private static defaultProps: Partial<PortalProps> = { style: {} };
    private container: Element | null;
    private portal: React.ReactElement<any>;

    public render() {
        return null;
    }

    public componentDidMount() {
        if (this.props.open) {
            this.renderPortal();
        }
    }

    public componentWillReceiveProps(newProps: PortalProps) {
        if (!newProps.open && this.props.open) {
            this.destroyPortal();
        } else if (newProps.open) {
            this.renderPortal();
        }
    }

    public componentWillUnmount() {
        this.destroyPortal();
    }

    private renderPortal() {
        this.container = this.getContainer();
        this.createPortal();
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
