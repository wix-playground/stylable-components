import * as React from 'react';
import { nullFunction } from '../../common/null-function';

// Transparent 1x1 gif image
export const onePixelTransparentSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface ImageEvent extends React.SyntheticEvent<HTMLImageElement> {
    src: string;
}

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    title?: string;
    sizing?: 'fill' | 'cover' | 'contain';

    onLoad?: (event: ImageEvent) => void;
    onError?: (event: ImageEvent) => void;
    defaultImage?: string;
}

export interface ImageState {
    src: string;
}

const hiddenImageStyle = {
    display: 'block',
    maxWidth: '100%',
    height: '100%',
    visibility: 'hidden'
};

const backgroundSizingStyle = {
    display: 'inline-block',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}

export class Image extends React.PureComponent<ImageProps, ImageState>{
    static defaultProps: Partial<ImageProps> = {
        defaultImage: onePixelTransparentSrc,
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

    render() {
        const {
            // these two are always set on the root
            style,
            className,

            // shouldn't be printed to DOM
            defaultImage,
            sizing,

            ...rest
        } = this.props;

        // 'fill' is the default image behavior, so no need to put it on background
        if (sizing === 'contain' || sizing === 'cover') {
            return (
                <div style={{ ...backgroundSizingStyle, backgroundImage: `url("${this.state.src}")`, backgroundSize: sizing, ...style }} className={className}>
                    <img style={hiddenImageStyle} {...rest} src={this.state.src} onLoad={this.onLoad} onError={this.onError} />
                </div>
            );
        }

        return (
            <img {...rest}
                style={style}
                className={className}
                src={this.state.src}
                onLoad={this.onLoad}
                onError={this.onError} />
        );
    }
}
