import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {BarsLoader, ChangeEvent, CircleLoader, DotsLoader, NumberInput} from '../../src';
import styles from './loader-demo.st.css';

@stylable(styles)
export class LoaderDemo extends React.Component {
    public state = {
        delay: 0,
        visible: true
    };
    public render() {
        const {delay, visible} = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Delay:
                            <NumberInput step={1000} value={delay} onChange={this.onChangeDelay}/>
                            <button
                                className="visibilityButton"
                                children={visible ? 'Hide loaders' : 'Show loaders'}
                                onClick={this.onVisibilityChange}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th>Circle</th>
                        <th>Circle with text</th>
                        <th>Bars</th>
                        <th>Bars with text</th>
                        <th>Dots</th>
                        <th>Dots with text</th>
                    </tr>
                </thead>
                {visible &&
                    <tbody>
                        <tr>
                            <td>
                                <CircleLoader
                                    delay={delay}
                                />
                            </td>
                            <td>
                                <CircleLoader
                                    delay={delay}
                                    text="Loading"
                                />
                            </td>
                            <td>
                                <BarsLoader
                                    delay={delay}
                                />
                            </td>
                            <td>
                                <BarsLoader
                                    delay={delay}
                                    text="Loading"
                                />
                            </td>
                            <td>
                                <DotsLoader
                                    delay={delay}
                                />
                            </td>
                            <td>
                                <DotsLoader
                                    delay={delay}
                                    text="Loading"
                                />
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        );
    }
    public onChangeDelay = (e: ChangeEvent<number>) => this.setState({delay: e.value});
    public onVisibilityChange = (e: React.SyntheticEvent<HTMLButtonElement>) =>
        this.setState({visible: !this.state.visible})
}
