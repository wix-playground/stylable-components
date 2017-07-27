import * as React from 'react';
import {Toogle} from '../../src';

export interface State {
    checked: boolean,
}

export class ToogleDemo extends React.Component<{}, State> {
    state = {
        checked: false,
    }
    render () {
        return <table>
            <tbody>
                <tr>
                    <th>
                        Controled
                        <Toogle
                            label='with icons'
                            checked={this.state.checked}
                            onChange={(checked: boolean) => this.setState({checked})}
                        />
                    </th>
                    <th>
                        Controled RTL
                        <Toogle
                            label='with icons'
                            rtl
                            checked={this.state.checked}
                            onChange={(checked: boolean) => this.setState({checked})}
                        />
                    </th>
                    <th>
                        Off
                        <Toogle/>
                    </th>
                    <th>
                        On
                        <Toogle checked/>
                    </th>
                    <th>
                        Disabled off
                        <Toogle disabled/>
                    </th>
                    <th>
                        Disabled on
                        <Toogle disabled checked/>
                    </th>
                    <th>
                        Errored off
                        <Toogle errored/>
                    </th>
                    <th>
                        Errored on
                        <Toogle errored checked/>
                    </th>
                </tr>
            </tbody>
        </table>
    }
}
