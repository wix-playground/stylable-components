import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Portal} from '../../../src/components/portal';
import {noop} from '../../utils';
import {isElement} from '../../utils/is-element';
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

    public componentDidUpdate() {
        this.shouldEnableScrolling(!this.props.isOpen);
    }

    public render() {
        const rootProps = root(this.props, {
            className: 'root'
        });

        return (
            this.props.isOpen ? (
                <Portal {...rootProps}>
                    <div className="backdrop" data-slot="backdrop" data-automation-id="MODAL" onClick={this.onClick}>
                        <div className="children" data-slot="children">
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
