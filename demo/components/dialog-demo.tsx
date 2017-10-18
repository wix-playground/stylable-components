import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Dialog} from '../../src';
import styles from './dialog-demo.st.css';

export interface DialogDemoState {
    isOpen: boolean;
}

@stylable(styles)
export class DialogDemo extends React.Component<{}, DialogDemoState> {
    public state: DialogDemoState = {
        isOpen: false
    };

    public render() {
        return (
            <div>
                <button data-automation-id="DIALOG_BUTTON" onClick={this.toggleOpen}>Open The Dialog!</button>
                <Dialog className="root" isOpen={this.state.isOpen} onCancel={this.toggleOpen} onOk={this.toggleOpen}>
                    <div role="children" className="content">🌌</div>
                </Dialog>
            </div>
        );
    }

    private toggleOpen = () => this.setState({isOpen: !this.state.isOpen});
}
