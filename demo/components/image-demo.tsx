import * as React from 'react';
import {Image} from '../../src';

export interface ImageDemoState {
    src: string;
    resizeMode: 'cover' | 'contain' | 'fill';
}

export class ImageDemo extends React.Component<{}, ImageDemoState> {
    public state: ImageDemoState = {
        // Wix.com's Logo
        src: 'http://d26gg7w375vuv5.cloudfront.net/Design+Assets/black+Wix+Logo+Assets/Black+Wix+logo+Assets.jpg',
        resizeMode: 'fill'
    };

    public render() {
        return (
            <div>
                <div>
                    <label>src:
                        <input type="text" value={this.state.src} onChange={this.onSrcChange} />
                    </label>
                    <select value={this.state.resizeMode} onChange={this.onResizeModeChange}>
                        <option value="cover">cover</option>
                        <option value="contain">contain</option>
                        <option value="fill">fill</option>
                    </select>
                </div>
                <Image
                    src={this.state.src}
                    resizeMode={this.state.resizeMode}
                    style={{width: 300, height: 200, marginTop: 10}}
                />
            </div>
        );
    }

    private onSrcChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({src: e.target.value});
    }

    private onResizeModeChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
        this.setState({resizeMode: e.target.value as ImageDemoState['resizeMode']});
    }
}
