/// <reference types="react" />
import * as React from 'react';
import { TreeItemData, TreeItemProps } from '../../src';
export declare const treeData: TreeItemData[];
export interface TreeViewDemoState {
    selectedItem: TreeItemData | undefined;
    focusedItem: TreeItemData | undefined;
}
export interface TreeViewDemoCustomState {
    selectedItemCustom: TreeItemData | undefined;
    focusedItemCustom: TreeItemData | undefined;
}
export declare const CustomItem: React.SFC<TreeItemProps>;
export declare class TreeViewDemo extends React.Component<{}, TreeViewDemoState> {
    state: {
        selectedItem: undefined;
        focusedItem: undefined;
        checkBoxMap: {};
    };
    render(): JSX.Element;
    private onSelectItem;
    private onFocusItem;
}
export declare class TreeViewDemoCustom extends React.Component<{}, TreeViewDemoCustomState> {
    state: {
        selectedItemCustom: undefined;
        focusedItemCustom: undefined;
    };
    render(): JSX.Element;
    private onSelectItemCustom;
    private onFocusItemCustom;
}
