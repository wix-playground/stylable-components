import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export class NumberInputDemo extends React.Component<{}, {value?: number}> {
    constructor() {
        super();
        this.state = {};
    }

    public render() {
        return (
            <table><tbody>
                <tr>
                    <td>
                        <NumberInput
                            value={this.state.value}
                            step={2}
                            min={-5}
                            max={5}
                            onChange={this.handleValueChange}
                            placeholder="How Many?"
                        >
                            <span data-slot="prefix">prefix</span>
                            <span data-slot="suffix">suffix</span>
                        </NumberInput>
                    </td>
                </tr><tr>
                    <td>
                        <NumberInput
                            disabled
                            value={this.state.value}
                            placeholder="Always Disabled!"
                        >
                            <span data-slot="prefix">prefix</span>
                            <span data-slot="suffix">suffix</span>
                        </NumberInput>
                    </td>
                </tr><tr>
                    <td>
                        <NumberInput
                            error
                            value={this.state.value}
                            placeholder="Always wrong!"
                        >
                            <span data-slot="prefix">prefix</span>
                            <span data-slot="suffix">suffix</span>
                        </NumberInput>
                    </td>
                </tr>
            </tbody></table>
        );
    }

    private handleValueChange = (value?: number) => this.setState({value});
}
