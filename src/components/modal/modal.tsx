import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Portal} from '../../../src';
import {noop} from '../../utils';
import {enableScrolling, stopScrolling} from '../../utils/stop-scrolling';
import styles from './modal.st.css';

export interface RequestCloseEvent extends React.SyntheticEvent<Element> {
    source: string;
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onRequestClose?(event: RequestCloseEvent): void;
}

@SBComponent(styles)
export class Modal extends React.PureComponent<ModalProps, {}> {
    public static defaultProps: ModalProps = {
        isOpen: false,
        onRequestClose: noop
    };

    public componentDidMount() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public componentWillReceiveProps(nextProps: ModalProps) {
        this.shouldEnableScrolling(!nextProps.isOpen);
    }

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': '',
            'className': 'root'
        });

        return (
            this.props.isOpen ? (
                <Portal {...rootProps}>
                    <div className="backdrop" role="backdrop" data-automation-id="MODAL" onClick={this.onClick}>
                        <div role="children">
                            {this.props.children}
                        </div>
                    </div>
                </Portal>
            ) : null
        );
    }

    private onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = event => {
        const closeEvent: RequestCloseEvent = Object.create(event);
        const target: Element = event.target as Element;
        closeEvent.source = target.getAttribute('role') || '';
        this.props.onRequestClose!(closeEvent);
    }

    private shouldEnableScrolling(shouldScroll: boolean) {
        if (shouldScroll) {
            enableScrolling();
        } else {
            stopScrolling();
        }
    }
}
