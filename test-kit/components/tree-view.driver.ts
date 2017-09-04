import {DriverBase, simulate} from "test-drive-react";
import {TreeView} from "../../src/components/tree-view/tree-view";

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    static ComponentClass = TreeView;

    getItem(id: string): HTMLDivElement {
        return this.select(getTreeItem(id));
    }

    toggleItem(id: string): void {
        simulate.click(this.getItemIcon(id));
    }

    selectItem(id: string): void {
        simulate.click(this.getItemLabel(id));
    }

    getItemIcon(id: string): Element {
        return this.select(`${getTreeItem(id)}_ICON`);
    }

    getItemLabel(id: string): HTMLElement {
        return this.select<HTMLElement>(`${getTreeItem(id)}_LABEL`);
    }

    pressKey(keyCode: number): void {
        simulate.keyDown(this.select('TREE_VIEW'), { keyCode });
    }
}
