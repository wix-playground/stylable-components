/// <reference types="react" />
import * as React from 'react';
import { TreeItemData } from '../../src/components/tree-view/tree-view';
export interface TreeViewWrapperState {
    treeData: object[];
}
export declare class TreeViewWrapper extends React.Component<{}, TreeViewWrapperState> {
    state: {
        treeData: TreeItemData[];
    };
    render(): JSX.Element;
    switchDataSource: () => void;
}
export declare class TreeViewMobxWrapper extends React.Component<{}, {}> {
    private obsTreeData;
    render(): JSX.Element;
    modifyMobxDataSource: () => void;
    renameLabel: () => void;
}
