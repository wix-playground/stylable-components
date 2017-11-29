import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {globalId} from 'wix-react-tools';
import {OverlayManager} from 'html-overlays';

export interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    tagName?: string;
    overlayManager?:OverlayManager;
}

export class Portal extends React.PureComponent<PortalProps> {
    public static defaultProps: Partial<PortalProps> = {
        tagName: 'div'
    };
    destroy:()=>void;
    parentTarget:Element;
    overlayManager:OverlayManager;
    uniqueId:string;

    // private container: HTMLDivElement | null;
    // private portalContent: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;

    public render() {
        // const {children, ...rest} = this.props;
        this.uniqueId = globalId.getRootId(this);
        return this.renderRoot({visibility:'hidden'}, false,{"data-automation-id":"PORTAL_REF"});
        // this.portalContent = (
        //     <div {...rest} data-automation-id={uniqueId}>{children}</div>
        // );
        // return <span data-id={uniqueId} data-automation-id="PORTAL_REF" style={{display: 'none'}}/>;
    }

    public componentDidMount() {
        if (this.overlayManager===undefined){   //TODO test dis
            this.overlayManager = this.props.overlayManager || new OverlayManager(document.body);
        }
        const root:HTMLElement = ReactDOM.findDOMNode(this);
        // create layer
        const {parentTarget,destroy} = this.overlayManager.createOverlay(root);
        this.destroy = destroy;
        this.parentTarget = parentTarget;
        //  render target into parentTarget
        this.renderPortal();
    }

    public componentDidUpdate() {
        this.renderPortal();
    }

    public componentWillUnmount() {
        this.destroy && this.destroy();

        // if (this.container) {
        //     ReactDOM.unmountComponentAtNode(this.container);
        //     document.body.removeChild(this.container);
        //     this.container = null;
        // }
    }

    renderRoot(portalStyle:React.CSSProperties, renderChildren:boolean,extraProps?:any) {
        let {tagName:TagName, style, children, ...rest} = this.props;
        return React.createElement(TagName!,{style:{...style, ...portalStyle},"data-id":this.uniqueId,...rest,...extraProps},renderChildren ? children : null);
    }

    private renderPortal() {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderRoot({
            visibility: 'visible',
            // width: '1px'                            //TODO sort out width issue. this is a workaround
        }, true, {'data-automation-id': this.uniqueId}), this.parentTarget);
    }

    // private getContainer() {
    //     return this.container = this.container || document.body.appendChild(document.createElement('div'));
    // }
}
