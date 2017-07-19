import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export class NumberInputDemo extends React.Component<{}, {value: number}> {
    constructor() {
        super();
        this.state = {value: 0};
    }
    render() {
        return <NumberInput
            value={this.state.value}
            step={2}
            min={-5}
            max={5}
            onChange={value => this.setState({value})}
        />
    }
}
