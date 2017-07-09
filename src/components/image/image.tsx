import * as React from 'react';
import {objectFitSupported} from '../../common/environment';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import NativeUIEvent = require("react");
import {SyntheticEvent} from "react";

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps {
    defaultImage: string;
    title: string;
    src: string;
    alt: string;
    onLoad: (data: object) => void;
    onError: (data: object) => void;
}

@observer
export class Image extends React.Component<Partial<ImageProps>, {}>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
        title: ''
    };

    @observable src: string = this.props.src ? this.props.src : this.props.defaultImage!;

    @action setSrcToFallback = () => {
        this.src = this.getFallbackSrcFor(this.src)!;
        console.log(this.src);
    };

    onError: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.props.onError) {
            this.props.onError({data: this.src});
        }

        this.setSrcToFallback();
    };

    onLoad: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.getImageSrc() !== onePixelTransparentSrc) {
            if (this.props.onLoad) {
                this.props.onLoad({data: this.src});
            }
        }
    };

    getImageSrc () {
        // if object-fit isn't supported, we set the source on the background
        return objectFitSupported ? this.src : onePixelTransparentSrc;
    }

    getFallbackSrcFor (src: string) {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src !== this.props.defaultImage) ? this.props.defaultImage : onePixelTransparentSrc;
    }

    render() {
        return (
            <img alt={this.props.alt}
                 title={this.props.title}
                 data-automation-id="NATIVE_IMAGE"
                 src={this.getImageSrc()}
                 onError={this.onError}
                 onLoad={this.onLoad} />
        );
    }
}
