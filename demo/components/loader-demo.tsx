import * as React from 'react';
import {Loader, NumberInput, ChangeEvent} from '../../src';

export class LoaderDemo extends React.Component {
    state = {
        delay: 0
    }
    render() {
        const {delay} = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>
                            Delay:
                            <NumberInput step={1000} value={delay} onChange={this.onChangeDelay}/>
                        </th>
                    </tr>
                    <tr>
                        <th>Circle</th>
                        <th>Circle SVG</th>
                        <th>Dots</th>
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
                            />
                        </td>
                        <td>
                            <Loader
                                delay={delay}
                                type="dots"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    onChangeDelay = (e: ChangeEvent<number>) => this.setState({delay: e.value});
}
