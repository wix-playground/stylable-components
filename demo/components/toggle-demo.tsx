import * as React from 'react';
import {Toogle} from '../../src';

export class ToogleDemo extends React.Component<{}, {}> {
    state = {
        checked1: false,
        checked2: false
    }
    render () {
        return <table>
            <tbody>
                <tr>
                    <th>
                        Controled
                        <Toogle
                            label='with icons'
                            checked={this.state.checked1}
                            onChange={checked1 => this.setState({checked1})}
                        />
                    </th>
                    <th>
                        No icons
                        <Toogle
                            label='without icons'
                            displayIcons={false}
                            checked={this.state.checked2}
                            onChange={checked2 => this.setState({checked2})}
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
                </tr>
            </tbody>
        </table>
    }
}
