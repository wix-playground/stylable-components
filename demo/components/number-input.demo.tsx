import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export interface State {
    value?: number;
    smallValue?: number;
}

export class NumberInputDemo extends React.Component<{}, State> {

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
                            value={this.state.smallValue}
                            step={1}
                            max={100}
                            onChange={this.handleSmallValueChange}
                            placeholder="How Many?"
                        >
                            <span data-slot="prefix">prefix</span>
                            <span data-slot="suffix">suffix</span>
                        </NumberInput>
                    </td>
                </tr><tr>
                    <td>
                        <NumberInput
                            value={this.state.value}
                            step={2}
                            min={-5}
                            max={5}
                            onChange={this.handleValueChange}
                            placeholder="From -5 to 5 step 2"
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
    private handleSmallValueChange = (value?: number) => this.setState({smallValue: value});
}
