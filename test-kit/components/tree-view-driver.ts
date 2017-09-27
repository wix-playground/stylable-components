import * as ReactDOM from 'react-dom';
import {DriverBase, simulate} from 'test-drive-react';
import {TreeItem, TreeItemProps, TreeView} from '../../src';
import {TreeViewMobxWrapper, TreeViewWrapper} from '../../test/components/tree-view.spec';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public getItem(id: string): TreeItemDriver {
        return new TreeItemDriver(() => this.select(getTreeItem(id)));
    }

    public toggleItem(id: string): void {
        simulate.click(this.getItemIcon(id));
    }

    public selectItem(id: string): void {
        simulate.click(this.getItemLabel(id));
    }

    public getItemIcon(id: string): Element {
        return this.select(`${getTreeItem(id)}_ICON`);
    }

    public getItemLabel(id: string): HTMLElement {
        return this.select<HTMLElement>(`${getTreeItem(id)}_LABEL`);
    }

    public pressKey(keyCode: number): void {
        simulate.keyDown(this.select(treeView), {keyCode});
    }
}

export class TreeViewInstanceDriver extends DriverBase {
    public static ComponentClass = TreeView;

    constructor(public readonly instance: TreeView) {
        super(() => ReactDOM.findDOMNode(instance));
    }

    public getItem(id: string): HTMLDivElement {
        return this.select(getTreeItem(id));
    }

    public getItemIcon(id: string): Element {
        return this.select(`${getTreeItem(id)}_ICON`);
    }
}

export class TreeItemDriver extends DriverBase {
    public static ComponentClass: React.SFC<TreeItemProps> = TreeItem;

    constructor(public readonly elem: Element, private id: string) {
        super(() => elem);
    }

    public get label(): Element {
        return this.select<HTMLElement>(`${getTreeItem(this.id)}_LABEL`);
    }

    public get icon(): Element {
        return this.select(`${getTreeItem(this.id)}_ICON`);
    }

    public getNestedItemDriver(id: string) {
        return new TreeItemDriver(this.select(getTreeItem(id)), id);
    }
}
