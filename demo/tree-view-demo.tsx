import * as React from 'react';
import { TreeView } from '../src';

interface TreeViewDemoState {
    selectedItem: Object;
}

export const treeData: Object[] = [
    { id: 'main', label: 'main', children: [
        { id: 'id0', label: 'label0' },
        { id: 'id1', label: 'label1' },
        { id: 'id2', label: 'label2' }
    ]}
];


export class TreeViewDemo extends React.Component<{}, TreeViewDemoState>{

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
                <TreeView dataSource={treeData} onSelectItem={this.onSelectItem} selectedItem={this.state.selectedItem} />
            </div>
        )
    }
}
