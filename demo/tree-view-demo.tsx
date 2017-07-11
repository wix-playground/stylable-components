import * as React from 'react';
import { TreeView } from '../src';

interface TreeViewDemoState {
    selectedItem: Object;
}

export const treeData: Object[] = [
    { label: 'main', children: [
        { label: 'label0' },
        { label: 'label1' },
        { label: 'label2' }
    ]}
];


export class TreeViewDemo extends React.Component<{}, TreeViewDemoState>{

    constructor() {
        super();
        this.state = {
            selectedItem: {}
        };
    }

    onSelectItem = (item: Object) => {
        this.setState({selectedItem: item});
    };

    render() {
        return (
            <div>
                <h3>Default TreeView with data only</h3>
                <TreeView dataSource={treeData} />
                <br/>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <TreeView dataSource={treeData} onSelectItem={this.onSelectItem}
                              selectedItem={this.state.selectedItem} />
                </section>
            </div>
        )
    }
}
