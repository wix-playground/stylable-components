import * as React from 'react';
import {AutoComplete, ChangeEvent} from '../../src';

export interface AutoCompleteDemoState {
    open: boolean;
    value: string;
}

const items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles',
               'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];

export class AutoCompleteDemo extends React.Component<{}, AutoCompleteDemoState> {
    public state = {
        open: false,
        value: ''
    };

    public handleChange = (e: ChangeEvent<string>) => {
        this.setState({value: e.value});
    }

    public handleOpenStateChange = (e: ChangeEvent<boolean>) => {
        this.setState({open: e.value});
    }

    public render() {
        return (
            <div>
                <h2>AutoComplete</h2>
                <section data-automation-id="AUTO_COMPLETE_DEMO">
                    <AutoComplete
                        dataSource={items}
                        onChange={this.handleChange}
                        onOpenStateChange={this.handleOpenStateChange}
                        open={this.state.open}
                        value={this.state.value}
                        openOnFocus
                        noSuggestionsNotice="No suggestions"
                    />
                </section>
                <span data-automation-id="AUTO_COMPLETE_DEMO_TEXT">You picked: {this.state.value}</span>
            </div>
        );
    }
}
