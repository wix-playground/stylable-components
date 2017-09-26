import * as React from 'react';
import nodeStyle from './tree-node.st.css';
import {getFocusedItemKey, TreeItemProps, TreeItemData} from './tree-view';
import {MinusIcon, PlusIcon} from './tree-view-icons';
import {stylable} from 'wix-react-tools';

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> =
    stylable(nodeStyle)(({item, itemRenderer, onItemClick, onIconClick, stateMap}) => {
        const state = stateMap.getItemState(item);
        const itemLabel = item.label.replace(' ', '_');
        const TreeNode = itemRenderer;
        const iconProps = {
            'data-automation-id': `${itemIdPrefix}_${itemLabel}_ICON`,
            'onClick': onIconClick && onIconClick.bind(null, item),
            'className': 'tree-item-icon',
            'aria-hidden': 'true'
        };

        return (
            <li
                aria-expanded={item.children ? !!state!.isExpanded : undefined}
                aria-selected={state!.isSelected ? true : undefined}
                id={getFocusedItemKey(item)}
                data-automation-id={`${itemIdPrefix}_${itemLabel}_NODE`}
                role="treeitem"
            >
                <div
                    data-automation-id={`${itemIdPrefix}_${itemLabel}`}
                    className="tree-node"
                    style-state={{selected: state!.isSelected, focused: state!.isFocused}}
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
                {item.children && <ul className="nested-tree" role="group">
                    {state!.isExpanded && item.children.map((child: TreeItemData, index: number) =>
                        <TreeNode
                            item={child}
                            onItemClick={onItemClick}
                            itemRenderer={itemRenderer}
                            onIconClick={onIconClick}
                            stateMap={stateMap}
                            key={`${index}`}
                        />
                    )}
                </ul>}
            </li>
        );
    });
