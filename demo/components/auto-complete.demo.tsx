import * as React from 'react';
import {AutoComplete, AutoCompleteChangeEvent} from '../../src';

export interface AutoCompleteDemoState {
    open: boolean;
    inputText: string;
}

const items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles',
               'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];

export class AutoCompleteDemo extends React.Component<{}, AutoCompleteDemoState> {
    public state = {open: false, inputText: ''};

    public onChange = (e: AutoCompleteChangeEvent) => {
        this.setState({
            inputText: e.value
        });
    }

    public render() {
        return (
            <div>
                <h2>AutoComplete</h2>
                <section data-automation-id="AUTO_COMPLETE_DEMO" style={{width: '250px'}}>
                    <AutoComplete
                        dataSource={items}
                        onChange={this.onChange}
                        open={this.state.open}
                        value={this.state.inputText}
                    />
                </section>
                <span data-automation-id="AUTO_COMPLETE_DEMO_TEXT">You picked: {this.state.inputText}</span>
            </div>
        );
    }
}
