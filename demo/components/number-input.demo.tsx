import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export class NumberInputDemo extends React.Component<{}, {value: number}> {
    constructor() {
        super();
        this.state = {value: 0};
    }
    render() {
        return <table>
            <tr>
                <th>
                    <NumberInput
                        value={this.state.value}
                        step={2}
                        min={-5}
                        max={5}
                        onChangeValue={value => this.setState({value})}
                    />
                </th>
                <th>
                    <NumberInput disabled value={this.state.value} />
                </th>
            </tr>
        </table>
    }
}
