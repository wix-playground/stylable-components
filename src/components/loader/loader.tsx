import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './loader.st.css';

export interface LoaderProps {
    type?: 'circle' | 'dots'
}

export interface LoaderState {
}

@stylable(styles)
export class Loader extends React.Component<LoaderProps, LoaderState> {
    static defaultProps = {
        type: 'circle'
    }
    circle() {
        return <div>
            spinner
        </div>
    }
    dots() {
        return <div>dots</div>
    }
    render() {
        return <div>
            spinner
        </div>
        //return this[this.props.type!]();
    }
}
