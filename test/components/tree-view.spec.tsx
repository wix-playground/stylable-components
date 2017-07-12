import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { TreeView, TreeItem } from '../../src';
import { TreeViewDemo, treeData } from '../../demo/tree-view-demo';
import { TreeItemData } from '../../src/components/tree-view/tree-view';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const noop = (item: Object) => false;

function getLabelsList(data: {label: string, children?: Object[]}): string[] {
    return [data.label].concat(...(data.children || []).map(getLabelsList));
}

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id}`;
    }

    it('renders a tree view with a few children, clicks ones of them to expand and close', async () => {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        await waitForDom(() => expect(select(treeView + '_DEMO'), 'demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

        simulate.click(select(treeView + '_DEMO', getTreeItem(treeData[0].label)));
        nodeChildren!.forEach(item => simulate.click(select(treeView + '_DEMO', getTreeItem(item.label))));

        const allNodesLabels = treeData.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(select(treeView + '_DEMO', getTreeItem(item)), `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        simulate.click(elementToSelect);
        await waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));

        // this verifies the feature of not closing expanded item if its not selected
        simulate.click(select(treeView + '_DEMO', getTreeItem(treeData[0].label)));
        simulate.click(select(treeView + '_DEMO', getTreeItem(treeData[0].label)));

        return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());
    });

    describe('Using default renderer', () => {

        it('renders to the screen', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() => expect(select(treeView)).to.be.present());
        });

        it('renders correct children', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(select(treeView, getTreeItem(item.label))).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', () => {
            const onSelectItem = sinon.spy();
            const { select } = clientRenderer.render(<TreeView dataSource={treeData} onSelectItem={onSelectItem}/>);

            const nodeLabelToClick = getTreeItem(treeData[0].label);

            simulate.click(select(nodeLabelToClick));

            return waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]);
            });
        });

        describe('<TreeItem />', () => {

            const item = { label: 'label' };

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
