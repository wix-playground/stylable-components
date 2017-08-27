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

const newTreeData = JSON.parse(JSON.stringify(treeData));
newTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});

export interface TreeViewWrapperState {
    treeData: object[];
}

export class TreeViewWrapper extends React.Component<{}, TreeViewWrapperState> {

    constructor() {
        super();
        this.state = {
            treeData
        };
    }

    public render() {
        return <TreeView dataSource={this.state.treeData}/>;
    }

    public switchDataSource = () => {
        this.setState({
           treeData: newTreeData
        });
    }
}
