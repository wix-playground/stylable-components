import * as React from 'react';
import { TreeView } from '../../src';
import { TreeItemData } from '../../src/components/tree-view/tree-view';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from "mobx-react-devtools";

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
    return <div style={{'fontSize': '1.41em', 'textDecoration': 'underline'}}>{selectedItem.item.label ?
                  (!selectedItem.item.children ? `You chose ${selectedItem.item.label}. Bon appetit!` :
                  `You are looking at ${selectedItem.item.label}. Please choose a dish.`) :
                  'Please choose from the Menu!'}</div>
}

const SelectedItemWrapper = observer(SelectedItem);

// @observer
export class TreeViewDemo extends React.Component<{}, {}> {
    private selectedItem: any = observable({
        item: {}
    });

    onSelectItem = (item: Object) => {
        this.selectedItem.item = item;
    };

    render() {
        return (
            <div>
                <DevTools />
                <h3>Default TreeView with data only</h3>
                <TreeView dataSource={treeData} />
                <br/>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItemWrapper selectedItem={this.selectedItem}/>
                    <br/>
                    <TreeView dataSource={treeData} onSelectItem={this.onSelectItem}
                              selectedItem={this.selectedItem} />
                </section>
            </div>
        )
    }
}
