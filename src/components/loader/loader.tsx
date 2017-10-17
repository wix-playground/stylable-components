import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from './loader.st.css';

export interface LoaderProps extends properties.Props {
    delay?: number;
    text?: string;
    children?: React.ReactNode;
}

export interface LoaderState {
    active: boolean;
}

@stylable(styles)
@properties
export class Loader extends React.Component<LoaderProps, LoaderState> {
    private timer: number;

    public constructor(props: LoaderProps) {
        super();
        this.state = {
            active: !props.delay
        };
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
        const {text, children} = this.props;

        if (!this.state.active) {
            return null;
        }

        if (children) {
            return <div data-automation-id="LOADER" children={children}/>;
        }

        return (
            <div data-automation-id="LOADER">
                {this.renderLoader()}
                {text &&
                    <span
                        data-automation-id="LOADER_TEXT"
                        className="text"
                        children={text}
                    />
                }
            </div>
        );
    }

    protected renderLoader(): JSX.Element | null {
        return null;
    }

    private setTimer(props: LoaderProps) {
        if (props.delay) {
            clearTimeout(this.timer!);
            this.timer = window.setTimeout(() => {
                this.setState({active: true});
            }, props.delay);
        } else if (!this.state.active) {
            this.setState({active: true});
        }
    }

}
