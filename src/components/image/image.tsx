import * as React from 'react';
import {objectFitSupported} from '../../common/environment';
import {SyntheticEvent} from "react";

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage?: string;
    title?: string;
    src?: string;
    alt?: string;

    onLoad?: (data: object) => void;
    onLoadError?: (error: ImageError) => void;
}

export interface ImageState {
    src: string;
}

export class ImageError extends Error {
    constructor(src: string) {
        super('Image Error');
        this.src = src;
    }

    src: string;
}

export class Image extends React.PureComponent<ImageProps, ImageState>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
        title: ''
    };

    componentWillMount () {
        this.setState({ src: this.props.src ? this.props.src : this.props.defaultImage! });
    }

    setSrcToFallback = () => {
        this.setState({ src: this.getFallbackSrcFor(this.state.src)! });
    };

    onError: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.props.onLoadError) {
            this.props.onLoadError(new ImageError(this.state.src));
        }

        this.setSrcToFallback();
    };

    onLoad: React.EventHandler<SyntheticEvent<HTMLImageElement>> = () => {
        if (this.getImageSrc() !== onePixelTransparentSrc) {
            if (this.props.onLoad) {
                this.props.onLoad({data: this.state.src});
            }
        }
    };

    getImageSrc () {
        // if object-fit isn't supported, we set the source on the background
        return objectFitSupported ? this.state.src : onePixelTransparentSrc;
    }

    getFallbackSrcFor (src: string) {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src !== this.props.defaultImage) ? this.props.defaultImage : onePixelTransparentSrc;
    }

    render() {
        // remove certain props from the received props that shouldn't be applied to image tag
        const { title, alt, defaultImage, onLoadError, ...rest } = this.props;

        return (
            <img {...rest}
                 alt={alt}
                 title={title}
                 src={this.getImageSrc()}
                 onError={this.onError}
                 onLoad={this.onLoad}/>
        );
    }
}
