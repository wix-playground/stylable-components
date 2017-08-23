import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Portal} from '../../../src';
import {enableScrolling, stopScrolling} from '../../utils/stop-scrolling';
import styles from './modal.st.css';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onRequestClose?(source: string): void;
}

@SBComponent(styles)
export class Modal extends React.PureComponent<ModalProps, {}> {
    public componentDidMount() {
        if (this.props.isOpen) {
            stopScrolling();
        } else {
            enableScrolling();
        }
    }

    public componentWillReceiveProps(nextProps: ModalProps) {
        if (nextProps.isOpen) {
            stopScrolling();
        } else {
            enableScrolling();
        }
    }

    public componentWillUnmount() {
        enableScrolling();
    }

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': '',
            'className': ''
        });

        return (
            this.props.isOpen ?
                (
                    <Portal {...rootProps}>
                        <div className="backdrop" data-automation-id="MODAL" onClick={this.onClick('backdrop')}>
                            <div onClick={this.onClick('children')}>
                                {this.props.children}
                            </div>
                        </div>
                    </Portal>
                )
                : null
        );
    }

    private onClick = (source: string) => {
        return (event: React.SyntheticEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (this.props.onRequestClose && source !== 'children') {
                this.props.onRequestClose(source);
            }
        };
    }
}
