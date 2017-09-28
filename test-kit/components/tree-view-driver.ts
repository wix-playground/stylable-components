import * as React from 'react';
import {DriverBase, simulate} from 'test-drive-react';
import {TreeItem, TreeItemProps, TreeKeyCodes, TreeView} from '../../src';

const treeItem = 'TREE_ITEM';
export type ValidKeyCodes = 'ENTER' | 'HOME' | 'END' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public getItem(id: string): TreeItemDriver {
        return new TreeItemDriver(() => this.select(getTreeItem(id)), id);
    }

    public pressKey(keyCode: ValidKeyCodes): void {
        simulate.keyDown(this.root, {keyCode: TreeKeyCodes[keyCode]});
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

    public clickIcon(): void {
        simulate.click(this.icon);
    }

    public clickLabel(): void {
        simulate.click(this.label);
    }

    public getNestedItem(id: string) {
        return new TreeItemDriver(() => this.select(getTreeItem(id)), id);
    }
}
