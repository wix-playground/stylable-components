import * as React from 'react';
import {TreeView} from '../../src';
import {TreeItemData , TreeItemProps} from '../../src/components/tree-view/tree-view';
import {observer} from 'mobx-react';
import {SBStateless} from 'stylable-react-component';
import style from './tree-view-demo.st.css';

export const treeData: TreeItemData[] = [
    { label: 'Food Menu', children: [
        { label: 'Salads', children: [
            {label: 'Greek Salad'},
            {label: 'Israeli Salad'},
            {label: 'Caesar Salad'}
        ]},
        { label: 'Steaks', children: [
            {label: 'Fillet Steak'},
            {label: 'Sirloin Steak'}
        ]},
        { label: 'Desserts', children: [
            {label: 'Pancakes'},
            {label: 'Muffin'},
            {label: 'Waffle'},
            {label: 'Cupcake'}
        ]}
    ]}
];

function SelectedItem({selectedItem}: any) {
    return (
        <div style={{fontSize: '1.41em', textDecoration: 'underline'}}>
            {selectedItem ?
                (!selectedItem.children ?
                    `You chose ${selectedItem.label}. Bon appetit!` :
                    `You are looking at ${selectedItem.label}. Please choose a dish.`) :
                'Please choose from the Menu!'}
        </div>
    );
}

export interface TreeViewDemoState {
    selectedItem: TreeItemData | undefined;
    focusedItem: TreeItemData | undefined;
    selectedItemCustom: TreeItemData | undefined;
    focusedItemCustom: TreeItemData | undefined;
}

export const CustomItem: React.SFC<TreeItemProps> =
    SBStateless(({item, itemRenderer, onItemClick, onIconClick, stateMap}) => {
        const state = stateMap.getItemState(item);
        const TreeNode = itemRenderer;
        const iconProps = {
            onClick: onIconClick && onIconClick.bind(null, item),
            className: 'tree-item-icon'
        };
        return (
            <div>
                <div
                    className="tree-node"
                    cssStates={{selected: state!.isSelected, focused: state!.isFocused}}
                    data-selected={state!.isSelected}
                    data-focused={state!.isFocused}
                    onClick={onItemClick && onItemClick.bind(null, item)}
                >
                    {item.children &&
                        <span {...iconProps}>{state!.isExpanded ? '[Close] ' : '[Open] '}</span>}
                    <span
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
        );
    }, style);

const CustomItemWrapper = observer(CustomItem);

export class TreeViewDemo extends React.Component<{}, TreeViewDemoState> {

    constructor() {
        super();
        this.state = {
            selectedItem: undefined,
            focusedItem: undefined,
            selectedItemCustom: undefined,
            focusedItemCustom: undefined
        };
    }

    public render() {
        return (
            <div>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.state.selectedItem} />
                    <br />
                    <TreeView
                        dataSource={treeData}
                        onFocusItem={this.onFocusItem}
                        focusedItem={this.state.focusedItem}
                        onSelectItem={this.onSelectItem}
                        selectedItem={this.state.selectedItem}
                    />
                </section>
                <h3>TreeView with custom item renderer</h3>
                <section>
                    <SelectedItem selectedItem={this.state.selectedItemCustom} />
                    <br />
                    <TreeView
                        dataSource={treeData}
                        itemRenderer={CustomItemWrapper}
                        onFocusItem={this.onFocusItemCustom}
                        focusedItem={this.state.focusedItemCustom}
                        onSelectItem={this.onSelectItemCustom}
                        selectedItem={this.state.selectedItemCustom}
                    />
                </section>
            </div>
        );
    }

    private onSelectItem = (item: TreeItemData) => {
        this.setState({
            selectedItem: item,
            focusedItem: item
        });
    }

    private onFocusItem = (item: TreeItemData) => {
        this.setState({
            focusedItem: item
        });
    }

    private onSelectItemCustom = (item: TreeItemData) => {
        this.setState({
            selectedItemCustom: item,
            focusedItemCustom: item
        });
    }

    private onFocusItemCustom = (item: TreeItemData) => {
        this.setState({
            focusedItemCustom: item
        });
    }

}
