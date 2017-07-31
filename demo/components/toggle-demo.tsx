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
                        Controled
                        <Toggle
                            label='with icons'
                            checked={this.state.checked}
                            onChange={(checked: boolean) => this.setState({checked})}
                        />
                    </th>
                    <th>
                        Controled RTL
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
                        Disabled off
                        <Toggle disabled/>
                    </th>
                    <th>
                        Disabled on
                        <Toggle disabled checked/>
                    </th>
                    <th>
                        Error off
                        <Toggle error/>
                    </th>
                    <th>
                        Error on
                        <Toggle error checked/>
                    </th>
                </tr>
            </tbody>
        </table>
    }
}
