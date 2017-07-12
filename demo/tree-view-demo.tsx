import * as React from 'react';
import { TreeView } from '../src';
import { TreeItemData } from '../src/components/tree-view/tree-view';

interface TreeViewDemoState {
    selectedItem: Object;
}

export const treeData: TreeItemData[] = [
    { label: 'main', children: [
        { label: 'label0', children: [
            { label: 'label3' },
            { label: 'label4' },
            { label: 'label5' }
        ]},
        { label: 'label1', children: [
            { label: 'label6' },
            { label: 'label7' }
        ]},
        { label: 'label2', children: [
            { label: 'label8' },
            { label: 'label9' },
            { label: 'label10' },
            { label: 'label11' }
        ]}
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
