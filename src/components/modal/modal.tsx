import styles from './modal.st.css';
import * as React from 'react';

export interface ModalProps {
    isOpen?: boolean;
}

export class Modal extends React.PureComponent<ModalProps, {}> {
    public render() {
        return (
            this.props.isOpen ?
                <div className={styles.backdrop} data-automation-id="MODAL">{this.props.children}</div>
                : null
        );
    }
}
