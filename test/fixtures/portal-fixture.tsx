import * as React from 'react';
import { Portal } from '../../src';

export interface PortalFixtureState {
    open: boolean;
}

export class PortalFixture extends React.Component<{}, PortalFixtureState> {
    public state: PortalFixtureState = {open: true};

    public render() {
        return (
            <Portal open={this.state.open}>
                <span data-automation-id="FIXTURE_CHILDREN">Children</span>
            </Portal>
        );
    }

    public toggle() {
        this.setState({open: !this.state.open});
    }
}
