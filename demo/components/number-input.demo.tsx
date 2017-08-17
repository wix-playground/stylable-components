import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';
import * as style from '../wix-theme/theme.st.css';

export class NumberInputDemo extends React.Component<{}, {value?: number}> {

    constructor() {
        super();
        this.state = {};
    }

    public render() {
        return (
            <div>
                <div>
                    <h3>Basic</h3>
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
                </div>
                <div>
                    <h3>Disabled</h3>
                    <NumberInput
                        disabled
                        value={this.state.value}
                        placeholder="Always Disabled!"
                    >
                        <span data-slot="prefix">prefix</span>
                        <span data-slot="suffix">suffix</span>
                    </NumberInput>
                </div>
                <div>
                    <h3>Error</h3>
                    <NumberInput
                        error
                        value={this.state.value}
                        placeholder="Always wrong!"
                    >
                        <span data-slot="prefix">prefix</span>
                        <span data-slot="suffix">suffix</span>
                    </NumberInput>
                </div>
                <div>
                    <h3>Uncontrolled</h3>
                    <NumberInput
                        defaultValue={0}
                        step={2}
                        min={-5}
                        max={5}
                        placeholder="Is Uncontrolled"
                    >
                        <span data-slot="prefix">prefix</span>
                        <span data-slot="suffix">suffix</span>
                    </NumberInput>
                </div>
            </div>
        );
    }

    private handleValueChange = (value?: number) => this.setState({value});
}
