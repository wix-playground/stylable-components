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
                        Custom Icons
                        <Toogle
                            label='without icons'
                            iconChecked={ <svg width='10' height='10' viewBox='0 0 41 32' data-automation-id='TOGGLE_CHECKED_ICON'> <path fill='white' d='M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z'/> </svg>}
                            iconUnchecked={<svg width='10' height='10'viewBox='0 0 143 32' data-automation-id='TOGGLE_UNCHECKED_ICON'><path fill='white' d='M0 0h142.545v32h-142.545v-32z'/> </svg> }
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
