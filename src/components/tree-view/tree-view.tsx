import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';
import { KeyCodes } from '../../common/key-codes';

const style = require('./tree-view.css');

export interface TreeItemRenderer {
    (props: TreeItemProps): JSX.Element;
}

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps extends React.Attributes {
    item: TreeItemData;
    itemRenderer: TreeItemRenderer;
    onItemClick?: React.EventHandler<any>;
    stateMap: StateMap;
    state: TreeItemState;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
    focusedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
    isFocused: boolean;
    parent: TreeItemData | undefined;
}

export type StateMap = Map<TreeItemData, TreeItemState>;

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, stateMap, state }: TreeItemProps): JSX.Element {
    const itemLabel = item.label.replace(' ', '_');
    return (
        <div>
            <div data-automation-id={`${itemIdPrefix}_${itemLabel}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)}
                 data-selected={ state!.isSelected }
                 data-focused={ state!.isFocused }>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {state!.isExpanded && (item.children || []).map((child: TreeItemData, index: number) =>
                    React.createElement(itemRenderer,
                        {item: child, onItemClick, itemRenderer, stateMap, state: stateMap.get(child)!, key: `${index}`}))}
            </div>
        </div>
    )
}

const TreeItemWrapper = observer(TreeItem);

@observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initState(props.dataSource as TreeItemData[], undefined);
    }

    initState(data: TreeItemData[] = [], parent: TreeItemData | undefined) {
        data.forEach((item: TreeItemData) => {
            this.stateMap.set(item, observable({ isSelected: false, isExpanded: false, isFocused: false, parent }));
            this.initState(item.children || [], item);
        });
    }

    componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = true;
            }
        });
    }

    toggleItem(item: TreeItemData) {
        if (this.stateMap.get(item)!.isExpanded && this.props.selectedItem !== item) return;
        this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
    }

    onSelectItem = (item: TreeItemData) => {
        if (this.props.selectedItem) {
            this.stateMap.get(this.props.selectedItem)!.isSelected = false;
            this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
        } else {
            this.props.onSelectItem!(item);
        }
        this.toggleItem(item);
    };

    getPreviousItem(item: TreeItemData) {

        return item;
    }

    getNextItem(item: TreeItemData) {
        const itemState = this.stateMap.get(item)!;
        const parent = itemState!.parent;
        if (!parent) {
            if (itemState.isExpanded) {
                if (item.children) {
                    return item.children![0];
                } else {
                    const itemIdx = this.props.dataSource.indexOf(item);
                    return itemIdx !== this.props.dataSource.length ? this.props.dataSource[itemIdx + 1] : item;
                }
            } else {
                const itemIdx = this.props.dataSource.indexOf(item);
                return itemIdx !== this.props.dataSource.length ? this.props.dataSource[itemIdx + 1] : item;
            }
        } else {
            if (itemState.isExpanded) {
                if (item.children) {
                    return item.children![0];
                } else {
                    const itemIdx = parent.children!.indexOf(item);
                    return itemIdx !== parent.children!.length ? parent.children![itemIdx + 1] : item;
                }
            } else {
                const itemIdx = parent.children!.indexOf(item);
                return itemIdx !== parent.children!.length ? parent.children![itemIdx + 1] : item;
            }
        }
    }

    expandItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = true;
    collapseItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = false;
    focusPrev = (item: TreeItemData) => this.stateMap.get(this.getPreviousItem(item) as TreeItemData)!.isFocused = true;
    focusNext = (item: TreeItemData) => this.stateMap.get(this.getNextItem(item) as TreeItemData)!.isFocused = true;

    onKeyDown = (e: any) => {
        if (!this.props.focusedItem) return;

        this.stateMap.get(this.props.focusedItem)!.isFocused = false;

        switch(e.keyCode) {
            case KeyCodes.RIGHT:
                this.expandItem(this.props.focusedItem); return;
            case KeyCodes.LEFT:
                this.collapseItem(this.props.focusedItem); return;
            case KeyCodes.UP:
                this.focusPrev(this.props.focusedItem); return;
            case KeyCodes.DOWN:
                this.focusNext(this.props.focusedItem); return;
            default:
                return;
        }
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW' className={style['tree-view']} onKeyDown={this.onKeyDown}>
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    React.createElement(
                        this.props.itemRenderer!,
                        {item, onItemClick: this.onSelectItem, itemRenderer: this.props.itemRenderer!,
                            stateMap: this.stateMap, state: this.stateMap.get(item)!, key: `${index}` }))}
            </div>
        )
    }
}
