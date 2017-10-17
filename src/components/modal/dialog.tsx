import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {isElement} from '../../utils/is-element';
import styles from './dialog.st.css';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onButtonClick: (buttonId) => void;
}

@stylable(styles)
@properties
export class Dialog extends React.PureComponent<DialogProps> {
    public static defaultProps: DialogProps = {
        isOpen: false,
        onButtonClick: noop
    };

    public componentDidMount() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public componentDidUpdate() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public render() {
        return (
            <Modal
                className="root"
                isOpen={this.props.isOpen}
                onRequestClose={() => this.props.onButtonClick('cancel')}
            >
                {this.props.children}
            </Modal>
        );
    }

    private onClick: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        const {target} = event;
        if (isElement(target)) {
            const closeEvent: RequestCloseEvent = {...event, source: this.getDataFromNearestNode(target)};
            this.props.onRequestClose!(closeEvent);
        }
    }
}
