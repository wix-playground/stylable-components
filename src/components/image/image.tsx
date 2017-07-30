import * as React from 'react';
import { objectFitSupported, isBrowser } from '../../common/environment';
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
    useBackgroundSizing: boolean;
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

    componentDidMount() {
        if (isBrowser && !objectFitSupported) {
            // Switch to polyfill after first render to allow SSR bootstrapping (server assumes objectFit support)
            this.setState({ useBackgroundSizing: true });
        }
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
        const { defaultImage, sizing, style, ...rest } = this.props;

        const propsOverride: React.ImgHTMLAttributes<HTMLImageElement> = {};
        if (sizing) {
            if (this.state.useBackgroundSizing) {
                propsOverride.style = {
                    backgroundImage: `url("${this.state.src}")`,
                    backgroundSize: sizing!.replace('fill', '100% 100%'),
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    ...style
                };
                propsOverride.src = onePixelTransparentSrc;
            } else {
                propsOverride.style = { objectFit: sizing, ...style };
            }
        }

        return (
            <img {...rest}
                src={this.state.src}
                style={style}
                onError={this.onError}
                onLoad={this.onLoad}
                {...propsOverride} />
        );
    }
}
