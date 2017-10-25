import keycode = require('keycode');
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {Button} from '../button';
import {Modal, RequestCloseEvent} from '../modal';
import styles from './dialog.st.css';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onCancel?: (src: RequestCloseEvent) => void;
    onOk?: () => void;
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
                isOpen={!!this.props.isOpen}
                onRequestClose={this.props.onCancel}
            >
                <div
                    data-automation-id="DIALOG_BODY"
                    onClick={this.onDialogBodyClick}
                    onKeyDown={this.handleKeyDown}
                    tabIndex={0}
                >
                    <div className="header" role="header">
                        <span data-automation-id="DIALOG_TITLE" role="title" className="title">{this.props.title}</span>
                        <Button
                            onClick={this.props.onCancel}
                            role="header-close-button"
                            data-automation-id="DIALOG_CLOSE"
                        >
                            X
                        </Button>
                    </div>
                    <div className="body" role="body">
                        {this.props.children}
                    </div>
                    <div className="footer" role="footer">
                        <Button
                            onClick={this.props.onCancel}
                            role="footer-close-button"
                            data-automation-id="DIALOG_CANCEL"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.props.onOk}
                            role="footer-primary-button"
                            data-automation-id="DIALOG_PRIMARY"
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = e => {
        debugger;
        switch (e.keyCode) {
            case keycode('esc'):
                const closeEvent: RequestCloseEvent = {source: 'escKeyPress'};
                this.props.onCancel!(closeEvent);
        }
    }

    private onDialogBodyClick(e: React.SyntheticEvent<HTMLElement>) {
        // without this, the click on the body propagates
        // to the backdrop which closes the dialog
        e.stopPropagation();
    }
}
