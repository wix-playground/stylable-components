import {DriverBase, simulate} from 'test-drive-react';
import {TreeView} from '../../src';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public getItem(id: string): HTMLDivElement {
        return this.select(getTreeItem(id));
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
