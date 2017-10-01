import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Image} from '../../src';
import styles from './image-demo.st.css';

export interface ImageDemoState {
    src: string;
    resizeMode: 'cover' | 'contain' | 'fill';
}

@stylable(styles)
export class ImageDemo extends React.Component<{}, ImageDemoState> {
    public state: ImageDemoState = {
        // Wix.com's Logo
        src: 'http://d26gg7w375vuv5.cloudfront.net/Design+Assets/black+Wix+Logo+Assets/Black+Wix+logo+Assets.jpg',
        resizeMode: 'fill'
    };

    public render() {
        return (
            <div>
                <h2>Image</h2>
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
                    className="myImage"
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
