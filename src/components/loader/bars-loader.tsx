import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from './bars-loader.st.css';
import {Loader} from './loader';

const bars = new Array(5).fill(0);

@stylable(styles)
@properties
export class BarsLoader extends Loader {
    protected renderLoader() {
        return (
            <div className="bars">
                {bars.map((item, index) =>
                    <div className="track" key={index}/>
                )}
            </div>
        );
    }
}
