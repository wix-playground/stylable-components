import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { TreeView, TreeItem } from '../../src';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id}`;
    }

    describe('Using default renderer', () => {

        const treeData: Object[] = [
            { id: 'id0', label: 'label0' },
            { id: 'id1', label: 'label1' },
            { id: 'id2', label: 'label2' }
        ];

        it('renders to the screen', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() => expect(select(treeView)).to.be.present());
        });

        it('renders correct children', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() =>
                treeData.forEach((item: {id: string, label: string}) =>
                    expect(select(treeView, getTreeItem(item.id))).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', () => {
            const onSelectItem = sinon.spy();
            const { select } = clientRenderer.render(<TreeView dataSource={treeData} onSelectItem={onSelectItem}/>);

            debugger;

            simulate.click(select(getTreeItem((treeData[0] as {id: string}).id)));

            return waitFor(() => expect(onSelectItem).to.have.been.calledWithMatch({data: treeData[0]}));
        });

        describe('<TreeItem />', () => {

            const item = { id: 'id', label: 'label' };

            it('renders an item', () => {
                const { select, waitForDom } = clientRenderer.render(<TreeItem id={item.id} label={item.label}/>);

                return waitForDom(() => expect(select(getTreeItem(item.id))).to.be.present());
            });

            it('renders with provided label', () => {
                const { select, waitForDom } = clientRenderer.render(<TreeItem id={item.id} label={item.label}/>);

                return waitForDom(() => expect(select(getTreeItem(item.id) + '_LABEL')).to.have.text(item.label));
            });

            it('renders with an icon', () => {
                const { select, waitForDom } = clientRenderer.render(<TreeItem id={item.id} label={item.label}/>);

                return waitForDom(() => expect(select(getTreeItem(item.id) + '_ICON')).to.be.present());
            });
        });
    });
});
