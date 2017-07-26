import * as React from 'react';
import {objectFitSupported} from '../../common/environment';
import {nullFunction} from '../../common/null-function';
import {SyntheticEvent} from "react";

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage?: string;
    title?: string;
    src?: string;
    alt?: string;

    onLoad?: (event: ImageEvent) => void;
    onError?: (event: ImageError) => void;
}

export interface ImageState {
    src: string;
}

export interface ImageEvent extends React.SyntheticEvent<HTMLImageElement> {
    src: string;
}

export interface ImageError extends React.SyntheticEvent<HTMLImageElement> {
    src: string;
}

export class Image extends React.PureComponent<ImageProps, ImageState>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
        onLoad: nullFunction,
        onError: nullFunction
    };

    componentWillMount () {
        this.setState({ src: this.props.src || this.props.defaultImage! });
    }

    onError: React.EventHandler<SyntheticEvent<HTMLImageElement>> = (e) => {
        this.props.onError!({...e, src: this.state.src});

        this.setState({ src: this.getFallbackSrcFor(this.state.src)! });
    };

    onLoad: React.EventHandler<SyntheticEvent<HTMLImageElement>> = (e) => {
        if (this.getImageSrc() !== onePixelTransparentSrc) {
            this.props.onLoad!({...e, src: this.state.src});
        }
    };

    getImageSrc () {
        // if object-fit isn't supported, we set the source on the background
        return objectFitSupported ? this.state.src : onePixelTransparentSrc;
    }

    getFallbackSrcFor (src: string) {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src === this.props.defaultImage) ? onePixelTransparentSrc : this.props.defaultImage;
    }

    render() {
        // remove certain props from the received props that shouldn't be applied to image tag
        const { defaultImage, ...rest } = this.props;

        return (
            <img {...rest}
                 src={this.getImageSrc()}
                 onError={this.onError}
                 onLoad={this.onLoad}/>
        );
    }
}
