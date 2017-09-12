import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {isElement} from '../../utils/is-element';
import {enableScrolling, stopScrolling} from '../../utils/stop-scrolling';
import {Portal} from '../portal';
import styles from './modal.st.css';

export interface RequestCloseEvent extends React.SyntheticEvent<Element> {
    source: string;
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onRequestClose?(event: RequestCloseEvent): void;
}

@stylable(styles)
@properties
export class Modal extends React.PureComponent<ModalProps> {
    public static defaultProps: ModalProps = {
        isOpen: false,
        onRequestClose: noop
    };

    public componentDidMount() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public componentDidUpdate() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public render() {
        return (
            this.props.isOpen ? (
                <Portal>
                    <div
                        className="backdrop"
                        role="dialog"
                        aria-modal="true"
                        data-slot="backdrop"
                        data-automation-id="MODAL"
                        onClick={this.onClick}
                    >
                        <div className="body" data-slot="body">
                            {this.props.children}
                        </div>
                    </div>
                </Portal>
            ) : null
        );
    }

    private onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = event => {
        const closeEvent: RequestCloseEvent = Object.create(event);
        const {target} = event;
        if (isElement(target)) {
            closeEvent.source = this.getDataFromNearestNode(target);
            this.props.onRequestClose!(closeEvent);
        }
    }

    private getDataFromNearestNode(target: Element): string {
        return target.getAttribute('data-slot') || this.getDataFromNearestNode(target.parentElement!);
    }

    private shouldEnableScrolling(shouldScroll: boolean) {
        if (shouldScroll) {
            enableScrolling();
        } else {
            stopScrolling();
        }
    }
}
