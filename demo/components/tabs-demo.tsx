import * as React from 'react';
import {ContextProvider} from '../../src/components/context-provider';
import {NumberInput} from '../../src/components/number-input';
import {Tab, Tabs} from '../../src/components/tabs';
import {ChangeEvent} from '../../src/types/events';

export class TabsDemo extends React.Component {
    public state = {value: '1'};
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
                    <table style={{ width: '100%' }}><tbody>
                        <tr>
                            <th>Configuration</th>
                            <th>Default</th>
                            <th>RTL</th>
                        </tr>
                        <tr>
                            <td>Horizontal Top (Default)</td>
                            <td>
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab label="Tab One" value="0">
                                        <p>Tab One Content</p>
                                    </Tab>
                                    <Tab label="Tab Two" value="1">
                                        <p>Tab Two Content</p>
                                    </Tab>
                                    <Tab label="Tab Three" value="2">
                                        <p>Tab Three Content</p>
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab label="Tab One" value="0">
                                            <p>Tab One Content</p>
                                        </Tab>
                                        <Tab label="Tab Two" value="1">
                                            <p>Tab Two Content</p>
                                        </Tab>
                                        <Tab label="Tab Three" value="2">
                                            <p>Tab Three Content</p>
                                        </Tab>
                                        <Tab label="Tab Four" value="3" disabled>
                                            <p>Tab Four Content</p>
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
                                    <Tab label="Tab One" value="0">
                                        <p>Tab One Content</p>
                                    </Tab>
                                    <Tab label="Tab Two" value="1">
                                        <p>Tab Two Content</p>
                                    </Tab>
                                    <Tab label="Tab Three" value="2">
                                        <p>Tab Three Content</p>
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
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
                                        <Tab label="Tab One" value="0">
                                            <p>Tab One Content</p>
                                        </Tab>
                                        <Tab label="Tab Two" value="1">
                                            <p>Tab Two Content</p>
                                        </Tab>
                                        <Tab label="Tab Three" value="2">
                                            <p>Tab Three Content</p>
                                        </Tab>
                                        <Tab label="Tab Four" value="3" disabled>
                                            <p>Tab Four Content</p>
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
                                    <Tab label="Tab One" value="0">
                                        <p>Tab One Content</p>
                                    </Tab>
                                    <Tab label="Tab Two" value="1">
                                        <p>Tab Two Content</p>
                                    </Tab>
                                    <Tab label="Tab Three" value="2">
                                        <p>Tab Three Content</p>
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
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
                                        <Tab label="Tab One" value="0">
                                            <p>Tab One Content</p>
                                        </Tab>
                                        <Tab label="Tab Two" value="1">
                                            <p>Tab Two Content</p>
                                        </Tab>
                                        <Tab label="Tab Three" value="2">
                                            <p>Tab Three Content</p>
                                        </Tab>
                                        <Tab label="Tab Four" value="3" disabled>
                                            <p>Tab Four Content</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                        <tr>
                            <td>Vertical After</td>
                            <td>
                                <Tabs
                                    orientation="vertical-after"
                                    value={value}
                                    onChange={this.handleChange}
                                >
                                    <Tab label="Tab One" value="0">
                                        <p>Tab One Content</p>
                                    </Tab>
                                    <Tab label="Tab Two" value="1">
                                        <p>Tab Two Content</p>
                                    </Tab>
                                    <Tab label="Tab Three" value="2">
                                        <p>Tab Three Content</p>
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="vertical-after"
                                        value={value}
                                        onChange={this.handleChange}
                                    >
                                        <Tab label="Tab One" value="0">
                                            <p>Tab One Content</p>
                                        </Tab>
                                        <Tab label="Tab Two" value="1">
                                            <p>Tab Two Content</p>
                                        </Tab>
                                        <Tab label="Tab Three" value="2">
                                            <p>Tab Three Content</p>
                                        </Tab>
                                        <Tab label="Tab Four" value="3" disabled>
                                            <p>Tab Four Content</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                    </tbody></table>
                    <label>Uncontrolled</label>
                    <Tabs defaultValue="2">
                        <Tab label="Tab One" value="0">
                            <p>Tab One Content</p>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <p>Tab Two Content</p>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <p>Tab Three Content</p>
                        </Tab>
                        <Tab label="Tab Four" value="3" disabled>
                            <p>Tab Four Content</p>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }

    private handleChange = ({value}: ChangeEvent<string | number | undefined>) =>
        this.setState({value: String(value)})
}
