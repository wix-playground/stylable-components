import * as React from 'react';
import { TreeView } from '../../src';
import { TreeItemData } from '../../src/components/tree-view/tree-view';

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

export interface TreeViewDemoState {
    selectedItem: TreeItemData | undefined;
}

export class TreeViewDemo extends React.Component<{}, TreeViewDemoState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            selectedItem: undefined
        };
    }

    onSelectItem = (item: TreeItemData) => {
        this.setState({selectedItem: item});
    };

    render() {
        return (
            <div>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.state.selectedItem}/>
                    <br/>
                    <TreeView dataSource={treeData} onSelectItem={this.onSelectItem}
                              selectedItem={this.state.selectedItem} />
                </section>
            </div>
        )
    }
}
