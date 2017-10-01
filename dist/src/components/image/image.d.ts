/// <reference types="react" />
import * as React from 'react';
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
}
export interface ImageState {
    src: string;
}
export declare class Image extends React.PureComponent<ImageProps, ImageState> {
    static defaultProps: Partial<ImageProps>;
    render(): JSX.Element;
    componentWillMount(): void;
    componentWillReceiveProps(newProps: ImageProps): void;
    private onError;
    private onLoad;
    private getFallbackSrcFor(src);
}
