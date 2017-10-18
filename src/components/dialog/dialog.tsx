import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {Modal, RequestCloseEvent} from '../modal';
import {Button} from '../button';
import styles from './dialog.st.css';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onCancelButton: () => void;
    onOkButton: () => void;
    title: string;
}

@stylable(styles)
@properties
export class Dialog extends React.PureComponent<DialogProps> {
    public static defaultProps: DialogProps = {
        isOpen: false,
        onCancelButton: noop,
        onOkButton: noop,
        title: 'Dialog'
    };

    public render() {
        return (
            <Modal
                className="root"
                isOpen={this.props.isOpen}
                onRequestClose={console.log}
            >
                <div role="header">
                    <span role="title">{this.props.title}</span>
                    <Button role="header-close-button">X</Button>
                </div>
                <div role="body">
                    {this.props.children}
                </div>
                <div role="footer">
                    <Button role="footer-primary-button">OK</Button>
                    <Button role="footer-close-button">Cancel</Button>
                </div>
            </Modal>
        );
    }
}
