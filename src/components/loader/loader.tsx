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
        return <div className='circle'>
            <div className='left'>
                <div className='track'></div>
            </div>
            <div className='right'>
                <div className='track'></div>
            </div>
        </div>
    }
    dots() {
        return <div>dots</div>
    }
    render() {
        return this[this.props.type!]();
    }
}
