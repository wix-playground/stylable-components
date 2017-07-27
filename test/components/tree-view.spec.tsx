import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { hasCssState } from '../utils/has-css-state';
import { TreeView, TreeItem } from '../../src';
import treeViewStyles from '../../src/components/tree-view/tree-view.st.css';
import { TreeViewDemo, treeData } from '../../demo/components/tree-view-demo';
import { TreeItemData } from '../../src/components/tree-view/tree-view';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const noop = (item: Object) => false;

function getLabelsList(data: {label: string, children?: Object[]}): string[] {
    return [data.label]
               .concat(...(data.children || [])
               .map(getLabelsList));
}

function getAllNodeLabels(treeData: Object[]) {
    return treeData.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id.replace(' ', '_')}`;
    }

    it('renders a tree view with a few children, clicks ones of then', async () => {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        await waitForDom(() => expect(select(treeView + '_DEMO')).to.be.present());

        const allNodesLabels = getAllNodeLabels(treeData);
        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(select(treeView + '_DEMO', getTreeItem(item)), `${item} was not present`).to.be.present()));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        simulate.click(elementToSelect);
        return waitForDom(() => hasCssState(elementToSelect, treeViewStyles, {selected: true}));

    });

    describe('Using default renderer', () => {
        it('renders correct children', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(select(treeView, getTreeItem(item.label)), `${item.label} was not present`).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', () => {
            const onSelectItem = sinon.spy();
            const { select } = clientRenderer.render(<TreeView dataSource={treeData} onSelectItem={onSelectItem}/>);

            const firstNodeChildren = treeData[0].children;

            const nodeLabelToClick = getTreeItem(firstNodeChildren![1].label);

            simulate.click(select(nodeLabelToClick));

            return waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(firstNodeChildren![1]);
            });
        });

        describe('<TreeItem />', () => {

            const item = { label: 'label' };
            const nestedItem = treeData[0].children![1];

            it('renders an item', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label))).to.be.present());
            });

            it('renders with provided label', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_LABEL')).to.have.text(item.label));
            });

            it('renders with an icon', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_ICON')).to.be.present());
            });

            it('renders correct children', () => {
                const { select, waitForDom } = clientRenderer.render(<TreeItem item={nestedItem} itemRenderer={TreeItem} isSelected={noop} />);

                return waitForDom(() =>
                    nestedItem.children!.forEach((item: TreeItemData) =>
                        expect(select(getTreeItem(item.label)), `${item.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', () => {
                const onClick = sinon.spy();
                const { select } = clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem}
                                                                   onItemClick={onClick} isSelected={noop}/>);

                simulate.click(select(getTreeItem(item.label)));

                return waitFor(() => expect(onClick).to.have.been.calledOnce);
            });
        });
    });
});
