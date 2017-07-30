import * as React from 'react';
import { objectFitSupported } from '../../common/environment';
import { nullFunction } from '../../common/null-function';
import { ImageSizing } from './image-sizing';

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage?: string;
    title?: string;
    src?: string;
    alt?: string;
    sizing?: ImageSizing;

    onLoad?: (event: ImageEvent) => void;
    onError?: (event: ImageEvent) => void;
}

export interface ImageState {
    src: string;
}

export interface ImageEvent extends React.SyntheticEvent<HTMLImageElement> {
    src: string;
}

export class Image extends React.PureComponent<ImageProps, ImageState>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
        sizing: ImageSizing.CONTAIN,
        onLoad: nullFunction,
        onError: nullFunction
    };

    componentWillMount() {
        this.setState({ src: this.props.src || this.props.defaultImage! });
    }

    onError: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
        this.props.onError!({ ...e, src: this.state.src });

        this.setState({ src: this.getFallbackSrcFor(this.state.src) });
    };

    onLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
        if (this.getImageSrc() !== onePixelTransparentSrc) {
            this.props.onLoad!({ ...e, src: this.state.src });
        }
    };

    getImageSrc(): string {
        // if object-fit isn't supported, we set the source on the background
        return objectFitSupported ? this.state.src : onePixelTransparentSrc;
    }

    getFallbackSrcFor(src: string): string {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src === this.props.defaultImage) ? onePixelTransparentSrc : this.props.defaultImage!;
    }

    getObjectFitValue(): string {
        switch (this.props.sizing) {
            case ImageSizing.COVER:
                return 'cover';
            case ImageSizing.CONTAIN:
                return 'contain';
            case ImageSizing.FILL:
            default:
                return 'fill'
        }
    }

    getImageStyle() {
        const style: React.CSSProperties = {};

        const objectFitValue = this.getObjectFitValue();

        if (objectFitSupported) {
            style.objectFit = objectFitValue;
        } else {
            style.backgroundSize = objectFitValue.replace('fill', '100% 100%');
            style.backgroundImage = `url("${this.state.src}")`;
            style.backgroundRepeat = 'no-repeat';
            style.backgroundPosition = 'center';
        }

        return style;
    }

    render() {
        // remove certain props from the received props that shouldn't be applied to image tag
        const { defaultImage, sizing, ...rest } = this.props;

        return (
            <img {...rest}
                src={this.getImageSrc()}
                style={this.getImageStyle()}
                onError={this.onError}
                onLoad={this.onLoad} />
        );
    }
}
