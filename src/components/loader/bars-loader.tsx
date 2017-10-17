import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './bars-loader.st.css';
import {Loader} from './loader';

const bars = new Array(5).fill(0);

@stylable(styles)
export class BarsLoader extends Loader {
    protected renderLoader() {
        return (
            <div className='bars'>
                {bars.map(item =>
                    <div className='bar'/>
                )}
            </div>
        );
    }
}
