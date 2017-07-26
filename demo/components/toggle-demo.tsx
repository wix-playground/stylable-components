import * as React from 'react';
import {Toogle} from '../../src';

export interface State {
    checked1: boolean,
    checked2: boolean,
    checked3: boolean
}

export class ToogleDemo extends React.Component<{}, State> {
    state = {
        checked1: false,
        checked2: false,
        checked3: false
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
                            onChange={(checked1: boolean) => this.setState({checked1})}
                        />
                    </th>
                    <th>
                        Custom Icons
                        <Toogle
                            label='without icons'
                            iconChecked={<span children='+'/>}
                            iconUnchecked={<span children='-'/>}
                            checked={this.state.checked2}
                            onChange={(checked2: boolean) => this.setState({checked2})}
                        />
                    </th>
                    <th>
                        No icons
                        <Toogle
                            label='with icons'
                            checked={this.state.checked3}
                            onChange={(checked3: boolean) => this.setState({checked3})}
                            displayIcons={false}
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
