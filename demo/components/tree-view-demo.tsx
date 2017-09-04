import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {TreeItemData , TreeItemProps, TreeView} from '../../src';
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
}

export interface TreeViewDemoCustomState {
    selectedItemCustom: TreeItemData | undefined;
    focusedItemCustom: TreeItemData | undefined;
}

const itemIdPrefix = 'TREE_ITEM';

export const CustomItem: React.SFC<TreeItemProps> =
    SBStateless(({item, itemRenderer, onItemClick, onIconClick, stateMap}) => {
        const state = stateMap.getItemState(item);
        const TreeNode = itemRenderer;
        const itemLabel = item.label.replace(' ', '_');
        const iconProps = {
            ['data-automation-id']: `${itemIdPrefix}_${itemLabel}_ICON`,
            onClick: onIconClick && onIconClick.bind(null, item),
            className: 'custom-tree-item-icon'
        };
        return (
            <div>
                <div
                    className="custom-tree-node"
                    cssStates={{selected: state!.isSelected, focused: state!.isFocused}}
                    data-selected={state!.isSelected}
                    data-focused={state!.isFocused}
                    onClick={onItemClick && onItemClick.bind(null, item)}
                    data-automation-id={`${itemIdPrefix}_${itemLabel}`}
                >
                    {item.children &&
                        <span {...iconProps}>{state!.isExpanded ? '[Close] ' : '[Open] '}</span>}
                    <span
                        data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}
                        className="custom-tree-item-label"
                    >
                        {item.label}<span className="node-tool-tip"> ({Math.floor(Math.random() * 100)} kcal)</span>
                    </span>
                </div>
                <div className="custom-nested-tree">
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

@SBComponent(style)
export class TreeViewDemo extends React.Component<{}, TreeViewDemoState> {

    public state = {selectedItem: undefined, focusedItem: undefined};

    public render() {
        return (
            <div>
                <h3>TreeView with ability to select a child</h3>
                <section data-automation-id="TREE_VIEW_DEMO">
                    <SelectedItem selectedItem={this.state.selectedItem} />
                    <br />
                    <TreeView
                        className="tree-view"
                        dataSource={treeData}
                        onFocusItem={this.onFocusItem}
                        focusedItem={this.state.focusedItem}
                        onSelectItem={this.onSelectItem}
                        selectedItem={this.state.selectedItem}
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

}

@SBComponent(style)
export class TreeViewDemoCustom extends React.Component<{}, TreeViewDemoCustomState> {

    public state = {selectedItemCustom: undefined, focusedItemCustom: undefined};

    public render() {
        return (
            <div>
                <h3>TreeView with custom item renderer (try hovering the labels)</h3>
                <section data-automation-id="TREE_VIEW_DEMO_CUSTOM">
                    <SelectedItem selectedItem={this.state.selectedItemCustom} />
                    <br />
                    <TreeView
                        className="tree-view"
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
