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

export enum ImageStatus { Loaded, Loading, Error }

export interface ImageState {
    src: string;
    status: ImageStatus;
}

@properties
@stylable(styles)
export class Image extends React.PureComponent<ImageProps, ImageState> {
    public static defaultProps: Partial<ImageProps> = {
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

        const styleState = {
            loaded: this.state.status === ImageStatus.Loaded,
            loading: this.state.status === ImageStatus.Loading,
            error: this.state.status === ImageStatus.Error
        };
        // 'fill' is the default image behavior, so no need to put it on background
        if (resizeMode === 'contain' || resizeMode === 'cover') {
            const wrapperStyle = {
                backgroundImage: `url("${this.state.src}")`,
                backgroundSize: resizeMode
            };
            return (
                <div style={wrapperStyle} className="imageWrapper" style-state={styleState}>
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
                style-state={styleState}
            />
        );
    }
    public componentWillMount() {
        this.setState({
            src: this.props.src || this.props.defaultImage! || transparentImage,
            status: ImageStatus.Loading
        });
    }

    public componentWillReceiveProps(newProps: ImageProps) {
        this.setState({
            src: newProps.src || this.props.defaultImage! || transparentImage,
            status: ImageStatus.Loading
        });
    }

    private onError: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
        this.setState({
            src: this.getFallbackSrcFor(this.state.src),
            status: ImageStatus.Error
        });
        this.props.onError!({...e, src: this.state.src});
    }

    private onLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
        if (this.state.status !== ImageStatus.Error) {
            this.setState({status: ImageStatus.Loaded});
            this.props.onLoad!({...e, src: this.state.src});
        }
    }

    private getFallbackSrcFor(src: string): string {
        // first, fallback to errorImage, and later to one transparent pixel
        const {errorImage} = this.props;
        return !errorImage || src === errorImage ? transparentImage : errorImage;
    }
}
