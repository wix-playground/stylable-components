import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {Image, Modal} from '../../src';
import {RequestCloseEvent} from '../../src/components/modal/modal';
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
                <button data-automation-id="MODAL_BUTTON" onClick={this.toggleOpen}>Open The Modal!</button>
                <Modal className="root" isOpen={this.state.isOpen} onRequestClose={this.onModalClick}>
                    <Image data-slot="children" className="image" />
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
