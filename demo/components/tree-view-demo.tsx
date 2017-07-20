import * as React from 'react';
import { TreeView } from '../../src';
import { TreeItemData } from '../../src/components/tree-view/tree-view';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export const treeData: TreeItemData[] = [
    { label: 'Food Menu', children: [
        { label: 'Salads', children: [
            { label: 'Greek Salad' },
            { label: 'Israeli Salad' },
            { label: 'Caesar Salad' }
        ]},
        { label: 'Steaks', children: [
            { label: 'Fillet Steak' },
            { label: 'Sirloin Steak' }
        ]},
        { label: 'Desserts', children: [
            { label: 'Pancakes' },
            { label: 'Muffin' },
            { label: 'Waffle' },
            { label: 'Cupcake' }
        ]}
    ]}
];

function SelectedItem({selectedItem}: any) {
    return <div style={{'fontSize': '1.41em', 'textDecoration': 'underline'}}>{selectedItem ?
        (!selectedItem.children ? `You chose ${selectedItem.label}. Bon appetit!` :
            `You are looking at ${selectedItem.label}. Please choose a dish.`) :
        'Please choose from the Menu!'}</div>
}

@observer
export class TreeViewDemo extends React.Component<{}, {}> {
    @observable.ref selectedItem: TreeItemData | undefined = undefined;
    @observable.ref focusedItem: TreeItemData | undefined = undefined;

    onSelectItem = (item: TreeItemData) => {
        this.selectedItem = item;
        this.focusedItem = item;
    };

    onFocusItem = (item: TreeItemData) => {
        this.focusedItem = item;
    };

    render() {
        return (
            <div>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.selectedItem}/>
                    <br/>
                    <TreeView dataSource={treeData} onSelectItem={this.onSelectItem} onFocusItem={this.onFocusItem}
                              selectedItem={this.selectedItem} focusedItem={this.focusedItem} />
                </section>
            </div>
        )
    }
}
