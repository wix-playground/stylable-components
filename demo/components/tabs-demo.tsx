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
                                    <Tab label="Tab One" value="0">
                                        <p>Tab One Content</p>
                                    </Tab>
                                    <Tab label="Tab Two" value="1">
                                        <p>Tab Two Content</p>
                                    </Tab>
                                    <Tab label="Tab Three" value="2">
                                        <ALotOfText />
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
                                            <ALotOfText />
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
                                    orientation="horizontalBottom"
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
                                        <ALotOfText />
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="horizontalBottom"
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
                                            <ALotOfText />
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
                                    orientation="verticalBefore"
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
                                        <ALotOfText />
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="verticalBefore"
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
                                            <ALotOfText />
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
                                    orientation="verticalAfter"
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
                                        <ALotOfText />
                                    </Tab>
                                    <Tab label="Tab Four" value="3" disabled>
                                        <p>Tab Four Content</p>
                                    </Tab>
                                </Tabs>
                            </td>
                            <td>
                                <ContextProvider dir="rtl">
                                    <Tabs
                                        orientation="verticalAfter"
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
                                            <ALotOfText />
                                        </Tab>
                                        <Tab label="Tab Four" value="3" disabled>
                                            <p>Tab Four Content</p>
                                        </Tab>
                                    </Tabs>
                                </ContextProvider>
                            </td>
                        </tr>
                    </tbody></table>
                    <div>
                        <h4>Uncontrolled</h4>
                        <Tabs defaultValue="2">
                            <Tab label="Tab One" value="0">
                                <p>Tab One Content</p>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <p>Tab Two Content</p>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <ALotOfText />
                            </Tab>
                            <Tab label="Tab Four" value="3" disabled>
                                <p>Tab Four Content</p>
                            </Tab>
                        </Tabs>
                    </div>
                    <div>
                        <h4>unmountInactiveTabs false</h4>
                        <Tabs defaultValue="0" unmountInactiveTabs={false}>
                            <Tab label="Tab One">
                                <input
                                    type="text"
                                    placeholder="this will not get lost"
                                />
                            </Tab>
                            <Tab label="Tab Two">
                                <p>Tab Two Content</p>
                            </Tab>
                            <Tab label="Tab Three">
                                <ALotOfText />
                            </Tab>
                            <Tab label="Tab Four" disabled>
                                <p>Tab Four Content</p>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }

    private handleChange = ({value}: ChangeEvent<string | number | undefined>) =>
        this.setState({value: String(value)})
}

const ALotOfText = () => (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Tristique risus nec feugiat in.
        Neque volutpat ac tincidunt vitae semper quis. Morbi
        blandit cursus risus at ultrices mi tempus imperdiet nulla.
        Ultrices eros in cursus turpis massa. Posuere urna nec tincidunt
        praesent semper feugiat nibh sed. Nunc sed blandit libero volutpat
        sed cras ornare arcu dui. Imperdiet nulla malesuada pellentesque
        elit eget gravida cum. Viverra adipiscing at in tellus integer
        feugiat scelerisque varius. Diam sollicitudin tempor id eu nisl.
        Eu sem integer vitae justo eget magna fermentum iaculis.
        Elit at imperdiet dui accumsan sit amet nulla facilisi.
        Aliquam sem et tortor consequat id porta nibh venenatis cras.
        Gravida quis blandit turpis cursus in hac habitasse platea dictumst.
        Nunc id cursus metus aliquam eleifend mi in nulla posuere.
        In fermentum et sollicitudin ac orci phasellus. Vitae turpis
        massa sed elementum tempus egestas sed. Rhoncus mattis rhoncus urna
        neque viverra. Sodales ut eu sem integer vitae justo eget magna fermentum.
    </p>
);
