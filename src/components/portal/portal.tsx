import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {globalId} from 'wix-react-tools';
import {noop} from '../../utils';

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onLayout?(layout: ClientRect | null): void;
}

export class Portal extends React.PureComponent<PortalProps> {
    public static defaultProps: Partial<PortalProps> = {
        onLayout: noop
    };
    private container: HTMLDivElement | null;
    private portalContent: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        const {children, onLayout, ...rest} = this.props;
        const uniqueId = globalId.getRootId(this);
        this.portalContent = (
            <div {...rest} data-automation-id={uniqueId}>{children}</div>
        );
        return <span data-id={uniqueId} data-automation-id="PORTAL_REF" style={{display: 'none'}}/>;
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
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portalContent, this.getContainer(), this.onRender);
    }

    private getContainer() {
        return this.container = this.container || document.body.appendChild(document.createElement('div'));
    }

    private onRender = () => {
        if (this.props.onLayout !== noop) {
            const portalContent = this.container && this.container.firstElementChild;
            this.props.onLayout!(portalContent ? portalContent.getBoundingClientRect() : null);
        }
    }
}
