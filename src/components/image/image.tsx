import * as React from 'react';
import {objectFitSupported} from '../../common/environment';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {SyntheticEvent} from "react";

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage: string;
    title: string;
    src: string;
    alt: string;

    onLoad: (data: object) => void;
    onLoadError: (error: ImageError) => void;
}

export class ImageError extends Error {
    constructor(src: string) {
        super('Image Error');
        this.src = src;
    }

    src: string;
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
    };

    onError: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.props.onLoadError) {
            this.props.onLoadError(new ImageError(this.src));
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
        // remove defaultImage from props that will be applied to image tag
        const { title, alt, defaultImage, ...rest } = this.props;

        return (
            <img {...rest}
                 alt={alt}
                 title={title}
                 data-automation-id="NATIVE_IMAGE"
                 src={this.getImageSrc()}
                 onError={this.onError}
                 onLoad={this.onLoad}/>
        );
    }
}
