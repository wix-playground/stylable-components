import * as React from 'react';
import styles from './number-input.demo.st.css';
import {SBComponent} from 'stylable-react-component';
import {NumberInput} from '../../src/components/number-input';

@SBComponent(styles)
export class NumberInputDemo extends React.Component<{}, {value?: number}> {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return <table><tbody>
            <tr><td>
                <NumberInput
                    className="number-input"
                    value={this.state.value}
                    step={2}
                    min={-5}
                    max={5}
                    onChange={(value) => this.setState({value})}
                    placeholder="How Many?"
                >
                    <span data-slot="prefix">prefix</span>
                    <span data-slot="suffix">suffix</span>
                </NumberInput>
            </td><td>
                <NumberInput
                    className="number-input"
                    disabled
                    value={this.state.value}>
                    <span data-slot="prefix">prefix</span>
                    <span data-slot="suffix">suffix</span>
                </NumberInput>
            </td></tr>
        </tbody></table>
    }
}
