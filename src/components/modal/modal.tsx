import * as React from 'react';
import {Portal} from '../../../src';
import styles from './modal.st.css';

export interface ModalProps {
    isOpen?: boolean;
}

export class Modal extends React.PureComponent<ModalProps, {}> {
    public render() {
        return (
            this.props.isOpen ?
                (
                    <Portal>
                        <div className={styles.backdrop} data-automation-id="MODAL">
                            {this.props.children}
                        </div>
                    </Portal>
                )
                : null
        );
    }
}
