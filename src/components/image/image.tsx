import * as React from 'react';
import { objectFitSupported } from '../../common/environment';
import {observable, action} from 'mobx';
import NativeUIEvent = require("react");
import {SyntheticEvent} from "react";

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage?: string;
    title?: string;
}

export class Image extends React.Component<ImageProps, {}>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
        title: ''
    };

    @observable src: string = this.props.src ? this.props.src : this.props.defaultImage!;

    onLoad: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.getImageSrc() !== onePixelTransparentSrc) {
            if (this.props.onLoad) {
                this.props.onLoad(this.src);
            }
        }
    };

    getImageSrc () {
        // if object-fit isn't supported, we set the source on the background
        return objectFitSupported ? this.src : onePixelTransparentSrc;
    }

    render() {
        return (
            <img {...this.props}
                 data-automation-id="NATIVE_IMAGE"
                 src={this.getImageSrc()}
                 onLoad={this.onLoad} />
        );
    }
}
