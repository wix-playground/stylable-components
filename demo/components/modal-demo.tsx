import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Modal, RequestCloseEvent} from '../../src';
import styles from './modal-demo.st.css';

export interface ModalDemoState {
    isOpen: boolean;
}

@stylable(styles)
export class ModalDemo extends React.Component<{}, ModalDemoState> {
    public state: ModalDemoState = {
        isOpen: false
    };

    public render() {
        return (
            <div>
                <button data-automation-id="MODAL_BUTTON" onClick={this.toggleOpen}>Open The Modal!</button>
                <Modal className="root" isOpen={this.state.isOpen} onRequestClose={this.onModalClick}>
                    <div data-slot="children" className="content">This is a modal</div>
                </Modal>
            </div>
        );
    }

    private toggleOpen = () => this.setState({isOpen: !this.state.isOpen});

    private onModalClick = (event: RequestCloseEvent) => {
        if (event.source !== 'children') {
            this.toggleOpen();
        }
    }
}
