import * as React from 'react';
import {ClientRenderer, expect, sinon, waitFor} from 'test-drive-react';
import {TreeView} from '../../src';
import {ParentsMap, TreeItemData, TreeStateMap} from '../../src/components/tree-view/tree-view';
import {TreeViewDriver} from '../../test-kit';

// const KeyCodes: any = {
//     ENTER: keycode('enter'),
//     HOME: keycode('home'),
//     END: keycode('end'),
//     UP: keycode('up'),
//     DOWN: keycode('down'),
//     LEFT: keycode('left'),
//     RIGHT: keycode('right')
// };

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

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    // function expandItemWithLabel(select: (...selectors: string[]) => Element | null, id: string) {
    //     simulate.click(select(getTreeItemIcon(id)));
    // }

    // function selectItemWithLabel(select: (...selectors: string[]) => Element | null, id: string) {
    //     simulate.click(select(getTreeItemLabel(id)));
    // }

    // const sampleItem = {label: 'label'};
    // const nestedItem: TreeItemData = treeData[0].children![1];

    // const allNodesLabels: string[] = getAllNodeLabels(treeData);

    // it('renders a tree view with a few children', async () => {
    //     const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //     await waitForDom(() => expect(select(treeView + '_DEMO'), 'demo not present').to.be.present());

    //     const nodeChildren = treeData[0].children;
    //     await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

    //     expandItemWithLabel(select, treeData[0].label);
    //     nodeChildren!.forEach(child => expandItemWithLabel(select, child.label));

    //     await waitForDom(() => allNodesLabels.forEach(item =>
    //         expect(select(treeView + '_DEMO', getTreeItem(item)), `item did not appear: ${item}`).to.be.present()));

    //     const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

    //     selectItemWithLabel(select, allNodesLabels[2]);
    //     return waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));
    // });

    // it('renders a tree view with custom children', async () => {
    //     const {select, waitForDom} = clientRenderer.render(<TreeViewDemoCustom />);

    //     await waitForDom(() => expect(select(treeView + '_DEMO_CUSTOM'), 'custom demo not present').to.be.present());

    //     const nodeChildren = treeData[0].children;
    //     await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

    //     expandItemWithLabel(select, treeData[0].label);
    //     nodeChildren!.forEach(child => expandItemWithLabel(select, child.label));

    //     await waitForDom(() => allNodesLabels.forEach(item =>
    //         expect(select(treeView + '_DEMO_CUSTOM', getTreeItem(item)),
    //             `item did not appear: ${item}`).to.be.present()));

    //     const elementToSelect = select(treeView + '_DEMO_CUSTOM', getTreeItem(allNodesLabels[2]));

    //     selectItemWithLabel(select, allNodesLabels[2]);
    //     return waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));
    // });

    // it('ends up in expected state after multiple clicks on same tree node', async () => {
    //     const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //     expandItemWithLabel(select, allNodesLabels[0]);

    //     const elementToSelect = select(treeView + '_DEMO', getTreeItemIcon(allNodesLabels[1]));
    //     let elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

    //     await waitForDom(() => expect(elementToSelect).to.be.present());
    //     await waitForDom(() => expect(elementToAssert).to.be.absent());

    //     expandItemWithLabel(select, allNodesLabels[1]);

    //     elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));
    //     await waitForDom(() => expect(elementToAssert).to.be.present());

    //     expandItemWithLabel(select, allNodesLabels[1]);

    //     return waitForDom(() => expect(elementToAssert).to.be.absent());
    // });

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

    //     describe('Keyboard Navigation', () => {
    //         it('expands and collapses focused treeItem when right and left arrows are clicked', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const nodeChildren = treeData[0].children;

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.LEFT});
    //             await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.RIGHT});

    //             return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());
    //         });

    //         it('returns to parent if there is after collapsing the element if possible when left is clicked',
    //             async () => {
    //                 const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //                 const nodeChildren = treeData[0].children;

    //                 expandItemWithLabel(select, treeData[0].label);

    //                 await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());

    //                 selectItemWithLabel(select, nodeChildren![1].label);

    //                 await waitForDom(() =>
    //                     expect(select(getTreeItem(nodeChildren![1].label))).to.have.attr('data-focused', 'true'));

    //                 simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.LEFT});

    //                 return waitForDom(() =>
    //                     expect(select(getTreeItem(treeData[0].label))).to.have.attr('data-focused', 'true'));
    //             });

    //         it('moves to child to if there is one after expanding the element if possible when right is clicked',
    //             async () => {
    //                 const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //                 const nodeChildren = treeData[0].children;

    //                 expandItemWithLabel(select, treeData[0].label);

    //                 await waitForDom(() => expect(select(getTreeItem(nodeChildren![0].label))).to.be.present());

    //                 await waitForDom(() =>
    //                     expect(select(getTreeItem(treeData[0].label))).to.have.attr('data-focused', 'true'));

    //                 simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.RIGHT});

    //                 return waitForDom(() =>
    //                     expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-focused', 'true'));
    //             });

    //         it('focuses next and previous when down and up arrows are clicked', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const rootNode = getTreeItem(treeData[0].label);
    //             const nodeChildren = treeData[0].children;

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             // this should assert first child of root is not focused
    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-focused', 'false'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});

    //             // this should assert first child of root is focused
    //             await waitForDom(() => {
    //                 const item = getTreeItem(nodeChildren![0].label);
    //                 expect(select(item), 'down didnt work').to.have.attr('data-focused', 'true');
    //             });

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.UP});

    //             // this should assert first child of root is not focused
    //             return waitForDom(() => {
    //                 const item = getTreeItem(nodeChildren![0].label);
    //                 expect(select(item), 'up didnt work').to.have.attr('data-focused', 'false');
    //                 expect(select(rootNode)).to.have.attr('data-focused', 'true');
    //             });
    //         });

    //         it('focuses parent node\'s next sibling after exhausting current node sibling list', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const nodeChildren = treeData[0].children;

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});
    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.RIGHT});

    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-focused', 'true'));

    //             nodeChildren![0].children!.forEach(
    //                 () => simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN})
    //             );

    //             const firstSubtreeChildren = nodeChildren![0].children!;

    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(firstSubtreeChildren[firstSubtreeChildren.length - 1].label)))
    //                     .to.have.attr('data-focused', 'true'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});

    //             return waitForDom(() =>
    //                 expect(select(getTreeItem(nodeChildren![1].label))).to.have.attr('data-focused', 'true'));
    //         });

    //         it('selects currently focused node on Enter click', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const nodeChildren = treeData[0].children;

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});

    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-selected', 'false'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.ENTER});

    //             return waitForDom(() =>
    //                 expect(select(getTreeItem(nodeChildren![0].label))).to.have.attr('data-selected', 'true'));
    //         });

    //         it('focuses first item when HOME is clicked', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const rootNode = getTreeItem(treeData[0].label);

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});
    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});

    //             await waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'false'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.HOME});

    //             return waitForDom(() => expect(select(rootNode)).to.have.attr('data-focused', 'true'));
    //         });

    //         it('focuses last item available when END is clicked', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const nodeChildren = treeData[0].children!;

    //             selectItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].label);

    //             const lastRootNode = nodeChildren[2];
    //             const lastChildren = lastRootNode.children!;

    //             expandItemWithLabel(select, lastRootNode.label);

    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
    //                     .to.have.attr('data-focused', 'false'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.END});

    //             return waitForDom(() =>
    //                 expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
    //                     .to.have.attr('data-focused', 'true'));
    //         });

    //         it('cannot focus past first and last elements when clicking up and down respectively', async () => {
    //             const {select, waitForDom} = clientRenderer.render(<TreeViewDemo />);

    //             const rootNode = getTreeItem(treeData[0].label);
    //             const nodeChildren = treeData[0].children!;

    //             expandItemWithLabel(select, treeData[0].label);

    //             const lastRootNode = nodeChildren[2];
    //             const lastChildren = lastRootNode.children!;

    //             expandItemWithLabel(select, lastRootNode.label);

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.END});
    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
    //                     .to.have.attr('data-focused', 'true'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.DOWN});

    //             await waitForDom(() =>
    //                 expect(select(getTreeItem(lastChildren[lastChildren.length - 1].label)))
    //                     .to.have.attr('data-focused', 'true'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.HOME});

    //             await waitForDom(() =>
    //                 expect(select(rootNode))
    //                     .to.have.attr('data-focused', 'true'));

    //             simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), {keyCode: KeyCodes.UP});

    //             return waitForDom(() =>
    //                 expect(select(rootNode))
    //                     .to.have.attr('data-focused', 'true'));
    //         });
    //     });

    //     describe('Reaction to dataSource changes', () => {
    //         it('renders the additional item when a new data array is passed', async () => {
    //             const {select, waitForDom, result} = clientRenderer.render(<TreeViewWrapper />);

    //             expandItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].children![2].label);

    //             await waitForDom(() =>
    //                 expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.absent());

    //             (result as TreeViewWrapper).switchDataSource();
    //             expandItemWithLabel(select, newTreeData[0].label);
    //             expandItemWithLabel(select, newTreeData[0].children![2].label);

    //             return waitForDom(() =>
    //                 expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.present());
    //         });

    //         it('renders the additional item when a new data element is added to existing data', async () => {
    //             const {select, waitForDom, result} = clientRenderer.render(<TreeViewMobxWrapper />);

    //             expandItemWithLabel(select, treeData[0].label);
    //             expandItemWithLabel(select, treeData[0].children![2].label);

    //             await waitForDom(() =>
    //                 expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.absent());

    //             (result as TreeViewMobxWrapper).modifyMobxDataSource();

    //             return waitForDom(() =>
    //                 expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.present());
    //         });
    //     });

        describe('<TreeItem />', () => {

            const stateMap = new TreeStateMap();
            // stateMap.getItemState(nestedItem).isExpanded = true;

    //         it('renders an item', () => {
    //             const {select, waitForDom} = clientRenderer.render(
    //                 <TreeItem
    //                     item={sampleItem}
    //                     itemRenderer={TreeItem}
    //                     stateMap={stateMap}
    //                 />
    //             );

    //             return waitForDom(() => expect(select(getTreeItem(sampleItem.label))).to.be.present());
    //         });

    //         it('renders with provided label', () => {
    //             const {select, waitForDom} =
    //                 clientRenderer.render(
    //                     <TreeItem
    //                         item={sampleItem}
    //                         itemRenderer={TreeItem}
    //                         stateMap={stateMap}
    //                     />
    //                 );

    //             return waitForDom(() =>
    //                 expect(select(getTreeItem(sampleItem.label) + '_LABEL')).to.have.text(sampleItem.label));
    //         });

    //         it('renders with an icon', () => {
    //             const {select, waitForDom} = clientRenderer.render(
    //                 <TreeItem
    //                     item={treeData[0]}
    //                     itemRenderer={TreeItem}
    //                     stateMap={stateMap}
    //                 />
    //             );

    //             return waitForDom(() => expect(select(getTreeItem(treeData[0].label) + '_ICON')).to.be.present());
    //         });

    //         it('renders correct children', () => {
    //             const {select, waitForDom} = clientRenderer.render(
    //                 <TreeItem
    //                     item={nestedItem}
    //                     itemRenderer={TreeItem}
    //                     stateMap={stateMap}
    //                 />
    //             );

    //             return waitForDom(() =>
    //                 nestedItem.children!.forEach((item: TreeItemData) =>
    //                     expect(select(getTreeItem(item.label)), `${item.label} was not present`).to.be.present()));
    //         });

    //         it('invokes onClick when clicked', () => {
    //             const onClick = sinon.spy();
    //             const {select} = clientRenderer.render(
    //                 <TreeItem
    //                     item={sampleItem}
    //                     itemRenderer={TreeItem}
    //                     onItemClick={onClick}
    //                     stateMap={stateMap}
    //                 />
    //             );

    //             simulate.click(select(getTreeItemLabel(sampleItem.label)));

    //             return waitFor(() => expect(onClick).to.have.been.calledOnce);
    //         });
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
            it('puts correct aria values on different parts of the tree', () => {
                const {driver: treeView, waitForDom} = clientRenderer.render(
                    <TreeView dataSource={treeData} />
                ).withDriver(TreeViewDriver);

                const firstChild = treeData[0].children![0];
                treeView.toggleItem(treeData[0].label);

                return waitForDom(() => {
                    expect(treeView.root).to.have.attribute('role', 'tree');
                    expect(treeView.getItem(firstChild.label + '_NODE'))
                    .to.have.attr('role', 'treeitem');
                });
            });
        });

    //     describe('TreeView methods', () => {
    //         const firstChild = treeData[0].children![0];
    //         const secondChild = treeData[0].children![1];

    //         async function renderAndExpandPartsOfTree() {
    //             const renderResult = clientRenderer.render(<TreeView dataSource={treeData} />);
    //             const {select, waitForDom} = renderResult;

    //             const treeRootIcon = select(treeView, getTreeItemIcon('Food Menu'));
    //             simulate.click(treeRootIcon);
    //             await waitForDom(() =>
    //                 expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.present());

    //             simulate.click(select(treeView, getTreeItemIcon(firstChild.label)));
    //             await waitForDom(() => expect(select(treeView,
    //                 getTreeItemLabel(firstChild.children![0].label))).to.be.present());

    //             return renderResult;
    //         }

    //         it('collapses a node and its subtree when \'collapse\' method is used', async () => {
    //             const {select, waitForDom, result} = await renderAndExpandPartsOfTree();

    //             (result as TreeView).collapse(treeData[0]);

    //             return waitForDom(() => {
    //                 expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.absent();
    //                 expect(select(treeView, getTreeItemLabel(firstChild.children![0].label))).to.be.absent();
    //             });
    //         });

    //         it('collapses the whole tree when \'collapseAll\' method is used', async () => {
    //             const {select, waitForDom, result} = await renderAndExpandPartsOfTree();

    //             (result as TreeView).collapseAll();

    //             return waitForDom(() => {
    //                 expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.absent();
    //                 expect(select(treeView, getTreeItemLabel(firstChild.children![0].label))).to.be.absent();
    //             });
    //         });

    //         it('expands a node and its subtree when \'expand\' method is used', async () => {
    //             const {select, waitForDom, result} = clientRenderer.render(<TreeView dataSource={treeData} />);
    //             const treeRootIcon = select(treeView, getTreeItemIcon('Food Menu'));
    //             simulate.click(treeRootIcon);

    //             await waitForDom(() => expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.present());

    //             (result as TreeView).expand(firstChild);

    //             return waitForDom(() => {
    //                 expect(select(treeView, getTreeItemLabel(firstChild.children![0].label))).to.be.present();
    //                 expect(select(treeView, getTreeItemLabel(secondChild.children![0].label))).to.be.absent();
    //             });
    //         });

    //         it('expands the whole tree when \'expandAll\' method is used', async () => {
    //             const {select, waitForDom, result} = clientRenderer.render(<TreeView dataSource={treeData} />);

    //             (result as TreeView).expandAll();

    //             return waitForDom(() => allNodesLabels.forEach(item =>
    //                 expect(select(treeView, getTreeItem(item)), `item did not appear: ${item}`).to.be.present()));
    //         });

            // it('selects the provided item when \'selectItem\' method is used', async () => {
            //     const onSelectItem = sinon.spy();
            //     const {result} = clientRenderer.render(
            //         <TreeView dataSource={treeData} onSelectItem={onSelectItem}/>
            //     );

            //     (result as TreeView).selectItem(treeData[0]);

            //     return waitFor(() => expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]));
            // });
    //     });
    });
});
