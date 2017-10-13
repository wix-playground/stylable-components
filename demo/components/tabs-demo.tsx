import * as React from 'react';
import {Tab, Tabs} from '../../src/components/tabs';
import {ChangeEvent} from '../../src/types/events';

export class TabsDemo extends React.Component {
    public state = {value: '2'};
    public render() {
        return (
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange}>
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
            </div>
        );
    }

    private handleChange = ({value}: ChangeEvent<string>) => this.setState({value});
}
