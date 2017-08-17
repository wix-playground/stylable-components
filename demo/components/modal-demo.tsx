import * as React from 'react';
import { Modal } from '../../src';

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
                <Modal isOpen={this.state.isOpen}>
                    <p>Hey, I'm in a modal</p>
                </Modal>
            </div>
        );
    }

    private onClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
}
