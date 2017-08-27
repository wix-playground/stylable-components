import * as React from 'react';
import {TreeView} from '../../src';
import {TreeItemData} from '../../src/components/tree-view/tree-view';

export const treeData: TreeItemData[] = [
    { label: 'Food Menu', children: [
        { label: 'Salads', children: [
            {label: 'Greek Salad'},
            {label: 'Israeli Salad'},
            {label: 'Caesar Salad'}
        ]},
        { label: 'Steaks', children: [
            {label: 'Fillet Steak'},
            {label: 'Sirloin Steak'}
        ]},
        { label: 'Desserts', children: [
            {label: 'Pancakes'},
            {label: 'Muffin'},
            {label: 'Waffle'},
            {label: 'Cupcake'}
        ]}
    ]}
];

function SelectedItem({selectedItem}: any) {
    return (
        <div style={{fontSize: '1.41em', textDecoration: 'underline'}}>
            {selectedItem ?
                (!selectedItem.children ?
                    `You chose ${selectedItem.label}. Bon appetit!` :
                    `You are looking at ${selectedItem.label}. Please choose a dish.`) :
                'Please choose from the Menu!'}
        </div>
    );
}

export interface TreeViewDemoState {
    selectedItem: TreeItemData | undefined;
    focusedItem: TreeItemData | undefined;
    treeData: object[];
}

export class TreeViewDemo extends React.Component<{}, TreeViewDemoState> {

    constructor() {
        super();
        this.state = {
            selectedItem: undefined,
            focusedItem: undefined,
            treeData
        };
    }

    public render() {
        return (
            <div>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.state.selectedItem} />
                    <br />
                    <TreeView
                        dataSource={this.state.treeData}
                        onFocusItem={this.onFocusItem}
                        focusedItem={this.state.focusedItem}
                        onSelectItem={this.onSelectItem}
                        selectedItem={this.state.selectedItem}
                    />
                    <br />
                    <button onClick={this.switchDataSource} data-automation-id="SWITCH">Switch!</button>
                </section>
            </div>
        );
    }

    private switchDataSource = () => {
        const newTreeData = treeData.map(data => ({...data}));
        newTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});

        this.setState({
           treeData: newTreeData
        });
    }

    private onSelectItem = (item: TreeItemData) => {
        this.setState({
            selectedItem: item,
            focusedItem: item
        });
    }

    private onFocusItem = (item: TreeItemData) => {
        this.setState({
            focusedItem: item
        });
    }

}
