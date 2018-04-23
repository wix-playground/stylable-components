import {OverlayManager} from 'html-overlays';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {globalId} from 'wix-react-tools';

import {omit} from '../../utils';
import {overlays} from './overlays';

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    tagName?: string;
    overlayManager?: OverlayManager;
    overlayRoot?: HTMLElement | null;
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
        this.overlayManager = this.props.overlayManager ||
            overlays.create(this, this.props.overlayRoot || document.body);

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
        if (!this.props.overlayManager) {
            overlays.clear(this, this.props.overlayRoot || document.body);
        }
    }

    private renderRoot(portalStyle: React.CSSProperties, renderChildren: boolean, extraProps?: any) {
        const {tagName, style, children, ...rest} = omit(this.props, 'overlayManager', 'overlayRoot');
        return React.createElement(
            tagName!,
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
