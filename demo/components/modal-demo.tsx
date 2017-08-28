import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {Image, Modal} from '../../src';
import styles from './modal-demo.st.css';
import {RequestCloseEvent} from '../../src/components/modal/modal';

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
                <button data-automation-id="MODAL_BUTTON" onClick={this.onButtonClick}>Open The Modal!</button>
                <Modal className="root" isOpen={this.state.isOpen} onRequestClose={this.onModalClick}>
                    <Image role="children" className="image" />
                </Modal>
            </div>
        );
    }

    private toggleOpen = () => this.setState({isOpen: !this.state.isOpen});

    private onButtonClick = () => this.toggleOpen();

    private onModalClick = ({source}: RequestCloseEvent) => {
        if (source !== 'children') {
            this.toggleOpen();
        }
    }
}
