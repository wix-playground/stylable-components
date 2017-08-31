import * as React from 'react';
import {DropDown} from '../../src';

export interface DropDownDemoState {
    selectedItem: string | undefined;
    open: boolean;
}

const items = ['Muffins', 'Pancakes', 'Waffles'];

export class DropDownDemo extends React.Component<{}, DropDownDemoState> {

    public state = {selectedItem: undefined, open: false};

    public onInputClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    public onItemClick = (item: string) => {
        this.setState({
            open: !this.state.open,
            selectedItem: item
        });
    }

    public render() {
        return (
            <div>
                <h2>DropDown</h2>
                <section data-automation-id="DROP_DOWN_DEMO" style={{width: '250px'}}>
                    <DropDown
                        value={this.state.selectedItem || ''}
                        open={this.state.open}
                        onChange={this.onItemClick}
                    >
                        {items}
                    </DropDown>
                </section>
            </div>
        );
    }
}
