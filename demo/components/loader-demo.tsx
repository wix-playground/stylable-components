import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ChangeEvent, Loader, NumberInput} from '../../src';
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
                    </tr>
                </thead>
                {visible &&
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
                }
            </table>
        );
    }
    public onChangeDelay = (e: ChangeEvent<number>) => this.setState({delay: e.value});
    public onVisibilityChange = (e: React.SyntheticEvent<HTMLButtonElement>) =>
        this.setState({visible: !this.state.visible})
}
