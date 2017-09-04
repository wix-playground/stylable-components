import {action, autorun, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {root} from 'wix-react-tools';
import {getLastAvailableItem, getNextItem, getPreviousItem} from './tree-util';

import * as keycode from 'keycode';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {MinusIcon, PlusIcon} from './tree-view-icons';
import style from './tree-view.st.css';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    HOME: keycode('home'),
    END: keycode('end'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    LEFT: keycode('left'),
    RIGHT: keycode('right')
};

export type TreeItemEventHandler = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => void;

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: React.ComponentType<TreeItemProps>;
    onItemClick?: TreeItemEventHandler;
    onIconClick?: TreeItemEventHandler;
    stateMap: TreeStateMap;
}

export interface TreeViewProps {
    dataSource: object[];
    itemRenderer?: React.ComponentType<TreeItemProps>;
    onSelectItem?: React.EventHandler<any>;
    onFocusItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
    focusedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
    isFocused: boolean;
    shouldRender: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;
export type ParentsMap = Map<TreeItemData, TreeItemData | undefined>;

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> =
    SBStateless(({item, itemRenderer, onItemClick, onIconClick, stateMap}) => {
        const state = stateMap.getItemState(item);
        const itemLabel = item.label.replace(' ', '_');
        const TreeNode = itemRenderer;
        const iconProps = {
            'data-automation-id': `${itemIdPrefix}_${itemLabel}_ICON`,
            'onClick': onIconClick && onIconClick.bind(null, item),
            'className': 'tree-item-icon'
        };

        return state!.shouldRender ? (
            <div>
                <div
                    data-automation-id={`${itemIdPrefix}_${itemLabel}`}
                    className="tree-node"
                    cssStates={{selected: state!.isSelected, focused: state!.isFocused}}
                    data-selected={state!.isSelected}
                    data-focused={state!.isFocused}
                    onClick={onItemClick && onItemClick.bind(null, item)}
                >
                    {item.children && (state!.isExpanded ?
                        <MinusIcon {...iconProps} /> : <PlusIcon {...iconProps} />)}

                    <span
                        data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}
                        className="tree-item-label"
                    >
                        {item.label}
                    </span>
                </div>
                <div className="nested-tree">
                    {state!.isExpanded && (item.children || []).map((child: TreeItemData, index: number) =>
                        <TreeNode
                            item={child}
                            onItemClick={onItemClick}
                            itemRenderer={itemRenderer}
                            onIconClick={onIconClick}
                            stateMap={stateMap}
                            key={`${index}`}
                        />
                    )}
                </div>
            </div>
        ) : null;
    }, style);

const TreeItemWrapper = observer(TreeItem);

export class TreeStateMap {
    private stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    public getItemState(item: TreeItemData) {
        const state = this.stateMap.get(item);
        if (state) {
            return state;
        } else {
            const newState = observable({isSelected: false, isExpanded: false, isFocused: false, shouldRender: true});
            this.stateMap.set(item, newState);
            return newState;
        }
    }
}

@SBComponent(style) @observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    public static defaultProps: Partial<TreeViewProps> = {
        itemRenderer: TreeItemWrapper,
        onSelectItem: () => {},
        onFocusItem: () => {}
    };

    private stateMap: TreeStateMap = new TreeStateMap();
    private parentsMap: ParentsMap = new Map<TreeItemData, TreeItemData | undefined>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initParentsMap(props.dataSource as TreeItemData[], undefined);
    }

    public componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                action(() => this.stateMap.getItemState(this.props.selectedItem!).isSelected = true)();
            }
            if (this.props.focusedItem) {
                action(() => this.stateMap.getItemState(this.props.focusedItem!).isFocused = true)();
            }
        });
    }

    public render() {
        const TreeNode = this.props.itemRenderer!;
        const rootProps = root(this.props, {'data-automation-id': 'TREE_VIEW', 'className': 'tree-view'});

        return (
            <div
                {...rootProps}
                tabIndex={0}
                onKeyDown={this.onKeyDown}
            >
                <input type="text" data-automation-id="FILTER_INPUT" placeholder="Filter by..." onChange={this.filter}/>
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    <TreeNode
                        item={item}
                        onItemClick={this.onSelectItem}
                        itemRenderer={this.props.itemRenderer!}
                        onIconClick={this.onToggleItem}
                        stateMap={this.stateMap}
                        key={`${index}`}
                    />
                )}
            </div>
        );
    }

    private initParentsMap(data: TreeItemData[] = [], parent: TreeItemData | undefined) {
        data.forEach((item: TreeItemData) => {
            this.parentsMap.set(item, parent);
            this.initParentsMap(item.children || [], item);
        });
    }

    private toggleItem(item: TreeItemData) {
        this.stateMap.getItemState(item).isExpanded = !this.stateMap.getItemState(item).isExpanded;
    }

    private selectItem(item: TreeItemData) {
        if (this.props.selectedItem) {
            if (this.props.selectedItem !== item) {
                this.stateMap.getItemState(this.props.selectedItem).isSelected = false;
                this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
            }
        } else {
            this.props.onSelectItem!(item);
        }
    }

    @action
    private onSelectItem = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.selectItem(item);
        if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
    }

    @action
    private onToggleItem = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
        this.toggleItem(item);
        this.props.onFocusItem!(item);
    }

    @action
    private onFocusItem(item: TreeItemData) {
        if (this.props.focusedItem !== item) {
            if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
            this.props.onFocusItem!(item);
        }
    }

    private expandItem = (item: TreeItemData) => {
        if (this.stateMap.getItemState(item).isExpanded) {
            this.focusNext(item);
        } else {
            if (item.children) { this.stateMap.getItemState(item).isExpanded = true; }
        }
    }

    private collapseItem = (item: TreeItemData) => {
        if (!this.stateMap.getItemState(item).isExpanded) {
            const parent = this.parentsMap.get(item);
            if (parent) { this.onFocusItem!(parent); }
        } else {
            if (item.children) { this.stateMap.getItemState(item).isExpanded = false; }
        }
    }

    private focusPrev = (item: TreeItemData) =>
        this.onFocusItem!(getPreviousItem(this.props.dataSource, item, this.stateMap, this.parentsMap))

    private focusNext = (item: TreeItemData) =>
        this.onFocusItem!(getNextItem(this.props.dataSource, item, this.stateMap, this.parentsMap))

    private focusFirst = () => this.props.onFocusItem!(this.props.dataSource[0]);
    private focusLast = () =>
        this.props.onFocusItem!(
            getLastAvailableItem(this.props.dataSource[this.props.dataSource.length - 1] as TreeItemData, this.stateMap)
        )

    @action
    private updateFilteredState(data: TreeItemData[], query: string) {
        let shouldRender = false;
        data.forEach(item => {
            const startsWithQuery = item.label.toLowerCase().startsWith(query);
            const descendantShouldRender = item.children && this.updateFilteredState(item.children, query);
            if (startsWithQuery || descendantShouldRender) {
                shouldRender = true;
                this.stateMap.getItemState(item).shouldRender = true;
            } else {
                this.stateMap.getItemState(item).shouldRender = false;
            }
        });
        return shouldRender;
    }

    // sets correct state for items to appear or not
    private filter = (event: any) => {
        const query = event.target.value.toLowerCase();
        this.updateFilteredState(this.props.dataSource as TreeItemData[], query);
    }

    @action
    private onKeyDown = (e: any) => {
        if (!this.props.focusedItem) { return; }

        switch (e.keyCode) {
            case KeyCodes.RIGHT:
                e.preventDefault(); this.expandItem(this.props.focusedItem); break;
            case KeyCodes.LEFT:
                e.preventDefault(); this.collapseItem(this.props.focusedItem); break;
            case KeyCodes.UP:
                e.preventDefault(); this.focusPrev(this.props.focusedItem); break;
            case KeyCodes.DOWN:
                e.preventDefault(); this.focusNext(this.props.focusedItem); break;
            case KeyCodes.ENTER:
                e.preventDefault(); this.selectItem(this.props.focusedItem); break;
            case KeyCodes.HOME:
                this.stateMap.getItemState(this.props.focusedItem).isFocused = false;
                e.preventDefault(); this.focusFirst(); break;
            case KeyCodes.END:
                this.stateMap.getItemState(this.props.focusedItem).isFocused = false;
                e.preventDefault(); this.focusLast(); break;
        }
    }
}
