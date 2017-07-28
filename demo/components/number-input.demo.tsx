import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export class NumberInputDemo extends React.Component<{}, {value?: number}> {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return <div>
            <NumberInput
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
            <NumberInput disabled value={this.state.value} />
        </div>
    }
}
