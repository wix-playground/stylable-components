import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './tree-item.st.css';
import {TreeItemData, TreeItemProps} from './tree-view';

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> =
    stylable(styles)(({item, itemRenderer, onItemClick, onIconClick, stateMap}) => {
        const state = stateMap.getItemState(item);
        const itemLabel = item.label.replace(' ', '_');
        const prefix = `${itemIdPrefix}_${itemLabel}`;
        const TreeNode = itemRenderer;

        return (
            <li
                aria-expanded={item.children ? !!state!.isExpanded : undefined}
                aria-selected={state!.isSelected ? true : undefined}
                id={item.label}
                role="treeitem"
                data-automation-id={prefix}
                style-state={{selected: state!.isSelected, focused: state!.isFocused, expanded: !!state!.isExpanded}}
                onClick={onItemClick && onItemClick.bind(null, item)}
            >
                <div className="title">
                    {item.children &&
                        <div
                            className="icon"
                            style-state={{expanded: state.isExpanded}}
                            data-automation-id={`${prefix}_ICON`}
                            onClick={onIconClick && onIconClick.bind(null, item)}
                            aria-hidden
                        />
                    }

                    <span
                        data-automation-id={`${prefix}_LABEL`}
                        className="itemLabel"
                    >
                        {item.label}
                    </span>
                </div>
                {item.children && state.isExpanded && <ul className="nestedTree" role="group">
                    {item.children.map((child: TreeItemData, index: number) =>
                        <TreeNode
                            item={child}
                            onItemClick={onItemClick}
                            itemRenderer={itemRenderer}
                            onIconClick={onIconClick}
                            stateMap={stateMap}
                            key={index}
                        />
                    )}
                </ul>}
            </li>
        );
    });
