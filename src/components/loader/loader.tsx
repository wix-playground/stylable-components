import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './loader.st.css';

export interface LoaderProps {
    type?: 'circle' | 'dots';
    delay?: number;
}

export interface LoaderState {
    active: boolean
}

@stylable(styles)
export class Loader extends React.Component<LoaderProps, LoaderState> {
    static defaultProps = {
        type: 'circle'
    }
    private timer: number

    public constructor(props: LoaderProps) {
        super();
        this.state = {
            active: !props.delay
        }
    }

    public componentWillMount() {
        this.setTimer(this.props);
    }

    public componentWillReceiveProps(props: LoaderProps) {
        this.setTimer(props);
    }

    public componentWillUnmount() {
        clearTimeout(this.timer!);
    }

    public render() {
        if (!this.state.active) {
            return null;
        }
        return this[this.props.type!]();
    }

    private setTimer(props: LoaderProps) {
        if (props.delay) {
            clearTimeout(this.timer!);
            this.setState({active: false});
            this.timer = setTimeout(() => {
                this.setState({active: true});
            }, props.delay);
        } else if (!this.state.active) {
            this.setState({active: true});
        }
    }

    private circle() {
        return <div className='circle'>
            <div className='left'>
                <div className='track'></div>
            </div>
            <div className='right'>
                <div className='track'></div>
            </div>
        </div>
    }
    private dots() {
        return <div>dots</div>
    }
}
