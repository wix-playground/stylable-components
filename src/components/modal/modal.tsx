import styles from './modal.st.css';
import * as React from 'react';
import { noop } from '../../common/noop-function';

export interface ModalProps {
    isOpen?: boolean;
    children?: Array<React.ReactElement<any>>;
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
