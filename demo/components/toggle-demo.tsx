import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ChangeEvent, ContextProvider, Toggle} from '../../src';
import styles from './toggle-demo.st.css';

export interface ToggleDemoState {
    checked: boolean;
}

@stylable(styles)
export class ToggleDemo extends React.Component<{}, ToggleDemoState> {
    public state = {
        checked: false
    };

    public render() {
        const onChange = (e: ChangeEvent<boolean>) => this.setState({checked: e.value});
        return (
            <table>
                <thead>
                    <tr>
                        <th>Controlled</th>
                        <th>Controlled RTL</th>
                        <th>Off</th>
                        <th>On</th>
                        <th>Disabled and off</th>
                        <th>Disabled and on</th>
                        <th>Error and off</th>
                        <th>Error and on</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-automation-id="TOGGLE_DEMO_CONTROLLED">
                            <Toggle
                                label="with icons"
                                value={this.state.checked}
                                onChange={onChange}
                            />
                        </td>
                        <td>
                            <ContextProvider dir="rtl">
                                <Toggle
                                    label="with icons"
                                    value={this.state.checked}
                                    onChange={onChange}
                                />
                            </ContextProvider>
                        </td>
                        <td data-automation-id="TOGGLE_DEMO_UNCONTROLLED">
                            <Toggle/>
                        </td>
                        <td>
                            <Toggle value={true}/>
                        </td>
                        <td>
                            <Toggle disabled/>
                        </td>
                        <td>
                            <Toggle disabled value={true}/>
                        </td>
                        <th>
                            <Toggle error/>
                        </th>
                        <th>
                            <Toggle error value={true}/>
                        </th>
                    </tr>
                </tbody>
            </table>
        );
    }
}
