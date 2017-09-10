import * as React from 'react';
import {DropDown} from '../../src';
import {ChangeEvent} from '../../src/types/events';

export interface DropDownDemoState {
    selectedItem: string | undefined;
}

const items = ['Muffins', 'Pancakes', 'Waffles'];

export class DropDownDemo extends React.Component<{}, DropDownDemoState> {

    public state = {selectedItem: undefined};

    public onItemClick = (e: ChangeEvent<string>) => {
        this.setState({
            selectedItem: e.value
        });
    }

    public render() {
        return (
            <div>
                <h2>DropDown</h2>
                <section data-automation-id="DROP_DOWN_DEMO" style={{width: '250px'}}>
                    <DropDown
                        value={this.state.selectedItem}
                        onChange={this.onItemClick}
                        dataSource={items}
                    />
                </section>
            </div>
        );
    }
}
