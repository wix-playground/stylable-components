import * as React from 'react';
import {Toggle} from '../../src';

export interface State {
    checked: boolean;
}

export class ToggleDemo extends React.Component<{}, State> {
    public state = {
        checked: false
    };

    public render() {
        const onChange = (checked: boolean) => this.setState({checked});
        return (
            <table>
            <tbody>
                <tr>
                    <th data-automation-id="TOGGLE_DEMO_CONTROLLED">
                        Controlled
                        <Toggle
                            label="with icons"
                            checked={this.state.checked}
                            onChange={onChange}
                        />
                    </th>
                    <th>
                        Controlled RTL
                        <Toggle
                            label="with icons"
                            rtl
                            checked={this.state.checked}
                            onChange={onChange}
                        />
                    </th>
                    <th data-automation-id="TOGGLE_DEMO_UNCONTROLLED">
                        Off
                        <Toggle/>
                    </th>
                    <th>
                        On
                        <Toggle checked/>
                    </th>
                    <th>
                        Disabled and off
                        <Toggle disabled/>
                    </th>
                    <th>
                        Disabled and on
                        <Toggle disabled checked/>
                    </th>
                    <th>
                        Error and off
                        <Toggle error/>
                    </th>
                    <th>
                        Error and on
                        <Toggle error checked/>
                    </th>
                </tr>
            </tbody>
            </table>
        );
    }
}
