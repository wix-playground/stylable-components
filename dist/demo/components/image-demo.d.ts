/// <reference types="react" />
import * as React from 'react';
export interface ImageDemoState {
    src: string;
    resizeMode: 'cover' | 'contain' | 'fill';
}
export declare class ImageDemo extends React.Component<{}, ImageDemoState> {
    state: ImageDemoState;
    render(): JSX.Element;
    private onSrcChange;
    private onResizeModeChange;
}
