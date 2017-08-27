import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {Image, Modal} from '../../src';
import styles from './modal-demo.st.css';

export interface ModalDemoState {
    isOpen: boolean;
}

@SBComponent(styles)
export class ModalDemo extends React.Component<{}, ModalDemoState> {
    public state: ModalDemoState = {
        isOpen: false
    };

    public render() {
        return (
            <div>
                <button data-automation-id="MODAL_BUTTON" onClick={this.onClick}>Open The Modal!</button>
                <Modal className="root" isOpen={this.state.isOpen} onRequestClose={this.onClick}>
                    <Image className="image" />
                </Modal>
            </div>
        );
    }

    private onClick = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
}
