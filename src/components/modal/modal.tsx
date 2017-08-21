import * as React from 'react';
import { SBComponent } from 'stylable-react-component';
import { root } from 'wix-react-tools';
import {Portal} from '../../../src';
import {noop} from '../../utils/noop';
import {enableScrolling, stopScrolling} from '../../utils/stop-scrolling';
import styles from './modal.st.css';

export interface ModalProps {
    isOpen: boolean;
    onRequestClose?(source: string): void;
}

@SBComponent(styles)
export class Modal extends React.PureComponent<ModalProps, {}> {
    public componentDidMount() {
        if (this.props.isOpen) {
            stopScrolling();
        } else {
            enableScrolling();
        }
    }

    public componentWillReceiveProps(nextProps: ModalProps) {
        if (nextProps.isOpen) {
            stopScrolling();
        } else {
            enableScrolling();
        }
    }

    public componentWillUnmount() {
        enableScrolling();
    }

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'MODAL',
            'className': 'backdrop'
        });

        return (
            this.props.isOpen ?
                (
                    <Portal>
                        <div {...rootProps} onClick={this.onBackdropClick}>
                            {this.props.children}
                        </div>
                    </Portal>
                )
                : null
        );
    }

    private onBackdropClick = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose('backdrop');
        }
    }
}
