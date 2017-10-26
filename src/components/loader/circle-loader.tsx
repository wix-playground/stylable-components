import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from './circle-loader.st.css';
import {Loader} from './loader';

@stylable(styles)
@properties
export class CircleLoader extends Loader {
    protected renderLoader() {
        return (
            <div className="circle">
                <div className="inner">
                    <div className="left">
                        <div className="track"/>
                    </div>
                    <div className="right">
                        <div className="track"/>
                    </div>
                </div>
            </div>
        );
    }
}
