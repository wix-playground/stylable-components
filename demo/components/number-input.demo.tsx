import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {NumberInput} from '../../src/components/number-input';
import styles from './number-input.demo.st.css';

export interface State {
    sharedValue?: number;
    basicValue?: number;
}

@SBComponent(styles)
export class NumberInputDemo extends React.Component<{}, State> {

    constructor() {
        super();
        this.state = {};
    }

    public render() {
        const {basicValue, sharedValue} = this.state;
        return (
            <div>
                <div>
                    <h3>Basic</h3>
                    <NumberInput
                        value={basicValue}
                        step={1}
                        max={100}
                        onChange={this.handleBasicValueChange}
                        placeholder="How Many?"
                    >
                        <TrendingUp data-slot="prefix" />
                        <span data-slot="suffix">USD</span>
                    </NumberInput>
                </div>
                <div>
                    <h3>With min/max/step</h3>
                    <NumberInput
                        value={sharedValue}
                        step={2}
                        min={-5}
                        max={5}
                        onChange={this.handleSharedValueChange}
                        placeholder="How Many?"
                    />
                </div>
                <div>
                    <h3>Disabled</h3>
                    <NumberInput
                        disabled
                        value={sharedValue}
                        placeholder="Always Disabled!"
                    />
                </div>
                <div>
                    <h3>Error</h3>
                    <NumberInput
                        error
                        value={sharedValue}
                        onChange={this.handleSharedValueChange}
                        placeholder="Always wrong!"
                    />
                </div>
                <div>
                    <h3>Uncontrolled</h3>
                    <NumberInput
                        defaultValue={0}
                        step={2}
                        min={-5}
                        max={5}
                        placeholder="Is Uncontrolled"
                    />
                </div>
            </div>
        );
    }

    private handleSharedValueChange = (value?: number) => this.setState({sharedValue: value});
    private handleBasicValueChange = (value?: number) => this.setState({basicValue: value});

}

const TrendingUp = (props?: React.SVGAttributes<SVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
    </svg>
);
