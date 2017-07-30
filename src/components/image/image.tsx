import * as React from 'react';
import { objectFitSupported } from '../../common/environment';
import { nullFunction } from '../../common/null-function';

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    defaultImage?: string;
    title?: string;
    src?: string;
    alt?: string;
    sizing?: 'fill' | 'cover' | 'contain';

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
        sizing: 'contain',
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
        if (this.state.src !== this.props.defaultImage && this.state.src !== onePixelTransparentSrc) {
            this.props.onLoad!({ ...e, src: this.state.src });
        }
    };

    getFallbackSrcFor(src: string): string {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src === this.props.defaultImage) ? onePixelTransparentSrc : this.props.defaultImage!;
    }

    renderPolyfilledObjectFit() {
        const { defaultImage, sizing, style, ...rest } = this.props;
        const objectFitValue = this.props.sizing;

        return (
            <img {...rest}
                src={onePixelTransparentSrc}
                style={{
                    ...style,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: sizing!.replace('fill', '100% 100%'),
                    backgroundImage: `url("${this.state.src}")`
                }}
                onError={this.onError}
                onLoad={this.onLoad} />
        );
    }

    renderNativeObjectFit() {
        const { defaultImage, sizing, style, ...rest } = this.props;

        return (
            <img {...rest}
                src={this.state.src}
                style={{ objectFit: sizing, ...style }}
                onError={this.onError}
                onLoad={this.onLoad} />
        );
    }

    render() {
        return objectFitSupported ? this.renderNativeObjectFit() : this.renderPolyfilledObjectFit();
    }
}
