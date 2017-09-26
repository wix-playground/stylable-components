import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './loader.st.css';

export interface LoaderProps {
    type?: 'circle'; // TODO add 'dots' and 'lines'
    delay?: number;
    text?: string;
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
        const {type, text} = this.props;

        if (!this.state.active) {
            return null;
        }

        return <div>
            {this[type!]()}
            {text &&
                <span className="text">{text}</span>
            }
        </div>
    }

    private setTimer(props: LoaderProps) {
        if (props.delay) {
            clearTimeout(this.timer!);
            this.setState({active: false});
            this.timer = window.setTimeout(() => {
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
}
