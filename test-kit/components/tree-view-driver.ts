import * as React from 'react';
import {DriverBase, simulate} from 'test-drive-react';
import {TreeItem, TreeItemProps, TreeView} from '../../src';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public getItemDriver(id: string): TreeItemDriver {
        return new TreeItemDriver(() => this.select(getTreeItem(id)), id);
    }

    public toggleItem(id: string): void {
        simulate.click(this.getItemDriver(id).icon);
    }

    public selectItem(id: string): void {
        simulate.click(this.getItemDriver(id).label);
    }

    public pressKey(keyCode: number): void {
        simulate.keyDown(this.select(treeView), {keyCode});
    }
}

export class TreeItemDriver extends DriverBase {
    public static ComponentClass: React.SFC<TreeItemProps> = TreeItem;

    constructor(getElem: () => Element, private id: string) {
        super(getElem);
    }

    public get label(): Element {
        return this.select<HTMLElement>(`${getTreeItem(this.id)}_LABEL`);
    }

    public get icon(): Element {
        return this.select(`${getTreeItem(this.id)}_ICON`);
    }

    public getNestedItemDriver(id: string) {
        return new TreeItemDriver(() => this.select(getTreeItem(id)), id);
    }
}
