import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './circle-loader.st.css';
import {Loader} from './loader';

@stylable(styles)
export class CircleLoader extends Loader {
    protected renderLoader() {
        return (
            <div className="circle">
                <div className="left">
                    <div className="track"/>
                </div>
                <div className="right">
                    <div className="track"/>
                </div>
            </div>
        );
    }
}
