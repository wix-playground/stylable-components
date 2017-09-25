import * as React from 'react';
import {DriverBase, simulate} from 'test-drive-react';
import {NumberInput} from '../../src';

export class StatefulUncontrolledNumberInput
    extends React.Component<{initialValue: number}, { defaultValue: number }> {

    constructor(props: {initialValue: number}) {
        super();

        this.state = {
            defaultValue: props.initialValue
        };

    }

    public render() {
        return (
            <div data-automation-id="FIXTURE" onClick={this.handleClick}>
                <NumberInput defaultValue={this.state.defaultValue} />
            </div>
        );
    }

    private handleClick = () => this.setState({defaultValue: this.state.defaultValue + 1});
}

export class StatefulUnctontrolledNumberInputDriver extends DriverBase {
    public static ComponentClass = StatefulUncontrolledNumberInput;

    public get input() {
        return this.select('NATIVE_INPUT_NUMBER');
    }

    public click() {
        simulate.click(this.root);
    }
}
