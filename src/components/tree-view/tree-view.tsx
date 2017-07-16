import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';

const style = require('./tree-view.css');

export interface TreeItemRenderer {
    (props: TreeItemProps): JSX.Element;
}

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: TreeItemRenderer;
    onItemClick?: React.EventHandler<any>;
    stateMap?: StateMap;
    state?: TreeItemState;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
}

type StateMap = Map<TreeItemData, TreeItemState>;

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick,
                           stateMap = new Map<TreeItemData, TreeItemState>(), state }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div data-automation-id={`${itemIdPrefix}_${item.label.replace(' ', '_')}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)} data-selected={ !!state && state!.isSelected }>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {(item.children || []).map((child: TreeItemData) =>
                    React.createElement(itemRenderer,
                        {item: child, onItemClick, itemRenderer, stateMap, state: stateMap.get(child)}))}
            </div>
        </div>
    )
}

const TreeItemWrapper = observer(TreeItem);

function getLabelsList(data: TreeItemData): TreeItemData[] {
    return [data]
        .concat(...(data.children || [])
            .map(getLabelsList));
}

function getAllNodeLabels(treeData: Object[]) {
    return treeData.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
}

@observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    constructor(props: TreeViewProps) {
        super(props);

        getAllNodeLabels(props.dataSource).forEach(item => {
           this.stateMap.set(item, observable({ isSelected: false }));
        });
    }

    componentDidMount() {
        autorun(() => {
            const currItem = this.props.selectedItem;
            if (!currItem) return;


            if (this.stateMap.get(currItem)) {
                this.stateMap.get(currItem)!.isSelected = true;
            } else {
                this.stateMap.set(currItem, observable({ isSelected: true }));
            }
        });
    }

    onSelectItem = (item: TreeItemData) => {
        const currItem = this.props.selectedItem;
        if (!!currItem && currItem.label) {
            this.stateMap.get(currItem)!.isSelected = false;
        }
        this.props.onSelectItem!(item);
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW' className={style['tree-view']}>
                {(this.props.dataSource || []).map((item: TreeItemData) =>
                    React.createElement(
                        this.props.itemRenderer!,
                        {item, onItemClick: this.onSelectItem,
                            itemRenderer: this.props.itemRenderer!, stateMap: this.stateMap, state: this.stateMap.get(item) }))}
            </div>
        )
    }
}
