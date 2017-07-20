import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export class NumberInputDemo extends React.Component<{}, {value?: number}> {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return <table>
            <tbody>
                <tr>
                    <td>
                        <NumberInput
                            value={this.state.value}
                            step={2}
                            min={-5}
                            max={5}
                            onChangeValue={value => {
                                console.log(value);
                                this.setState({value})}
                            }
                            placeholder="How Many?"
                        />
                    </td>
                    <td>
                        <NumberInput disabled value={this.state.value} />
                    </td>
                </tr>
            </tbody>
        </table>
    }
}
