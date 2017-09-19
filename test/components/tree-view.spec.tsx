import * as keycode from 'keycode';
import {observable} from 'mobx';
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TreeViewDemo, TreeViewDemoCustom} from '../../demo/components/tree-view-demo';
import {TreeItem, TreeView} from '../../src';
import {getLastAvailableItem, getNextItem, getPreviousItem} from '../../src/components/tree-view//tree-util';
import {initParentsMap, ParentsMap, TreeItemData, TreeStateMap} from '../../src/components/tree-view/tree-view';
import {TreeItemDriver,
        TreeViewDriver,
        TreeViewInstanceDriver,
        TreeViewMobxWrapperDriver,
        TreeViewWrapperDriver} from '../../test-kit';
import {elementHasStylableState} from '../utils/inspect-stylable';

// this can be removed once encapsulated in the driver
import {Stylesheet} from 'stylable';
import treeViewDemoStyle from '../../demo/components/tree-view-demo.st.css';
import treeNodeStyle from '../../src/components/tree-view/tree-node.st.css';

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
        this.obsTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});
    }
}

class TreeViewDemoDriver extends DriverBase {
    public static ComponentClass = TreeViewDemo;

    public treeView = new TreeViewDriver(() => this.select('TREE_VIEW_DEMO', 'TREE_VIEW'));
}

class TreeViewDemoCustomDriver extends DriverBase {
    public static ComponentClass = TreeViewDemoCustom;

    public customTreeView = new TreeViewDriver(() => this.select('TREE_VIEW_DEMO_CUSTOM', 'TREE_VIEW'));
}

// duplicating the data so i can pass a new object to the non-mobx version
const newTreeData = JSON.parse(JSON.stringify(treeData));
newTreeData[0].children![2].children!.push({label: 'Kaiserschmarrn'});

export interface TreeViewWrapperState {
    treeData: object[];
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
        const {driver, waitForDom} = clientRenderer.render(
            <TreeViewDemo />
        ).withDriver(TreeViewDemoDriver);

        const {treeView} = driver;

        await waitForDom(() => expect(treeView.root, 'demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label)).to.be.absent());

        treeView.toggleItem(treeData[0].label);
        nodeChildren!.forEach(child =>  treeView.toggleItem(child.label));

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(treeView.getItem(item), `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = treeView.getItem(allNodesLabels[2]);

        treeView.selectItem(allNodesLabels[2]);
        await waitForDom(() => expect(isElementSelected(elementToSelect!, treeNodeStyle)).to.equal(true));
    });

    it('renders a tree view with custom children', async () => {
        const {driver, waitForDom} = clientRenderer.render(
            <TreeViewDemoCustom />
        ).withDriver(TreeViewDemoCustomDriver);

        const {customTreeView} = driver;

        await waitForDom(() => expect(customTreeView.root, 'custom demo not present').to.be.present());

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(customTreeView.getItem(nodeChildren![1].label)).to.be.absent());

        customTreeView.toggleItem(treeData[0].label);
        nodeChildren!.forEach(child => customTreeView.toggleItem(child.label));

        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(customTreeView.getItem(item),
                `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = customTreeView.getItem(allNodesLabels[2]);

        customTreeView.selectItem(allNodesLabels[2]);
        await waitForDom(() => expect(isElementSelected(elementToSelect!, treeViewDemoStyle)).to.equal(true));
    });

    it('ends up in expected state after multiple clicks on same tree node', async () => {
        const {driver, waitForDom} = clientRenderer.render(
            <TreeViewDemo />
        ).withDriver(TreeViewDemoDriver);

        const {treeView} = driver;

        treeView.toggleItem(allNodesLabels[0]);

        const elementToSelect = treeView.getItemIcon(allNodesLabels[1]);
        let elementToAssert = treeView.getItem(allNodesLabels[2]);

        await waitForDom(() => expect(elementToSelect).to.be.present());
        await waitForDom(() => expect(elementToAssert).to.be.absent());

        treeView.toggleItem(allNodesLabels[1]);

        elementToAssert = treeView.getItem(allNodesLabels[2]);
        await waitForDom(() => expect(elementToAssert).to.be.present());

        treeView.toggleItem(allNodesLabels[1]);

        await waitForDom(() => expect(elementToAssert).to.be.absent());
    });

    describe('Using default renderer', () => {
        it('renders correct children', async () => {
            const {driver: treeView, waitForDom} = clientRenderer.render(
                <TreeView dataSource={treeData} />
            ).withDriver(TreeViewDriver);

            await waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(treeView.getItem(item.label),
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
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label)).to.be.present());

                treeView.pressKey(keycode('left'));

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label)).to.be.absent());

                treeView.pressKey(keycode('right'));

                await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label)).to.be.present());
            });

            it('returns to parent if there is after collapsing the element if possible when left is clicked',
                async () => {
                    const {driver, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = driver;

                    const nodeChildren = treeData[0].children;

                    treeView.toggleItem(treeData[0].label);

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![1].label)).to.be.present());

                    treeView.selectItem(nodeChildren![1].label);

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItem(nodeChildren![1].label)!, treeNodeStyle)).to.equal(true));

                    treeView.pressKey(keycode('left'));

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItem(treeData[0].label)!, treeNodeStyle)).to.equal(true));
                });

            it('moves to child to if there is one after expanding the element if possible when right is clicked',
                async () => {
                    const {driver, waitForDom} = clientRenderer.render(
                        <TreeViewDemo />
                    ).withDriver(TreeViewDemoDriver);

                    const {treeView} = driver;

                    const nodeChildren = treeData[0].children;

                    treeView.toggleItem(treeData[0].label);

                    await waitForDom(() => expect(treeView.getItem(nodeChildren![0].label)).to.be.present());

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItem(treeData[0].label)!, treeNodeStyle)).to.equal(true));

                    treeView.pressKey(keycode('right'));

                    await waitForDom(() => expect(
                        isElementFocused(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(true));
                });

            it('focuses next and previous when down and up arrows are clicked', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const rootNode = treeView.getItem(treeData[0].label);
                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                // this should assert first child of root is not focused
                await waitForDom(() => expect(
                    isElementFocused(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(false));

                treeView.pressKey(keycode('down'));

                // this should assert first child of root is focused
                await waitForDom(() => expect(
                    isElementFocused(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(true));

                treeView.pressKey(keycode('up'));

                // this should assert first child of root is not focused
                await waitForDom(() => {
                    const item = treeView.getItem(nodeChildren![0].label);
                    expect(isElementFocused(item!, treeNodeStyle)).to.equal(false);
                    expect(isElementFocused(rootNode!, treeNodeStyle)).to.equal(true);
                });
            });

            it('focuses parent node\'s next sibling after exhausting current node sibling list', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                treeView.pressKey(keycode('down'));
                treeView.pressKey(keycode('right'));

                await waitForDom(() => expect(
                    isElementFocused(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(true));

                nodeChildren![0].children!.forEach(
                    () => treeView.pressKey(keycode('down'))
                );

                const firstSubtreeChildren = nodeChildren![0].children!;

                await waitForDom(() => expect(isElementFocused(treeView.getItem(
                    firstSubtreeChildren[firstSubtreeChildren.length - 1].label)!, treeNodeStyle)).to.equal(true));

                treeView.pressKey(keycode('down'));

                await waitForDom(() => expect(
                    isElementFocused(treeView.getItem(nodeChildren![1].label)!, treeNodeStyle)).to.equal(true));
            });

            it('selects currently focused node on Enter click', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const nodeChildren = treeData[0].children;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                treeView.pressKey(keycode('down'));

                await waitForDom(() => expect(
                    isElementSelected(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(false));

                treeView.pressKey(keycode('enter'));

                await waitForDom(() => expect(
                    isElementSelected(treeView.getItem(nodeChildren![0].label)!, treeNodeStyle)).to.equal(true));
            });

            it('focuses first item when HOME is clicked', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const rootNode = treeView.getItem(treeData[0].label);

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                await waitForDom(() => expect(isElementFocused(rootNode!, treeNodeStyle)).to.equal(false));

                await waitForDom(() => expect(rootNode).to.have.attr('data-focused', 'false'));

                await waitForDom(() => expect(isElementFocused(rootNode!, treeNodeStyle)).to.equal(true));
            });

            it('focuses last item available when END is clicked', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const nodeChildren = treeData[0].children!;

                treeView.selectItem(treeData[0].label);
                treeView.toggleItem(treeData[0].label);

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.toggleItem(lastRootNode.label);

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItem(
                        lastChildren[lastChildren.length - 1].label)!, treeNodeStyle)).to.equal(false));

                treeView.pressKey(keycode('end'));

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItem(
                        lastChildren[lastChildren.length - 1].label)!, treeNodeStyle)).to.equal(true));
            });

            it('cannot focus past first and last elements when clicking up and down respectively', async () => {
                const {driver, waitForDom} = clientRenderer.render(
                    <TreeViewDemo />
                ).withDriver(TreeViewDemoDriver);

                const {treeView} = driver;

                const rootNode = treeView.getItem(treeData[0].label);
                const nodeChildren = treeData[0].children!;

                treeView.toggleItem(treeData[0].label);

                const lastRootNode = nodeChildren[2];
                const lastChildren = lastRootNode.children!;

                treeView.toggleItem(lastRootNode.label);

                treeView.pressKey(keycode('end'));

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItem(
                        lastChildren[lastChildren.length - 1].label)!, treeNodeStyle)).to.equal(true));

                treeView.pressKey(keycode('down'));

                await waitForDom(() =>
                    expect(isElementFocused(treeView.getItem(
                        lastChildren[lastChildren.length - 1].label)!, treeNodeStyle)).to.equal(true));

                treeView.pressKey(keycode('home'));

                await expect(isElementFocused(rootNode!, treeNodeStyle)).to.equal(true);

                treeView.pressKey(keycode('up'));

                await expect(isElementFocused(rootNode!, treeNodeStyle)).to.equal(true);
            });
        });

        describe('Reaction to dataSource changes', () => {
            it('renders the additional item when a new data array is passed', async () => {
                const {waitForDom, result} = clientRenderer.render(<TreeViewWrapper />);

                const treeView = new TreeViewWrapperDriver(result as TreeViewWrapper);

                treeView.toggleItem(treeData[0].label);
                treeView.toggleItem(treeData[0].children![2].label);

                await waitForDom(() =>
                    expect(treeView.getItem('Kaiserschmarrn')).to.be.absent());

                treeView.instance.switchDataSource();
                treeView.toggleItem(newTreeData[0].label);
                treeView.toggleItem(newTreeData[0].children![2].label);

                await waitForDom(() =>
                    expect(treeView.getItem('Kaiserschmarrn')).to.be.present());
            });

            it('renders the additional item when a new data element is added to existing data', async () => {
                const {waitForDom, result} = clientRenderer.render(<TreeViewMobxWrapper />);

                const treeView = new TreeViewMobxWrapperDriver(result as TreeViewMobxWrapper);

                treeView.toggleItem(treeData[0].label);
                treeView.toggleItem(treeData[0].children![2].label);

                await waitForDom(() =>
                    expect(treeView.getItem('Kaiserschmarrn')).to.be.absent());

                treeView.instance.modifyMobxDataSource();

                await waitForDom(() =>
                    expect(treeView.getItem('Kaiserschmarrn')).to.be.present());
            });
        });

        describe('<TreeItem />', () => {

            const stateMap = new TreeStateMap();
            stateMap.getItemState(nestedItem).isExpanded = true;

            it('renders an item', async () => {
                const {driver: treeItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                await waitForDom(() => expect(treeItem.getItem(sampleItem.label)).to.be.present());
            });

            it('renders with provided label', async () => {
                const {driver: treeItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                await waitForDom(() =>
                    expect(treeItem.getItem(sampleItem.label) + '_LABEL').to.have.text(sampleItem.label));
            });

            it('renders with an icon', async () => {
                const {driver: treeItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={treeData[0]}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                await waitForDom(() => expect(treeItem.getItem(treeData[0].label) + '_ICON').to.be.present());
            });

            it('renders correct children', async () => {
                const {driver: treeItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={nestedItem}
                        itemRenderer={TreeItem}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                await waitForDom(() =>
                    nestedItem.children!.forEach((item: TreeItemData) =>
                        expect(treeItem.getItem(item.label), `${item.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', async () => {
                const onClick = sinon.spy();
                const {driver: treeItem, waitForDom} = clientRenderer.render(
                    <TreeItem
                        item={sampleItem}
                        itemRenderer={TreeItem}
                        onItemClick={onClick}
                        stateMap={stateMap}
                    />
                ).withDriver(TreeItemDriver);

                simulate.click(treeItem.getItem(sampleItem.label));

                await waitFor(() => expect(onClick).to.have.been.calledOnce);
            });
        });

        describe('Tree Traversal Utils', () => {
            const treeState: TreeStateMap = new TreeStateMap();

            treeState.getItemState(treeData[0]).isExpanded = true;
            treeState.getItemState(treeData[0].children![1]).isExpanded = true;

            const parentsMap: ParentsMap = new Map<TreeItemData, TreeItemData | undefined>();
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
                    expect(treeView.getItem(firstChild.label + '_NODE'))
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

                const treeRootIcon = treeView.getItem('Food Menu');
                simulate.click(treeRootIcon);
                await waitForDom(() =>
                    expect(treeView.getItem(firstChild.label)).to.be.present());

                simulate.click(treeView.getItem(firstChild.label));
                await waitForDom(() => expect(treeView.getItem(firstChild.children![0].label)).to.be.present());

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

                const treeRootIcon = treeView.getItem('Food Menu');
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
