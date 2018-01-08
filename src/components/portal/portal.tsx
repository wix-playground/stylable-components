import {OverlayManager} from 'html-overlays';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {globalId} from 'wix-react-tools';

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    tagName?: string;
    overlayManager?: OverlayManager;
}

let globalOverlayManager: OverlayManager | undefined;

export function clearOverlayManager() {
    if (globalOverlayManager) {
        globalOverlayManager.removeSelf();
        globalOverlayManager = undefined;
    }
}

export class Portal extends React.PureComponent<PortalProps> {
    public static defaultProps: Partial<PortalProps> = {
        tagName: 'div'
    };
    public destroy: () => void;
    public parentTarget: Element;
    public overlayManager: OverlayManager | undefined;
    public uniqueId: string;

    public render() {
        this.uniqueId = globalId.getRootId(this);
        return this.renderRoot({visibility: 'hidden'}, false, {'data-automation-id': 'PORTAL_REF'});
    }

    public componentDidMount() {
        if (this.props.overlayManager) {
            this.overlayManager = this.props.overlayManager;
        } else if (globalOverlayManager) {
            this.overlayManager = globalOverlayManager;
            const portalRoot = globalOverlayManager.getPortalRoot();
            if (portalRoot.parentElement!.lastChild !== portalRoot) {
                portalRoot.parentElement!.appendChild(portalRoot);
            }
        } else {
            globalOverlayManager = this.overlayManager = new OverlayManager(document.body);
        }

        const root: HTMLElement = ReactDOM.findDOMNode(this);
        // create layer
        const {parentTarget, destroy} = this.overlayManager.createOverlay(root);
        this.destroy = destroy;
        this.parentTarget = parentTarget;
        // render target into parentTarget
        this.renderPortal();
    }

    public componentDidUpdate() {
        this.renderPortal();
    }

    public componentWillUnmount() {
        this.destroy && this.destroy();
    }

    private renderRoot(portalStyle: React.CSSProperties, renderChildren: boolean, extraProps?: any) {
        const {tagName: TagName, style, children, overlayManager, ...rest} = this.props;
        return React.createElement(
            TagName!,
            {'style': {...style, ...portalStyle}, 'data-id': this.uniqueId, ...rest, ...extraProps},
            renderChildren ? children : null
        );
    }

    private renderPortal() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.renderRoot(
                {
                    visibility: 'visible',
                    pointerEvents: 'all'
                },
                true,
                {'data-automation-id': this.uniqueId}
            ),
            this.parentTarget
        );
    }
}
