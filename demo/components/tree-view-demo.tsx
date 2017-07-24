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
    return <div style={{'fontSize': '1.41em', 'textDecoration': 'underline'}}>{selectedItem.label ?
                  (!selectedItem.children ? `You chose ${selectedItem.label}. Bon appetit!` :
                  `You are looking at ${selectedItem.label}. Please choose a dish.`) :
                  'Please choose from the Menu!'}</div>
}

@observer
export class TreeViewDemo extends React.Component<{}, {}> {
    private selected: any = observable({
        item: {}
    });

    onSelectItem = (item: Object) => {
        this.selected.item = item;
    };

    render() {
        return (
            <div>
                <h3>Default TreeView with data only</h3>
                <TreeView dataSource={treeData} />
                <br/>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.selected.item}/>
                    <br/>
                    <TreeView dataSource={treeData} onSelectItem={this.onSelectItem}
                              selectedItem={this.selected.item} />
                </section>
            </div>
        )
    }
}
