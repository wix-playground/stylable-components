import * as React from 'react';
import {DriverBase} from 'test-drive-react';
import {TreeView} from '../../../src';

// duplicating the data so i can pass a new object to the non-mobx version
const newTreeData = JSON.parse(JSON.stringify(treeData));
newTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});

export interface TreeViewWrapperState {
    treeData: object[];
}

export class TreeViewWrapper extends React.Component<{}, TreeViewWrapperState> {
    public state = {treeData};

    public render() {
        return <TreeView dataSource={this.state.treeData}/>;
    }

    public switchDataSource = () => {
        this.setState({
            treeData: newTreeData
        });
    }
}

export class TreeViewMobxWrapper extends React.Component<{}, {}> {
    @observable private obsTreeData: TreeItemData[] = treeData;

    public render() {
        return <TreeView dataSource={this.obsTreeData}/>;
    }

    public modifyMobxDataSource = () => {
        this.obsTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});
    }
}

function getLabelsList(data: { label: string, children?: object[] }): string[] {
    return [data.label]
        .concat(...(data.children || [])
            .map(getLabelsList));
}

function getAllNodeLabels(data: object[]): string[] {
    return data.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public treeItem: string = 'TREE_ITEM';
    public treeView: string = 'TREE_VIEW';

    public getTreeItem = (id: string) => `${this.treeItem}_${id.replace(' ', '_')}`;

    public getTreeItemIcon = (id: string) => `${this.getTreeItem(id)}_ICON`;

    public getTreeItemLabel = (id: string) => `${this.getTreeItem(id)}_LABEL`;


}
