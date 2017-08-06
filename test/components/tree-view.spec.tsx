import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { TreeViewDemo } from '../../demo/components/tree-view-demo';
import { TreeItem, TreeView } from '../../src';
import { StateMap, TreeItemData, TreeItemState} from '../../src/components/tree-view/tree-view';
import treeViewStyles from '../../src/components/tree-view/tree-view.st.css';
import { hasCssState } from '../utils/has-css-state';

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

function getLabelsList(data: {label: string, children?: object[]}): string[] {
    return [data.label]
        .concat(...(data.children || [])
            .map(getLabelsList));
}

function getAllNodeLabels(source: object[]): string[] {
    return source.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

function initStateMap(data: object[] = [], stateMap: StateMap) {
    data.forEach((item: TreeItemData) => {
        stateMap.set(item, { isSelected: false, isExpanded: true });
        initStateMap(item.children || [], stateMap);
    });
}

describe('<TreeView />', function() {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id.replace(' ', '_')}`;
    }
    const item = { label: 'label' };
    const nestedItem: TreeItemData = treeData[0].children![1];

    const state: TreeItemState = { isSelected: false, isExpanded: true };
    const stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    initStateMap(treeData, stateMap);

    const allNodesLabels: string[] = getAllNodeLabels(treeData);

    it('renders a tree view with a few children, clicks ones of them to expand and close', async function() {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        await waitForDom(() => expect(select(treeView + '_DEMO'), 'demo not present').to.be.present());

        const rootNode = getTreeItem(treeData[0].label);

        const nodeChildren = treeData[0].children;
        await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

        simulate.click(select(treeView + '_DEMO', rootNode));
        nodeChildren!.forEach(child => simulate.click(select(treeView + '_DEMO', getTreeItem(child.label))));

        await waitForDom(() => allNodesLabels.forEach(label =>
            expect(select(treeView + '_DEMO', getTreeItem(label)), `item did not appear: ${item}`).to.be.present()));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        simulate.click(elementToSelect);
        await waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));

        // this verifies the feature of not closing expanded item if its not selected
        simulate.click(select(treeView + '_DEMO', rootNode));
        simulate.click(select(treeView + '_DEMO', rootNode));

        return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());
    });

    it('ends up in expected state after multiple clicks on same tree node', async function() {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        simulate.click(select(treeView + '_DEMO', getTreeItem(allNodesLabels[0])));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[1]));

        await waitForDom(
            () => expect(elementToSelect, 'initially was not false').to.have.attr('data-selected', 'false')
        );

        simulate.click(elementToSelect);
        await waitForDom(
            () => expect(elementToSelect, 'did not toggle to true').to.have.attr('data-selected', 'true')
        );

        simulate.click(elementToSelect);
        await waitForDom(
            () => expect(elementToSelect, 'did not toggle to false').to.have.attr('data-selected', 'false')
        );

        simulate.click(elementToSelect);
        return waitForDom(
            () => expect(elementToSelect, 'did not end up at true').to.have.attr('data-selected', 'true')
        );
    });

    describe('Using default renderer', function() {
        it('renders correct children', function() {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() =>
                treeData.forEach((treeItemData: TreeItemData) =>
                    expect(
                        select(
                            treeView,
                            getTreeItem(treeItemData.label)),
                            `${treeItemData.label} was not present`
                    ).to.be.present()
                )
            );
        });

        it('invokes the onSelectItem callback when an item is clicked', function() {
            const onSelectItem = sinon.spy();
            const { select } = clientRenderer.render(<TreeView dataSource={treeData} onSelectItem={onSelectItem}/>);

            const nodeLabelToClick = getTreeItem(treeData[0].label);

            simulate.click(select(nodeLabelToClick));

            return waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]);
            });
        });

        describe('<TreeItem />', function() {

            it('renders an item', function() {
                const { select, waitForDom } =
                    clientRenderer.render(
                        <TreeItem
                            item={item}
                            itemRenderer={TreeItem}
                            state={state}
                            stateMap={stateMap}
                        />
                    );

                return waitForDom(() => expect(select(getTreeItem(item.label))).to.be.present());
            });

            it('renders with provided label', function() {
                const { select, waitForDom } =
                    clientRenderer.render(
                        <TreeItem
                            item={item}
                            itemRenderer={TreeItem}
                            state={state}
                            stateMap={stateMap}
                        />
                    );

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_LABEL')).to.have.text(item.label));
            });

            it('renders with an icon', function() {
                const { select, waitForDom } =
                    clientRenderer.render(
                        <TreeItem
                            item={item}
                            itemRenderer={TreeItem}
                            state={state}
                            stateMap={stateMap}
                        />
                    );

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_ICON')).to.be.present());
            });

            it('renders correct children', function() {
                const { select, waitForDom } = clientRenderer.render(
                    <TreeItem
                        item={nestedItem}
                        itemRenderer={TreeItem}
                        state={state}
                        stateMap={stateMap}
                    />
                );

                return waitForDom(() =>
                    nestedItem.children!.forEach((child: TreeItemData) =>
                        expect(select(getTreeItem(child.label)), `${child.label} was not present`).to.be.present()));
            });

            it('invokes onClick when clicked', function() {
                const onClick = sinon.spy();
                const { select } = clientRenderer.render(
                    <TreeItem
                        item={item}
                        itemRenderer={TreeItem}
                        onItemClick={onClick}
                        state={state}
                        stateMap={stateMap}
                    />
                );

                simulate.click(select(getTreeItem(item.label)));

                return waitFor(() => expect(onClick).to.have.been.calledOnce);
            });
        });
    });
});
