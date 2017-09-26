import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ContextProvider, Toggle} from '../../src';
import {ChangeEvent} from '../../src/types/events';
import styles from './toggle-demo.st.css';

export interface State {
    checked: boolean;
}

@stylable(styles)
export class ToggleDemo extends React.Component<{}, State> {
    public state = {
        checked: false
    };

    public render() {
        const onChange = (e: ChangeEvent<boolean>) => this.setState({checked: e.value});
        return (
            <table>
            <tbody>
                <tr>
                    <th data-automation-id="TOGGLE_DEMO_CONTROLLED">
                        Controlled
                        <Toggle
                            label="with icons"
                            value={this.state.checked}
                            onChange={onChange}
                        />
                    </th>
                    <th>
                        Controlled RTL
                        <ContextProvider dir="rtl">
                            <Toggle
                                label="with icons"
                                value={this.state.checked}
                                onChange={onChange}
                            />
                        </ContextProvider>
                    </th>
                    <th data-automation-id="TOGGLE_DEMO_UNCONTROLLED">
                        Off
                        <Toggle/>
                    </th>
                    <th>
                        On
                        <Toggle value={true}/>
                    </th>
                    <th>
                        Disabled and off
                        <Toggle disabled/>
                    </th>
                    <th>
                        Disabled and on
                        <Toggle disabled value={true}/>
                    </th>
                    <th>
                        Error and off
                        <Toggle error/>
                    </th>
                    <th>
                        Error and on
                        <Toggle error value={true}/>
                    </th>
                </tr>
                <tr>
                    <td>
                        Small Toggle
                        <Toggle
                            className="toggleSmall"
                            value={this.state.checked}
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        Small Toggle Disabled
                        <Toggle className="toggleSmall" disabled />
                    </td>

                </tr>
            </tbody>
            </table>
        );
    }
}
