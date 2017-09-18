import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {globalId} from 'wix-react-tools';

const {getRootId} = globalId;

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export class Portal extends React.PureComponent<PortalProps> {
    private container: HTMLDivElement | null;
    private portalContent: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        const {children, ...rest} = this.props;
        const id = getRootId(this);
        this.portalContent = (
            <div id={id} {...rest} data-automation-id="PORTAL">{children}</div>
        );
        return <span data-id={id} data-automation-id="ID_SPAN"/>;
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
