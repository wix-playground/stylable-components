import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from './dots-loader.st.css';
import {Loader} from './loader';

const dots = new Array(3).fill(0);

@stylable(styles)
@properties
export class DotsLoader extends Loader {
    protected renderLoader() {
        return (
            <div className="dots">
                {dots.map((value, index) =>
                    <div className="dot" key={index}/>
                )}
            </div>
        );
    }
}
