import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { TreeView, TreeItem } from '../../src';
import { TreeViewDemo } from '../../demo/components/tree-view-demo';
import { StateMap, TreeItemData, TreeItemState} from '../../src/components/tree-view/tree-view';
import { KeyCodes } from '../../src/common/key-codes';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const treeData: TreeItemData[] = [
    { label: 'Food Menu', children: [
        { label: 'Salads', children: [
            { label: 'Greek Salad' },
            { label: 'Israeli Salad' },
            { label: 'Caesar Salad' }
        ]},
        { label: 'Steaks', children: [
            { label: 'Fillet Steak' },
            { label: 'Sirloin Steak' }
        ]},
        { label: 'Desserts', children: [
            { label: 'Pancakes' },
            { label: 'Muffin' },
            { label: 'Waffle' },
            { label: 'Cupcake' }
        ]}
    ]}
];

function getLabelsList(data: {label: string, children?: Object[]}): string[] {
    return [data.label]
        .concat(...(data.children || [])
            .map(getLabelsList));
}

function getAllNodeLabels(treeData: Object[]): string[] {
    return treeData.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

function initStateMap(data: Object[] = [], stateMap: StateMap) {
    data.forEach((item: TreeItemData) => {
        stateMap.set(item, { isSelected: false, isExpanded: true, isFocused: false });
        initStateMap(item.children || [], stateMap);
    });
}

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id.replace(' ', '_')}`;
    }
    const item = { label: 'label' };
    const nestedItem: TreeItemData = treeData[0].children![1];

    const state: TreeItemState = { isSelected: false, isExpanded: true, isFocused: false };
    const stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    initStateMap(treeData, stateMap);

    const allNodesLabels: string[] = getAllNodeLabels(treeData);

    it('renders a tree view with a few children, clicks ones of them to expand and close', async () => {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        await waitForDom(() => expect(select(treeView + '_DEMO'), 'demo not present').to.be.present());

        const rootNode = getTreeItem(treeData[0].label);

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

        simulate.click(select(treeView + '_DEMO', rootNode));
        nodeChildren!.forEach(item => simulate.click(select(treeView + '_DEMO', getTreeItem(item.label))));

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(select(treeView + '_DEMO', getTreeItem(item)), `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        simulate.click(elementToSelect);
        await waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));

        // this verifies the feature of not closing expanded item if its not selected
        simulate.click(select(treeView + '_DEMO', rootNode));
        simulate.click(select(treeView + '_DEMO', rootNode));

        return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());
    });

    it('ends up in expected state after multiple clicks on same tree node', async () => {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        simulate.click(select(treeView + '_DEMO', getTreeItem(allNodesLabels[0])));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[1]));
        let elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        await waitForDom(() => expect(elementToSelect).to.be.present());
        await waitForDom(() => expect(elementToAssert).to.be.absent());

        simulate.click(elementToSelect);
        elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));
        await waitForDom(() => expect(elementToAssert).to.be.present());

        simulate.click(elementToSelect);

        return waitForDom(() => expect(elementToAssert).to.be.absent());
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

            const nodeLabelToClick = getTreeItem(treeData[0].label);

            simulate.click(select(nodeLabelToClick));

            return waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]);
            });
        });

        describe('Keyboard Navigation', () => {
            it('expands and collapses focused treeItem when right and left arrows are clicked', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children;

                // to expand root
                simulate.click(select(rootNode));

                await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.LEFT });
                await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.RIGHT });

                return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());
            });

            it('returns to parent if there is after collapsing the element if possible when left is clicked', () => {

            });

            it('focuses next are previous when down and up arrows are clicked', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children;

                // to select it
                simulate.click(select(rootNode));

                // this should assert first child of root is not focused
                await waitForDom(() => expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-focused', 'false'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });

                // this should assert first child of root is focused
                await waitForDom(() =>
                    expect(select(getTreeItem(nodeChildren![0].label)), 'down didnt work').to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.UP });

                // this should assert first child of root is not focused
                return waitForDom(() => {
                    expect(select(getTreeItem(nodeChildren![0].label)), 'up didnt work').to.have.attr('data-focused', 'false');
                    expect(select(rootNode), ).to.have.attr('data-focused', 'true');
                });
            });

            it('focuses parent node\'s next sibling after exhausting current node sibling list', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children;

                // to select it
                simulate.click(select(rootNode));
                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });
                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.RIGHT });

                await waitForDom(() =>
                    expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-focused', 'true'));

                for (let i = 0; i < nodeChildren![0].children!.length; i++) {
                    simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });
                }

                const firstSubtreeChildren = nodeChildren![0].children!;

                await waitForDom(() =>
                    expect(select(getTreeItem(firstSubtreeChildren[firstSubtreeChildren.length - 1].label)))
                        .to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });

                return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.have.attr('data-focused', 'true'));
            });

            it('selects currently focused node on Enter click', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children;

                // to select it
                simulate.click(select(rootNode));
                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });

                await waitForDom(() =>
                    expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-selected', 'false'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.ENTER });

                return waitForDom(() =>
                    expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-selected', 'true'));
            });

            it('unfocuses the currently focused node when ESC is clicked', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);

                simulate.click(select(rootNode));

                await waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.ESCAPE });

                return waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'false'));
            });

            it('focuses first item when HOME is clicked', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);

                // to select it
                simulate.click(select(rootNode));
                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });
                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });

                await waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'false'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.HOME });

                return waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'true'));
            });

            it('focuses last item available when END is clicked', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children!;

                simulate.click(select(rootNode));

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                simulate.click(select(getTreeItem(lastRootNode.label)));

                await waitForDom(() =>
                    expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
                        .to.have.attr('data-focused', 'false'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.END });

                return waitForDom(() =>
                    expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
                        .to.have.attr('data-focused', 'true'));
            });

            it('cannot focus past first and last elements when clicking up and down respectively', async () => {
                const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

                const rootNode = getTreeItem(treeData[0].label);
                const nodeChildren = treeData[0].children!;

                simulate.click(select(rootNode));

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                simulate.click(select(getTreeItem(lastRootNode.label)));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.END });
                await waitForDom(() =>
                    expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
                        .to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.DOWN });

                await waitForDom(() =>
                    expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
                        .to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.HOME });

                await waitForDom(() =>
                    expect(select(rootNode))
                        .to.have.attr('data-focused', 'true'));

                simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: KeyCodes.UP });

                return waitForDom(() =>
                    expect(select(rootNode))
                        .to.have.attr('data-focused', 'true'));
            });
        });

        describe('<TreeItem />', () => {

            it('renders an item', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem}
                                                    state={state} stateMap={stateMap} />);

                return waitForDom(() => expect(select(getTreeItem(item.label))).to.be.present());
            });

            it('renders with provided label', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem}
                                                    state={state} stateMap={stateMap} />);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_LABEL')).to.have.text(item.label));
            });

            it('renders with an icon', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem}
                                                    state={state} stateMap={stateMap} />);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_ICON')).to.be.present());
            });

            it('renders correct children', () => {
                const { select, waitForDom } = clientRenderer.render(<TreeItem item={nestedItem} itemRenderer={TreeItem}
                                                                               state={state} stateMap={stateMap} />);

                return waitForDom(() =>
                    nestedItem.children!.forEach((item: TreeItemData) =>
                        expect(select(getTreeItem(item.label)), `${item.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', () => {
                const onClick = sinon.spy();
                const { select } = clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} onItemClick={onClick}
                                                                   state={state} stateMap={stateMap} />);

                simulate.click(select(getTreeItem(item.label)));

                return waitFor(() => expect(onClick).to.have.been.calledOnce);
            });
        });
    });
});
