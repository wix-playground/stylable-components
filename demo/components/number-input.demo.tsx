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
                        onChange={this.handleSmallValueChange}
                        placeholder="How Many?"
                    >
                        <span data-slot="prefix">$</span>
                        <span data-slot="suffix">{this.commentIcon(basicValue)}</span>
                    </NumberInput>
                </div>
                <div>
                    <h3>With min/max/step</h3>
                    <NumberInput
                        value={sharedValue}
                        step={2}
                        min={-5}
                        max={5}
                        onChange={this.handleValueChange}
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
                        onChange={this.handleValueChange}
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

    private handleValueChange = (value?: number) => this.setState({sharedValue: value});
    private handleSmallValueChange = (value?: number) => this.setState({basicValue: value});
    private commentIcon = (value?: number) => (
        Number(value) > 0 ?
        trendingUp({style: {verticalAlign: 'middle'}}) :
        Number(value) < 0 ?
            trendingDown({style: {verticalAlign: 'middle'}}) :
            Number(value) === undefined ?
                loader({style: {verticalAlign: 'middle'}}) :
                minus({style: {verticalAlign: 'middle'}})
    )

}

const trendingUp = (props?: React.SVGAttributes<SVGElement>) => (
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

const trendingDown = (props?: React.SVGAttributes<SVGElement>) => (
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
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
    </svg>
);

const loader = (props?: React.SVGAttributes<SVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
);

const minus = (props?: React.SVGAttributes<SVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);
