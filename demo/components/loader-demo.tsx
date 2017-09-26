import * as React from 'react';
import {ChangeEvent, Loader, NumberInput} from '../../src';

export class LoaderDemo extends React.Component {
    public state = {
        delay: 0
    };
    public render() {
        const {delay} = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Delay:
                            <NumberInput step={1000} value={delay} onChange={this.onChangeDelay}/>
                        </th>
                    </tr>
                    <tr>
                        <th>Circle</th>
                        <th>Circle with text</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Loader
                                delay={delay}
                                type="circle"
                            />
                        </td>
                        <td>
                            <Loader
                                delay={delay}
                                type="circle"
                                text="Loading"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    public onChangeDelay = (e: ChangeEvent<number>) => this.setState({delay: e.value});
}
