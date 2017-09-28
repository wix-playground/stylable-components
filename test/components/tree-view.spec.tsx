import {observable} from 'mobx';
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TreeViewDemo, TreeViewDemoCustom} from '../../demo/components/tree-view-demo';
import {TreeItem, TreeKeyCodes, TreeView} from '../../src';
import {getLastAvailableItem, getNextItem, getPreviousItem} from '../../src/components/tree-view/tree-util';
import {initParentsMap, TreeItemData,
    TreeViewParentsMap, TreeViewStateMap} from '../../src/components/tree-view/tree-view';
import {TreeItemDriver, TreeViewDriver, TreeViewInstanceDriver} from '../../test-kit';
import {elementHasStylableState} from '../../test-kit/utils';

// this can be removed once encapsulated in the driver
import {Stylesheet} from 'stylable';
import treeViewDemoStyle from '../../demo/components/tree-view-demo.st.css';
import treeItemStyle from '../../src/components/tree-view/tree-item.st.css';

const treeItem = 'TREE_ITEM';

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

export interface TreeViewWrapperState {
    treeData: object[];
}

export class TreeViewWrapper extends React.Component<{}, TreeViewWrapperState> {
    public state = {treeData};

    public render() {
        return <TreeView dataSource={this.state.treeData}/>;
    }

    public switchDataSource = () => {
        this.setState({
            treeData: newTreeData
        });
    }
}

export class TreeViewMobxWrapper extends React.Component<{}, {}> {
    @observable private obsTreeData: TreeItemData[] = treeData;

    public render() {
        return <TreeView dataSource={this.obsTreeData}/>;
    }

    public modifyMobxDataSource = () => {
        this.obsTreeData[0].children![2].children!.push({label: changedLabel});
    }

    public renameLabel = () => {
        this.obsTreeData[0].children![0].label = changedLabel;
    }
}

class TreeViewDemoDriver extends DriverBase {
    public static ComponentClass = TreeViewDemo;

    public treeView = new TreeViewDriver(() => this.select('TREE_VIEW'));
}

class TreeViewDemoCustomDriver extends DriverBase {
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

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function isElementSelected(element: Element, style: {$stylesheet: Stylesheet}) {
        return elementHasStylableState(element, style, 'selected');
    }

    function isElementFocused(element: Element, style: {$stylesheet: Stylesheet}) {
        return elementHasStylableState(element, style, 'focused');
    }

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
        await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![1].label).root).to.be.absent());

        treeView.toggleItem(treeData[0].label);
        nodeChildren!.forEach(child =>  treeView.toggleItem(child.label));

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(treeView.getItemDriver(item).root, `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = treeView.getItemDriver(allNodesLabels[2]).root;

        treeView.selectItem(allNodesLabels[2]);
        await waitForDom(() => expect(isElementSelected(elementToSelect!, treeItemStyle)).to.equal(true));
    });

    it('renders a tree view with custom children', async () => {
        const {driver: treeViewDemoCustom, waitForDom} = clientRenderer.render(
            <TreeViewDemoCustom />
        ).withDriver(TreeViewDemoCustomDriver);

        const {customTreeView} = treeViewDemoCustom;

        await waitForDom(() => expect(customTreeView.root, 'custom demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(customTreeView.getItemDriver(nodeChildren![1].label).root).to.be.absent());

        customTreeView.toggleItem(treeData[0].label);
        nodeChildren!.forEach(child => customTreeView.toggleItem(child.label));

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(customTreeView.getItemDriver(item).root,
                `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = customTreeView.getItemDriver(allNodesLabels[2]).root;

        customTreeView.selectItem(allNodesLabels[2]);
        await waitForDom(() => expect(isElementSelected(elementToSelect!, treeViewDemoStyle)).to.equal(true));
    });

    it('ends up in expected state after multiple clicks on same tree node', async () => {
        const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
            <TreeViewDemo />
        ).withDriver(TreeViewDemoDriver);

        const {treeView} = treeViewDemo;

        treeView.toggleItem(allNodesLabels[0]);

        const elementToSelect = treeView.getItemDriver(allNodesLabels[1]).icon;
        let elementToAssert = treeView.getItemDriver(allNodesLabels[2]).root;

        await waitForDom(() => expect(elementToSelect).to.be.present());
        await waitForDom(() => expect(elementToAssert).to.be.absent());

        treeView.toggleItem(allNodesLabels[1]);

        elementToAssert = treeView.getItemDriver(allNodesLabels[2]).root;
        await waitForDom(() => expect(elementToAssert).to.be.present());

        treeView.toggleItem(allNodesLabels[1]);

        await waitForDom(() => expect(elementToAssert).to.be.absent());
    });

    it('should rename node label without collapsing tree', async () => {
        const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;
        const getTreeItemIcon = (id: string) => `${getTreeItem(id)}_ICON`;

        function expandItemWithLabel(selectFn: (...selectors: string[]) => Element | null, id: string) {
            simulate.click(selectFn(getTreeItemIcon(id)));
        }

        const {select, waitForDom, result} = clientRenderer.render(<TreeViewMobxWrapper />);

        const firstChildLabel = treeData[0].children![0].label;

        expandItemWithLabel(select, treeData[0].label);

        await waitForDom(() => expect(select(getTreeItem(firstChildLabel))).to.have.text(firstChildLabel));

        (result as TreeViewMobxWrapper).renameLabel();

        return waitForDom(() => expect(select(getTreeItem(changedLabel))).to.have.text(changedLabel));
    });

    describe('Using default renderer', () => {
        it('renders correct children', async () => {
            const {driver: treeView, waitForDom} = clientRenderer.render(
                <TreeView dataSource={treeData} />
            ).withDriver(TreeViewDriver);

            await waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(treeView.getItemDriver(item.label).root,
                        `${item.label} was not present`).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', async () => {
            const onSelectItem = sinon.spy();
            const {driver: treeView} = clientRenderer.render(
                <TreeView dataSource={treeData} onSelectItem={onSelectItem} />
            ).withDriver(TreeViewDriver);

            treeView.selectItem(treeData[0].label);

            await waitFor(() => expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]));
        });

        describe('Keyboard Navigation', () => {
            it('expands and collapses focused treeItem when right and left arrows are clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![1].label).root).to.be.present());

                treeView.pressKey(TreeKeyCodes.LEFT);

                await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![1].label).root).to.be.absent());

                treeView.pressKey(TreeKeyCodes.RIGHT);

                await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![1].label).root).to.be.present());
            });

            it('returns to parent if there is after collapsing the element if possible when left is clicked',
                async () => {
                    const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = treeViewDemo;

                    const nodeChildren = treeData[0].children;

                    treeView.toggleItem(treeData[0].label);

                    await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![1].label).root).to.be.present());

                    treeView.selectItem(nodeChildren![1].label);

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItemDriver(nodeChildren![1].label).root,
                                         treeItemStyle)).to.equal(true));

                    treeView.pressKey(TreeKeyCodes.LEFT);

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItemDriver(treeData[0].label).root,
                                         treeItemStyle)).to.equal(true));
                });

            it('moves to child to if there is one after expanding the element if possible when right is clicked',
                async () => {
                    const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = treeViewDemo;

                    const nodeChildren = treeData[0].children;

                    treeView.toggleItem(treeData[0].label);

                    await waitForDom(() => expect(treeView.getItemDriver(nodeChildren![0].label).root).to.be.present());

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItemDriver(treeData[0].label).root,
                                         treeItemStyle)).to.equal(true));

                    treeView.pressKey(TreeKeyCodes.RIGHT);

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItemDriver(nodeChildren![0].label).root,
                                         treeItemStyle)).to.equal(true));
                });

            it('focuses next and previous when down and up arrows are clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const rootNode = treeView.getItemDriver(treeData[0].label).root;
                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                // this should assert first child of root is not focused
                await waitForDom(() => expect(
                    isElementFocused(treeView.getItemDriver(nodeChildren![0].label).root,
                                     treeItemStyle)).to.equal(false));

                treeView.pressKey(TreeKeyCodes.DOWN);

                // this should assert first child of root is focused
                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItemDriver(nodeChildren![0].label).root,
                                            treeItemStyle)).to.equal(true));

                treeView.pressKey(TreeKeyCodes.UP);

                // this should assert first child of root is not focused
                await waitForDom(() => {
                    const item = treeView.getItemDriver(nodeChildren![0].label).root;
                    expect(isElementFocused(item!, treeItemStyle)).to.equal(false);
                    expect(isElementFocused(rootNode!, treeItemStyle)).to.equal(true);
                });
            });

            it('focuses parent node\'s next sibling after exhausting current node sibling list', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                treeView.pressKey(TreeKeyCodes.DOWN);
                treeView.pressKey(TreeKeyCodes.RIGHT);

                await waitForDom(() =>
                        expect(isElementFocused(treeView.getItemDriver(nodeChildren![0].label).root,
                                                treeItemStyle)).to.equal(true));

                nodeChildren![0].children!.forEach(
                    () => treeView.pressKey(TreeKeyCodes.DOWN)
                );

                const firstSubtreeChildren = nodeChildren![0].children!;

                await waitForDom(() => expect(isElementFocused(
                        treeView.getItemDriver(firstSubtreeChildren[firstSubtreeChildren.length - 1].label).root,
                        treeItemStyle)).to.equal(true));

                treeView.pressKey(TreeKeyCodes.DOWN);

                await waitForDom(() => expect(
                    isElementFocused(treeView.getItemDriver(nodeChildren![1].label).root,
                                     treeItemStyle)).to.equal(true));
            });

            it('selects currently focused node on Enter click', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                treeView.pressKey(TreeKeyCodes.DOWN);

                await waitForDom(() => expect(
                    isElementSelected(treeView.getItemDriver(nodeChildren![0].label).root,
                                      treeItemStyle)).to.equal(false));

                treeView.pressKey(TreeKeyCodes.ENTER);

                await waitForDom(() => expect(
                    isElementSelected(treeView.getItemDriver(nodeChildren![0].label).root,
                                      treeItemStyle)).to.equal(true));
            });

            it('focuses first item when HOME is clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const rootNode = treeView.getItemDriver(treeData[0].label).root;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                treeView.pressKey(TreeKeyCodes.DOWN);
                treeView.pressKey(TreeKeyCodes.DOWN);

                await waitForDom(() => expect(isElementFocused(rootNode!, treeItemStyle)).to.equal(false));

                treeView.pressKey(TreeKeyCodes.HOME);

                await waitForDom(() => expect(isElementFocused(rootNode!, treeItemStyle)).to.equal(true));
            });

            it('focuses last item available when END is clicked', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const nodeChildren = treeData[0].children!;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.toggleItem(lastRootNode.label);

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItemDriver(
                        lastChildren[lastChildren.length - 1].label).root, treeItemStyle)).to.equal(false));

                treeView.pressKey(TreeKeyCodes.END);

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItemDriver(
                        lastChildren[lastChildren.length - 1].label).root, treeItemStyle)).to.equal(true));
            });

            it('cannot focus past first and last elements when clicking up and down respectively', async () => {
                const {driver: treeViewDemo, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = treeViewDemo;

                const rootNode = treeView.getItemDriver(treeData[0].label).root;
                const nodeChildren = treeData[0].children!;

                treeView.toggleItem(treeData[0].label);

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.toggleItem(lastRootNode.label);

                treeView.pressKey(TreeKeyCodes.END);

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItemDriver(
                        lastChildren[lastChildren.length - 1].label).root, treeItemStyle)).to.equal(true));

                treeView.pressKey(TreeKeyCodes.DOWN);

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItemDriver(
                        lastChildren[lastChildren.length - 1].label).root, treeItemStyle)).to.equal(true));

                treeView.pressKey(TreeKeyCodes.HOME);

                await expect(isElementFocused(rootNode!, treeItemStyle)).to.equal(true);

                treeView.pressKey(TreeKeyCodes.UP);

                await expect(isElementFocused(rootNode!, treeItemStyle)).to.equal(true);
            });
        });

        describe('Reaction to dataSource changes', () => {
            const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;
            const getTreeItemIcon = (id: string) => `${getTreeItem(id)}_ICON`;

            function expandItemWithLabel(select: (...selectors: string[]) => Element | null, id: string) {
                simulate.click(select(getTreeItemIcon(id)));
            }

            it('renders the additional item when a new data array is passed', async () => {
                const {select, waitForDom, result} = clientRenderer.render(<TreeViewWrapper />);

                expandItemWithLabel(select, treeData[0].label);
                expandItemWithLabel(select, treeData[0].children![2].label);

                await waitForDom(() =>
                    expect(select('TREE_VIEW', getTreeItem('Kaiserschmarrn'))).to.be.absent());

                (result as TreeViewWrapper).switchDataSource();
                expandItemWithLabel(select, newTreeData[0].label);
                expandItemWithLabel(select, newTreeData[0].children![2].label);

                return waitForDom(() =>
                    expect(select('TREE_VIEW', getTreeItem('Kaiserschmarrn'))).to.be.present());
            });

            it('renders the additional item when a new data element is added to existing data', async () => {
                const {select, waitForDom, result} = clientRenderer.render(<TreeViewMobxWrapper />);

                expandItemWithLabel(select, treeData[0].label);
                expandItemWithLabel(select, treeData[0].children![2].label);

                await waitForDom(() =>
                    expect(select('TREE_VIEW', getTreeItem('Kaiserschmarrn'))).to.be.absent());

                (result as TreeViewMobxWrapper).modifyMobxDataSource();

                return waitForDom(() =>
                    expect(select('TREE_VIEW', getTreeItem('Kaiserschmarrn'))).to.be.present());
            });
        });

        describe('<TreeItem />', () => {

            const stateMap = new TreeViewStateMap();
            stateMap.getItemState(nestedItem).isExpanded = true;

            it('renders an item', async () => {
                const {container, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                );

                const item = new TreeItemDriver(() => container.firstElementChild!, sampleItem.label);

                return waitForDom(() => expect(item.root).to.be.present());
            });

            it('renders with provided label', async () => {
                const {container, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                );

                const item = new TreeItemDriver(() => container.firstElementChild!, sampleItem.label);

                return waitForDom(() => expect(item.label).to.have.text(sampleItem.label));
            });

            it('renders with an icon', async () => {
                const {container, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={treeData[0]}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                );

                const item = new TreeItemDriver(() => container.firstElementChild!, treeData[0].label);

                return waitForDom(() => expect(item.icon).to.be.present());
            });

            it('renders correct children', async () => {
                const {container, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={nestedItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                );

                const parentItem = new TreeItemDriver(() => container.firstElementChild!, nestedItem.label);

                return waitForDom(() =>
                    nestedItem.children!.forEach((item: TreeItemData) =>
                        expect(parentItem.getNestedItemDriver(item.label).root,
                               `${item.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', async () => {
                const onClick = sinon.spy();
                const {container} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        onItemClick={onClick}
                        stateMap={stateMap}
                    />
                );

                const item =  new TreeItemDriver(() => container.firstElementChild!, sampleItem.label);

                simulate.click(item.label);

                await waitFor(() => expect(onClick).to.have.been.calledOnce);
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
                treeView.toggleItem(treeData[0].label);

                await waitForDom(() => {
                    expect(treeView.root).to.have.attribute('role', 'tree');
                    expect(treeView.getItemDriver(firstChild.label + '_NODE').root)
                    .to.have.attr('role', 'treeitem');
                });
            });
        });

        describe('TreeView methods', () => {
            const firstChild = treeData[0].children![0];
            const secondChild = treeData[0].children![1];

            async function renderAndExpandPartsOfTree() {
                const {result, waitForDom} = clientRenderer.render(<TreeView dataSource={treeData} />);

                const treeView = new TreeViewInstanceDriver(result as TreeView);

                const treeRootIcon = treeView.getItemIcon('Food Menu');
                simulate.click(treeRootIcon);

                await waitForDom(() =>
                    expect(treeView.getItem(firstChild.label), `${firstChild.label} was not present`).to.be.present());

                simulate.click(treeView.getItemIcon(firstChild.label));

                await waitForDom(() =>
                    expect(treeView.getItem(firstChild.children![0].label),
                    `${firstChild.children![0].label} was not present`).to.be.present());

                return {treeView, waitForDom};
            }

            it('collapses a node and its subtree when \'collapse\' method is used', async () => {
                const {treeView, waitForDom} = await renderAndExpandPartsOfTree();

                treeView.instance.collapse(treeData[0]);

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.label)).to.be.absent();
                    expect(treeView.getItem(firstChild.children![0].label)).to.be.absent();
                });
            });

            it('collapses the whole tree when \'collapseAll\' method is used', async () => {
                const {treeView, waitForDom} = await renderAndExpandPartsOfTree();

                treeView.instance.collapseAll();

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.label)).to.be.absent();
                    expect(treeView.getItem(firstChild.children![0].label)).to.be.absent();
                });
            });

            it('expands a node and its subtree when \'expand\' method is used', async () => {
                const {waitForDom, result} = clientRenderer.render(<TreeView dataSource={treeData} />);

                const treeView = new TreeViewInstanceDriver(result as TreeView);

                const treeRootIcon = treeView.getItemIcon('Food Menu');
                simulate.click(treeRootIcon);

                await waitForDom(() => expect(treeView.getItem(firstChild.label)).to.be.present());

                treeView.instance.expand(firstChild);

                await waitForDom(() => {
                    expect(treeView.getItem(firstChild.children![0].label)).to.be.present();
                    expect(treeView.getItem(secondChild.children![0].label)).to.be.absent();
                });
            });

            it('expands the whole tree when \'expandAll\' method is used', async () => {
                const {waitForDom, result} = clientRenderer.render(<TreeView dataSource={treeData} />);

                const treeView = new TreeViewInstanceDriver(result as TreeView);

                treeView.instance.expandAll();

                await waitForDom(() => allNodesLabels.forEach(item =>
                    expect(treeView.getItem(item), `item did not appear: ${item}`).to.be.present()));
            });

            it('selects the provided item when \'selectItem\' method is used', async () => {
                const onSelectItem = sinon.spy();
                const {result} = clientRenderer.render(
                    <TreeView dataSource={treeData} onSelectItem={onSelectItem}/>
                );

                const treeView = new TreeViewInstanceDriver(result as TreeView);

                treeView.instance.selectItem(treeData[0]);

                await waitFor(() => expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]));
            });
        });
    });
});
