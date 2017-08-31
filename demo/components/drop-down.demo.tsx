import * as React from 'react';
import {DropDown} from '../../src';

export interface DropDownDemoState {
    selectedItem: string | undefined;
    open: boolean;
}

const items = [
    {label: 'Muffins'},
    {label: 'Pancakes'},
    {label: 'Waffles'}
];

export class DropDownDemo extends React.Component<{}, DropDownDemoState> {

    public state = {selectedItem: undefined, open: false};

    public onInputClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    public onItemClick = (item: string) => {
        this.setState({
            selectedItem: item
        });
    }

    public render() {
        return (
            <div>
                <h2>DropDown</h2>
                <section data-automation-id="DROP_DOWN_DEMO" style={{width: '250px'}}>
                    <DropDown
                        value={this.state.selectedItem}
                        items={items}
                        onInputClick={this.onInputClick}
                        open={this.state.open}
                        onItemClick={this.onItemClick}
                    />
                </section>
            </div>
        );
    }
}
