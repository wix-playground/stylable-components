import * as React from 'react';
import { Image } from '../../src';

export interface ImageDemoState {
    src: string;
}

export class ImageDemo extends React.Component<{}, ImageDemoState> {
    public state: ImageDemoState = {
        // Wix.com's Logo
        src: 'http://d26gg7w375vuv5.cloudfront.net/Design+Assets/black+Wix+Logo+Assets/Black+Wix+logo+Assets.jpg'
    };

    public render() {
        return (
            <div>
                <input type="text" value={this.state.src} onChange={this.onSrcChange} />
                <Image src={this.state.src} />
            </div>
        );
    }

    private onSrcChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({ src: e.target.value });
    }
}
