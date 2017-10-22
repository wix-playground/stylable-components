import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop, transparentImage} from '../../utils';
import styles from './image.st.css';

export interface ImageEvent extends React.SyntheticEvent<HTMLImageElement> {
    src: string;
}

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    title?: string;
    resizeMode?: 'fill' | 'cover' | 'contain';

    onLoad?: (event: ImageEvent) => void;
    onError?: (event: ImageEvent) => void;
    defaultImage?: string;
    errorImage?: string;
}

export interface ImageState {
    src: string;
}

@properties
@stylable(styles)
export class Image extends React.PureComponent<ImageProps, ImageState> {
    public static defaultProps: Partial<ImageProps> = {
        defaultImage: transparentImage,
        onLoad: noop,
        onError: noop
    };

    public render() {
        const {
            // these two are always set on the root
            style,
            className,

            // shouldn't be printed to DOM
            defaultImage,
            errorImage,
            resizeMode,

            ...additionalImageProps
        } = this.props;
        // 'fill' is the default image behavior, so no need to put it on background
        if (resizeMode === 'contain' || resizeMode === 'cover') {
            const wrapperStyle = {
                backgroundImage: `url("${this.state.src}")`,
                backgroundSize: resizeMode
            };
            return (
                <div style={wrapperStyle} className="imageWrapper">
                    <img
                        {...additionalImageProps}
                        data-automation-id="NATIVE_IMAGE"
                        className="hiddenImage"
                        src={this.state.src}
                        onLoad={this.onLoad}
                        onError={this.onError}
                    />
                </div>
            );
        }

        return (
            <img
                {...additionalImageProps}
                data-automation-id="NATIVE_IMAGE"
                src={this.state.src}
                onLoad={this.onLoad}
                onError={this.onError}
            />
        );
    }
    public componentWillMount() {
        this.setState({src: this.props.src || this.props.defaultImage!});
    }

    public componentWillReceiveProps(newProps: ImageProps) {
        this.setState({src: newProps.src || this.props.defaultImage!});
    }

    private onError: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
        this.setState({src: this.getFallbackSrcFor(this.state.src)});
        this.props.onError!({...e, src: this.state.src});
    }

    private onLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
        if (this.state.src !== this.props.defaultImage && this.state.src !== transparentImage) {
            this.props.onLoad!({...e, src: this.state.src});
        }
    }

    private getFallbackSrcFor(src: string): string {
        // first, fallback to errorImage, and later to one transparent pixel
        if (!this.props.errorImage) {
            return transparentImage;
        }

        return src === this.props.errorImage ? transparentImage : this.props.errorImage;
    }
}
