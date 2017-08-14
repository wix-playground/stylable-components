import * as React from 'react';
import { Modal } from '../../src';

export interface ModalFixtureProps {
    style?: object;
}

export interface ModalFixtureState {
    isOpen: boolean;
}

export class ModalFixture extends React.Component<ModalFixtureProps, ModalFixtureState> {
    public style1: object = {
        width: '50px',
        height: '50px',
        backgroundColor: 'red'
    };

    public style2: object = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        backgroundColor: 'blue'
    };

    public state: ModalFixtureState = {
        isOpen: false
    };

    public render() {
        return (
            <div style={this.props.style}>
                <div data-automation-id="ELEMENT_1" style={this.style1} />
                <button data-automation-id="MODAL_BUTTON" onClick={this.onClick}>Open The Modal!</button>
                <Modal isOpen={this.state.isOpen} children={<p>Hey, I'm in a modal</p>} />
                <div data-automation-id="ELEMENT_2" style={this.style2} />
            </div>
        );
    }

    private onClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
}
