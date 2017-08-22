import * as React from 'react';
import { Modal } from '../../src';
import styles from './modal-demo.st.css';

export interface ModalDemoState {
    isOpen: boolean;
}

export class ModalDemo extends React.Component<{}, ModalDemoState> {
    public state: ModalDemoState = {
        isOpen: false
    };

    public render() {
        return (
            <div>
                <button data-automation-id="MODAL_BUTTON" onClick={this.onClick}>Open The Modal!</button>
                <Modal isOpen={this.state.isOpen} onRequestClose={this.onClick}>
                    <p className={styles.content}>Hey, I'm in a modal</p>
                </Modal>
            </div>
        );
    }

    private onClick = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
}
