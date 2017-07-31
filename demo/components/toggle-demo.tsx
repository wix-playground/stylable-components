import * as React from 'react';
import {Toggle} from '../../src';

export interface State {
    checked: boolean,
}

export class ToggleDemo extends React.Component<{}, State> {
    state = {
        checked: false,
    }
    render () {
        return <table>
            <tbody>
                <tr>
                    <th>
                        Controlled
                        <Toggle
                            label='with icons'
                            checked={this.state.checked}
                            onChange={(checked: boolean) => this.setState({checked})}
                        />
                    </th>
                    <th>
                        Controlled RTL
                        <Toggle
                            label='with icons'
                            rtl
                            checked={this.state.checked}
                            onChange={(checked: boolean) => this.setState({checked})}
                        />
                    </th>
                    <th>
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
    }
}
