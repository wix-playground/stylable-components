import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {Button} from '../button';
import {Modal} from '../modal';
import styles from './dialog.st.css';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onCancel: () => void;
    onOk: () => void;
    title?: string;
}

@stylable(styles)
@properties
export class Dialog extends React.PureComponent<DialogProps> {
    public static defaultProps: DialogProps = {
        isOpen: false,
        onCancel: noop,
        onOk: noop,
        title: 'Dialog'
    };

    public render() {
        return (
            <Modal
                className="root"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onCancel}
            >
                <div onClick={this.onDialogBodyClick}>
                    <div className="header" role="header">
                        <span role="title" className="title">{this.props.title}</span>
                        <Button role="header-close-button">X</Button>
                    </div>
                    <div className="body" role="body">
                        {this.props.children}
                    </div>
                    <div className="footer" role="footer">
                        <Button onClick={this.props.onCancel} role="footer-close-button">Cancel</Button>
                        <Button onClick={this.props.onOk} role="footer-primary-button">OK</Button>
                    </div>
                </div>
            </Modal>
        );
    }

    private onDialogBodyClick(e: React.SyntheticEvent<HTMLElement>) {
        // without this, the click on the body propagates
        // to the backdrop which closes the dialog
        e.stopPropagation();
    }
}
