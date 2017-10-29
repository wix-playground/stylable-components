import {observable} from 'mobx';
import * as React from 'react';
import {Stylesheet} from 'stylable';
import {ClientRenderer, DriverBase, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TreeViewDemo, TreeViewDemoCustom} from '../../demo/components/tree-view-demo';
import {initParentsMap, TreeItem, TreeItemData, TreeView, TreeViewParentsMap, TreeViewStateMap} from '../../src';
import {getLastAvailableItem, getNextItem, getPreviousItem} from '../../src/components/tree-view/tree-util';
import {TreeItemDriver, TreeViewDriver} from '../../test-kit';
import {elementHasStylableState} from '../../test-kit/utils';

import treeViewDemoStyle from '../../demo/components/tree-view-demo.st.css';

const treeData: TreeItemData[] = [
    {
        label: 'Food Menu', children: [
            {
                label: 'Salads', children: [
                    {label: 'Greek Salad'},
                    {label: 'Israeli Salad'},
                    {label: 'Caesar Salad'}
                ]
            },
            {
                label: 'Steaks', children: [
                    {label: 'Fillet Steak'},
                    {label: 'Sirloin Steak'}
                ]
            },
            {
                label: 'Desserts', children: [
                    {label: 'Pancakes'},
                    {label: 'Muffin'},
                    {label: 'Waffle'},
                    {label: 'Cupcake'}
                ]
            }
        ]
    }
];

const changedLabel = 'Kaiserschmarrn';

// duplicating the data so i can pass a new object to the non-mobx version
const newTreeData = JSON.parse(JSON.stringify(treeData));
newTreeData[0].children![2].children!.push({label: changedLabel});

const parentsTestTreeData: TreeItemData[] = [
    {
        label: 'Food Menu', children: [
        {
            label: 'Desserts', children: [
            {label: 'Pancakes'},
            {label: 'Muffin'},
            {label: 'Waffle'},
            {label: 'Cupcake'}
        ]
        },
        {
            label: 'Salads', children: [
            {label: 'Greek Salad'},
            {label: 'Israeli Salad'},
            {label: 'Caesar Salad'}
        ]
        }
    ]
    }
];

class TreeViewDemoDriver extends DriverBase {
    public static ComponentClass = TreeViewDemo;

    public treeView = new TreeViewDriver(() => this.select('TREE_VIEW'));
}

class CustomTreeViewDemoDriver extends DriverBase {
    public static ComponentClass = TreeViewDemoCustom;

    public customTreeView = new TreeViewDriver(() => this.select('TREE_VIEW'));
}

function getLabelsList(data: { label: string, children?: object[] }): string[] {
    return [data.label]
        .concat(...(data.children || [])
            .map(getLabelsList));
}

function getAllNodeLabels(data: object[]): string[] {
    return data.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

function isElementSelected(element: Element, style: {$stylesheet: Stylesheet}) {
    return elementHasStylableState(element, style, 'selected');
}

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const sampleItem = {label: 'label'};
    const nestedItem: TreeItemData = treeData[0].children![1];

    const allNodesLabels: string[] = getAllNodeLabels(treeData);

    it('renders a tree view with a few children', async () => {
        const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
            <TreeViewDemo />
        ).withDriver(TreeViewDemoDriver);

        const {treeView} = treeViewDemo;

        await waitForDom(() => expect(treeView.root, 'demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.absent());

        treeView.getItem(treeData[0].label).clickIcon();
        nodeChildren!.forEach(child =>  treeView.getItem(child.label).clickIcon());

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(treeView.getItem(item).root, `item did not appear: ${item}`).to.be.present()));

        treeView.getItem(allNodesLabels[2]).clickLabel();
        await waitForDom(() => expect(treeView.getItem(allNodesLabels[2]).isSelected()).to.equal(true));
    });

    it('renders a tree view with custom children', async () => {
        const {driver: treeViewDemoCustom, waitForDom} = clientRenderer.render(
            <TreeViewDemoCustom />
        ).withDriver(CustomTreeViewDemoDriver);

        const {customTreeView} = treeViewDemoCustom;

        await waitForDom(() => expect(customTreeView.root, 'custom demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(customTreeView.getItem(nodeChildren![1].label).root).to.be.absent());

        customTreeView.getItem(treeData[0].label).clickIcon();
        nodeChildren!.forEach(child => customTreeView.getItem(child.label).clickIcon());

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(customTreeView.getItem(item).root,
                `item did not appear: ${item}`).to.be.present()));

        customTreeView.getItem(allNodesLabels[2]).clickLabel();
        await waitForDom(() => expect(
            isElementSelected(customTreeView.getItem(allNodesLabels[2]).root, treeViewDemoStyle)).to.equal(true));
    });

    it('ends up in expected state after multiple clicks on same tree node', async () => {
        const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
            <TreeViewDemo />
        ).withDriver(TreeViewDemoDriver);

        const {treeView} = treeViewDemo;

        treeView.getItem(allNodesLabels[0]).clickIcon();

        const elementToSelect = treeView.getItem(allNodesLabels[1]).icon;
        let elementToAssert = treeView.getItem(allNodesLabels[2]).root;

        await waitForDom(() => expect(elementToSelect).to.be.present());
        await waitForDom(() => expect(elementToAssert).to.be.absent());

        treeView.getItem(allNodesLabels[1]).clickIcon();

        elementToAssert = treeView.getItem(allNodesLabels[2]).root;
        await waitForDom(() => expect(elementToAssert).to.be.present());

        treeView.getItem(allNodesLabels[1]).clickIcon();

        await waitForDom(() => expect(elementToAssert).to.be.absent());
    });

    it('should rename node label without collapsing tree', async () => {
        const obsTreeData: TreeItemData[] = observable(treeData);
        const {waitForDom, driver: treeView} =
            clientRenderer.render(<TreeView dataSource={obsTreeData} />).withDriver(TreeViewDriver);

        const firstChildLabel = treeData[0].children![0].label;

        treeView.getItem(treeData[0].label).clickIcon();

        await waitForDom(() => expect(treeView.getItem(firstChildLabel).root).to.have.text(firstChildLabel));

        obsTreeData[0].children![0].label = changedLabel;

        return waitForDom(() => expect(treeView.getItem(changedLabel).root).to.have.text(changedLabel));
    });

    describe('Using default renderer', () => {
        it('renders correct children', async () => {
            const {driver: treeView, waitForDom} = clientRenderer.render(
                <TreeView dataSource={treeData} />
            ).withDriver(TreeViewDriver);

            await waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(treeView.getItem(item.label).root,
                        `${item.label} was not present`).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', async () => {
            const onSelectItem = sinon.spy();
            const {driver: treeView} = clientRenderer.render(
                <TreeView dataSource={treeData} onSelectItem={onSelectItem} />
            ).withDriver(TreeViewDriver);

            treeView.getItem(treeData[0].label).clickLabel();

            await waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]);
            });
        });

        describe('Keyboard Navigation', () => {
            it('reacts to keyboard events even when a node is not focused initially', async () => {
                const {driver: treeView, waitForDom} = clientRenderer.render(
                    <TreeView dataSource={treeData} />
                ).withDriver(TreeViewDriver);

                const nodeChildren = treeData[0].children;

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.absent());

                treeView.pressKey('RIGHT');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.present());
            });

            it('expands and collapses focused treeItem when right and left arrows are clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.present());

                treeView.pressKey('LEFT');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.absent());

                treeView.pressKey('RIGHT');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.present());
            });

            it('returns to parent if there is after collapsing the element if possible when left is clicked',
                async () => {
                    const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = treeViewDemo;

                    const nodeChildren = treeData[0].children;

                    treeView.getItem(treeData[0].label).clickIcon();

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).root).to.be.present());

                    treeView.getItem(nodeChildren![1].label).clickLabel();

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).isFocused()).to.equal(true));

                    treeView.pressKey('LEFT');

                    await waitForDom(() => expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true));
                });

            it('moves to child to if there is one after expanding the element if possible when right is clicked',
                async () => {
                    const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = treeViewDemo;

                    const nodeChildren = treeData[0].children;

                    treeView.getItem(treeData[0].label).clickIcon();

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).root).to.be.present());

                    await waitForDom(() => expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true));

                    treeView.pressKey('RIGHT');

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isFocused()).to.equal(true));
                });

            it('focuses next and previous when down and up arrows are clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                // this should assert first child of root is not focused
                await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isFocused()).to.equal(false));

                treeView.pressKey('DOWN');

                // this should assert first child of root is focused
                await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isFocused()).to.equal(true));

                treeView.pressKey('UP');

                // this should assert first child of root is not focused
                await waitForDom(() => {
                    expect(treeView.getItem(nodeChildren![0].label).isFocused()).to.equal(false);
                    expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true);
                });
            });

            it('focuses parent node\'s next sibling after exhausting current node sibling list', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                treeView.pressKey('DOWN');
                treeView.pressKey('RIGHT');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isFocused()).to.equal(true));

                nodeChildren![0].children!.forEach(() => treeView.pressKey('DOWN'));

                const firstSubtreeChildren = nodeChildren![0].children!;

                await waitForDom(() => expect(treeView
                                                .getItem(firstSubtreeChildren[firstSubtreeChildren.length - 1].label)
                                                .isFocused()).to.equal(true));

                treeView.pressKey('DOWN');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label).isFocused()).to.equal(true));
            });

            it('selects currently focused node on Enter click', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                treeView.pressKey('DOWN');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isSelected()).to.equal(false));

                treeView.pressKey('ENTER');

                await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label).isSelected()).to.equal(true));
            });

            it('focuses first item when HOME is clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                treeView.pressKey('DOWN');
                treeView.pressKey('DOWN');

                await waitForDom(() => expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(false));

                treeView.pressKey('HOME');

                await waitForDom(() => expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true));
            });

            it('focuses last item available when END is clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children!;

                treeView.getItem(treeData[0].label).clickLabel();
                treeView.getItem(treeData[0].label).clickIcon();

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.getItem(lastRootNode.label).clickIcon();

                await waitForDom(() => expect(treeView
                    .getItem(lastChildren[lastChildren.length - 1].label)
                    .isFocused()).to.equal(false));

                treeView.pressKey('END');

                await waitForDom(() => expect(treeView
                    .getItem(lastChildren[lastChildren.length - 1].label)
                    .isFocused()).to.equal(true));
            });

            it('cannot focus past first and last elements when clicking up and down respectively', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children!;

                treeView.getItem(treeData[0].label).clickIcon();

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.getItem(lastRootNode.label).clickIcon();

                treeView.pressKey('END');

                await waitForDom(() => expect(treeView
                    .getItem(lastChildren[lastChildren.length - 1].label)
                    .isFocused()).to.equal(true));

                treeView.pressKey('DOWN');

                await waitForDom(() => expect(treeView
                    .getItem(lastChildren[lastChildren.length - 1].label)
                    .isFocused()).to.equal(true));

                treeView.pressKey('HOME');

                await expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true);

                treeView.pressKey('UP');

                await expect(treeView.getItem(treeData[0].label).isFocused()).to.equal(true);
            });
        });

        describe('Reaction to dataSource changes', () => {
            it('renders the additional item when a new data array is passed', async () => {
                const {container, waitForDom, driver: treeView} =
                    clientRenderer.render(<TreeView dataSource={treeData} />).withDriver(TreeViewDriver);

                treeView.getItem(treeData[0].label).clickIcon();
                treeView.getItem(treeData[0].children![2].label).clickIcon();

                await waitForDom(() => expect(treeView.getItem('Kaiserschmarrn').root).to.be.absent());

                clientRenderer.render(<TreeView dataSource={newTreeData} />, container);

                treeView.getItem(newTreeData[0].label).clickIcon();
                treeView.getItem(newTreeData[0].children![2].label).clickIcon();

                return waitForDom(() => expect(treeView.getItem('Kaiserschmarrn').root).to.be.present());
            });

            it('correctly reacts to keyboard nav after a new data array is passed (updating parents map)', async () => {
                const onFocusItem = sinon.spy();

                const {container, waitForDom, driver: treeView} =
                    clientRenderer
                        .render(<TreeView dataSource={treeData} onFocusItem={onFocusItem} focusedItem={treeData[0]} />)
                        .withDriver(TreeViewDriver);

                treeView.getItem(treeData[0].label).clickIcon();

                treeView.pressKey('DOWN');

                await waitForDom(() => {
                    expect(onFocusItem.getCall(1).args[0].label,
                        `${onFocusItem.getCall(1).args[0].label} was the wrong arg`)
                        .to.equal(treeData[0].children![0].label);
                });

                const onFocusItemNew = sinon.spy();
                const {driver: treeViewNew} =
                    clientRenderer
                        .render((
                            <TreeView
                                dataSource={parentsTestTreeData}
                                onFocusItem={onFocusItemNew}
                                focusedItem={parentsTestTreeData[0]}
                            />), container).withDriver(TreeViewDriver);

                treeViewNew.getItem(parentsTestTreeData[0].label).clickIcon();

                treeViewNew.pressKey('DOWN');

                await waitForDom(() => {
                    expect(onFocusItemNew.getCall(1).args[0].label,
                        `${onFocusItemNew.getCall(1).args[0].label} was the wrong arg`)
                        .to.equal(parentsTestTreeData[0].children![0].label);
                });
            });

            it('renders the additional item when a new data element is added to existing data', async () => {
                const obsTreeData: TreeItemData[] = observable(treeData);
                const {waitForDom, driver: treeView} =
                    clientRenderer.render(<TreeView dataSource={obsTreeData} />).withDriver(TreeViewDriver);

                treeView.getItem(treeData[0].label).clickIcon();
                treeView.getItem(treeData[0].children![2].label).clickIcon();

                await waitForDom(() => expect(treeView.getItem('Kaiserschmarrn').root).to.be.absent());

                obsTreeData[0].children![2].children!.push({label: changedLabel});

                return waitForDom(() => expect(treeView.getItem('Kaiserschmarrn').root).to.be.present());
            });
        });

        describe('<TreeItem />', () => {

            const stateMap = new TreeViewStateMap();
            stateMap.getItemState(nestedItem).isExpanded = true;

            it('renders an item', async () => {
                const {driver: item, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                return waitForDom(() => expect(item.root).to.be.present());
            });

            it('renders with provided label', async () => {
                const {driver: item, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                return waitForDom(() => expect(item.label).to.have.text(sampleItem.label));
            });

            it('renders with an icon', async () => {
                const {driver: item, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={treeData[0]}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                return waitForDom(() => expect(item.icon).to.be.present());
            });

            it('renders correct children', async () => {
                const {driver: parentItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={nestedItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                return waitForDom(() =>
                    nestedItem.children!.forEach((item: TreeItemData) =>
                        expect(parentItem.getNestedItem(item.label).root,
                               `${item.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', async () => {
                const onClick = sinon.spy();
                const {driver: item} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        onItemClick={onClick}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                item.clickLabel();

                await waitFor(() => {
                    expect(onClick).to.have.been.calledOnce;
                    expect(onClick).to.have.been.calledWithMatch(sampleItem);
                });
            });
        });

        describe('Tree Traversal Utils', () => {
            const treeState: TreeViewStateMap = new TreeViewStateMap();

            treeState.getItemState(treeData[0]).isExpanded = true;
            treeState.getItemState(treeData[0].children![1]).isExpanded = true;

            const parentsMap: TreeViewParentsMap = new Map<TreeItemData, TreeItemData | undefined>();
            initParentsMap(parentsMap, treeData, undefined);

            it('gets previous item when its a sibling', async () => {
                const previous = getPreviousItem(treeData, treeData[0].children![1], treeState, parentsMap);
                expect(previous.label).to.eql(treeData[0].children![0].label);
            });

            it('gets previous item when its a parent', async () => {
                const previous = getPreviousItem(treeData, treeData[0].children![0], treeState, parentsMap);
                expect(previous.label).to.eql(treeData[0].label);
            });

            it('gets next item when its a sibling', async () => {
                const next = getNextItem(treeData, treeData[0].children![1].children![0], treeState, parentsMap);
                expect(next.label).to.eql(treeData[0].children![1].children![1].label);
            });

            it('gets next item when its a parent', async () => {
                const next = getNextItem(treeData, treeData[0].children![1].children![1], treeState, parentsMap);
                expect(next.label).to.eql(treeData[0].children![2].label);
            });

            it('selects last available item', async () => {
                const last = getLastAvailableItem(treeData[0], treeState);
                expect(last.label).to.eql(treeData[0].children![2].label);
            });
        });

        describe('Accessibility', () => {
            it('puts correct aria values on different parts of the tree', async () => {
                const {driver: treeView, waitForDom} = clientRenderer.render(
                    <TreeView dataSource={treeData} />
                ).withDriver(TreeViewDriver);

                const firstChild = treeData[0].children![0];
                treeView.getItem(treeData[0].label).clickIcon();

                await waitForDom(() => {
                    expect(treeView.root).to.have.attribute('role', 'tree');
                    expect(treeView.getItem(firstChild.label).root)
                    .to.have.attr('role', 'treeitem');
                });
            });
        });

        describe('TreeView methods', () => {
            const firstChild = treeData[0].children![0];
            const secondChild = treeData[0].children![1];

            async function renderAndExpandPartsOfTree() {
                let treeInstance: TreeView | null = null;
                const {driver: treeView, waitForDom} =
                            clientRenderer.render(<TreeView dataSource={treeData} ref={tree => treeInstance = tree}/>)
                                          .withDriver(TreeViewDriver);

                const treeRootIcon = treeView.getItem('Food Menu').icon;
                simulate.click(treeRootIcon);

                await waitForDom(() =>
                    expect(treeView.getItem(firstChild.label).root,
                            `${firstChild.label} was not present`).to.be.present());

                simulate.click(treeView.getItem(firstChild.label).icon);

                await waitForDom(() =>
                    expect(treeView.getItem(firstChild.children![0].label).root,
                    `${firstChild.children![0].label} was not present`).to.be.present());

                if (treeInstance === null) {
                    throw new Error('treeInstance was null');
                }

                return {treeView, treeInstance: treeInstance!, waitForDom};
            }

            async function renderCollapsedTree() {
                let treeInstance: TreeView | null = null;
                const onSelectItem = sinon.spy();
                const {driver: treeView, waitForDom} =
                    clientRenderer.render(
                        <TreeView
                            dataSource={treeData}
                            ref={tree => treeInstance = tree}
                            onSelectItem={onSelectItem}
                        />
                    ).withDriver(TreeViewDriver);

                if (treeInstance === null) {
                    throw new Error('treeInstance was null');
                }

                return {treeView, treeInstance: treeInstance!, waitForDom, onSelectItem};
            }

            it('collapses a node and its subtree when \'collapse\' method is used', async () => {
                const {treeView, treeInstance, waitForDom} = await renderAndExpandPartsOfTree();

                treeInstance.collapse(treeData[0]);

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.label).root).to.be.absent();
                    expect(treeView.getItem(firstChild.children![0].label).root).to.be.absent();
                });
            });

            it('collapses the whole tree when \'collapseAll\' method is used', async () => {
                const {treeView, treeInstance, waitForDom} = await renderAndExpandPartsOfTree();

                treeInstance.collapseAll();

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.label).root).to.be.absent();
                    expect(treeView.getItem(firstChild.children![0].label).root).to.be.absent();
                });
            });

            it('expands a node and its subtree when \'expand\' method is used', async () => {
                const {treeView, treeInstance, waitForDom} = await renderCollapsedTree();

                const treeRootIcon = treeView.getItem('Food Menu').icon;
                simulate.click(treeRootIcon);

                await waitForDom(() => expect(treeView.getItem(firstChild.label).root).to.be.present());

                treeInstance.expand(firstChild);

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.children![0].label).root).to.be.present();
                    expect(treeView.getItem(secondChild.children![0].label).root).to.be.absent();
                });
            });

            it('expands the whole tree when \'expandAll\' method is used', async () => {
                const {treeView, treeInstance, waitForDom} = await renderCollapsedTree();

                treeInstance.expandAll();

                await waitForDom(() => allNodesLabels.forEach(item =>
                    expect(treeView.getItem(item).root, `item did not appear: ${item}`).to.be.present()));
            });

            it('selects the provided item when \'selectItem\' method is used', async () => {
                const {treeInstance, onSelectItem} = await renderCollapsedTree();

                treeInstance.selectItem(treeData[0]);

                await waitFor(() => {
                    expect(onSelectItem).to.have.been.calledOnce;
                    expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]);
                });
            });
        });
    });
});
