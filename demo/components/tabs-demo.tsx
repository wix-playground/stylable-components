import * as React from 'react';
import {ContextProvider} from '../../src/components/context-provider';
import {NumberInput} from '../../src/components/number-input';
import {Tab, Tabs} from '../../src/components/tabs';
import {ChangeEvent} from '../../src/types/events';

export class TabsDemo extends React.Component {
    public state = {value: '2'};
    public render() {
        const {value} = this.state;
        return (
            <div>
                <div>
                    <label>
                        Selected Tab:
                        <NumberInput
                            value={Number(value)}
                            onChange={this.handleChange}
                        />
                    </label>
                    <table style={{width: '100%'}}><tbody>
                        <tr>
                            <th>Configuration</th>
                            <th>Default</th>
                            <th>RTL</th>
                        </tr>
                        <tr>
                            <td>Horizontal Top (Default)</td>
                            <td>
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab value="1" label="Tab One">
                                        <p>This is tab one</p>
                                    </Tab>
                                    <Tab value="2" label="Tab Two">
                                        <p>This is tab two</p>
                                    </Tab>
                                    <Tab value="3" label="Tab Three" disabled={true}>
                                        <p>This is disabled and cannot be selected</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab value="1" label="Tab One">
                                            <p>This is tab one</p>
                                        </Tab>
                                        <Tab value="2" label="Tab Two">
                                            <p>This is tab two</p>
                                        </Tab>
                                        <Tab value="3" label="Tab Three" disabled={true}>
                                            <p>This is disabled and cannot be selected</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                        <tr>
                            <td>Horizontal Bottom</td>
                            <td>
                                <Tabs
                                    orientation="horizontal-bottom"
                                    value={value}
                                    onChange={this.handleChange}
                                >
                                    <Tab value="1" label="Tab One">
                                        <p>This is tab one</p>
                                    </Tab>
                                    <Tab value="2" label="Tab Two">
                                        <p>This is tab two</p>
                                    </Tab>
                                    <Tab value="3" label="Tab Three" disabled={true}>
                                        <p>This is disabled and cannot be selected</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="horizontal-bottom"
                                        value={value}
                                        onChange={this.handleChange}
                                    >
                                        <Tab value="1" label="Tab One">
                                            <p>This is tab one</p>
                                        </Tab>
                                        <Tab value="2" label="Tab Two">
                                            <p>This is tab two</p>
                                        </Tab>
                                        <Tab value="3" label="Tab Three" disabled={true}>
                                            <p>This is disabled and cannot be selected</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                        <tr>
                            <td>Vertical Before</td>
                            <td>
                                <Tabs
                                    orientation="vertical-before"
                                    value={value}
                                    onChange={this.handleChange}
                                >
                                    <Tab value="1" label="Tab One">
                                        <p>This is tab one</p>
                                    </Tab>
                                    <Tab value="2" label="Tab Two">
                                        <p>This is tab two</p>
                                    </Tab>
                                    <Tab value="3" label="Tab Three" disabled={true}>
                                        <p>This is disabled and cannot be selected</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="vertical-before"
                                        value={value}
                                        onChange={this.handleChange}
                                    >
                                        <Tab value="1" label="Tab One">
                                            <p>This is tab one</p>
                                        </Tab>
                                        <Tab value="2" label="Tab Two">
                                            <p>This is tab two</p>
                                        </Tab>
                                        <Tab value="3" label="Tab Three" disabled={true}>
                                            <p>This is disabled and cannot be selected</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
        );
    }

    private handleChange = ({value}: ChangeEvent<string | number | undefined>) =>
        this.setState({value: String(value)})
}
