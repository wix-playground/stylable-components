import * as PropTypes from 'prop-types';
import * as React from 'react';

import {codes as KeyCode} from 'keycode';
import {stylable} from 'wix-react-tools';

import {ChangeEvent} from '../../types/events';
import {isRTLContext} from '../../utils';
import {
    selectionListItemsFromChildren,
    SelectionListModel,
    SelectionListView
} from '../selection-list';
import {
    renderTabContent,
    renderTabItems,
    tabElements,
    TabProps
} from './tab';
import styles from './tabs.st.css';

export type TabsOrientation
    = 'horizontal-top'
    | 'horizontal-bottom'
    | 'vertical-before'
    | 'vertical-after';

export interface TabsViewProps {
    value: string | undefined;
    onChange: (event: ChangeEvent<string>) => void;
    disabled?: boolean;
    orientation?: TabsOrientation;
    unmountInactiveTabs?: boolean;
    children?: Array<React.ReactElement<TabProps>>;
}

export interface TabsViewState {
    focused: boolean;
    tabList: SelectionListModel;
}

@stylable(styles)
export class TabsView extends React.Component<TabsViewProps, TabsViewState> {
    public static defaultProps = {
        unmountInactiveTabs: true
    };

    public static contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };

    constructor({value, children}: TabsViewProps) {
        super();
        const tabList = getSelectionListModel(children);
        tabList.selectValue(value);
        this.state = {tabList, focused: false};
    }

    public componentWillReceiveProps({value, children}: TabsViewProps) {
        const {focused} = this.state;
        const tabList = getSelectionListModel(children);

        tabList.selectValue(value);
        if (focused) {
            tabList.focusSelected();
        }

        this.setState({tabList});
    }

    public render() {
        const {
            value,
            onChange,
            disabled,
            orientation,
            children,
            unmountInactiveTabs,
            ...props
        } = this.props;
        const {tabList, focused} = this.state;
        const context = this.context;

        return (
            <div
                style-state={{
                    'horizontal-top': orientation === 'horizontal-top',
                    'horizontal-bottom': orientation === 'horizontal-bottom',
                    'vertical-before': orientation === 'vertical-before',
                    'vertical-after': orientation === 'vertical-after',
                    'rtl': isRTLContext(context)
                }}
                {...props}
            >
                <SelectionListView
                    className="tabList"
                    data-automation-id="TAB_LIST"
                    tabIndex={0}
                    list={tabList}
                    focused={focused}
                    onClick={this.handleTabListClick}
                    onBlur={this.handleTabListBlur}
                    onFocus={this.handleTabListFocus}
                    onKeyDown={this.handleTabListKeyDown}
                />
                <div
                    className="tabPanel"
                    data-automation-id="TAB_PANEL"
                >
                    {tabElements(children).map(renderTabContent(!unmountInactiveTabs, value))}
                </div>
            </div>
        );
    }

    private triggerChange(itemIndex: number) {
        const {tabList} = this.state;
        if (itemIndex > -1) {
            const item = tabList.items[itemIndex];
            if (item.selectable && !item.selected) {
                this.props.onChange!({value: item.value});
            }
        }
    }

    private handleTabListClick = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        this.triggerChange(itemIndex);
    }

    private handleTabListBlur: React.FocusEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        tabList.focusIndex(-1);
        this.setState({focused: false});
    }

    private handleTabListFocus: React.FocusEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        if (tabList.focusedIndex === -1) {
            tabList.focusSelected();
        }
        this.setState({focused: true});
    }

    private handleTabListKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        const context = this.context;
        switch (event.keyCode) {
            case KeyCode.up:
                if (tabList.focusPrevious()) {
                    event.preventDefault();
                    this.triggerChange(tabList.focusedIndex);
                    this.setState({tabList});
                }
                break;
            case KeyCode.down:
                if (tabList.focusNext()) {
                    event.preventDefault();
                    this.triggerChange(tabList.focusedIndex);
                    this.setState({tabList});
                }
                break;
            case KeyCode.left:
                if (
                    isRTLContext(context) ?
                    tabList.focusNext() :
                    tabList.focusPrevious()
                ) {
                    event.preventDefault();
                    this.triggerChange(tabList.focusedIndex);
                    this.setState({tabList});
                }
                break;
            case KeyCode.right:
                if (
                    isRTLContext(context) ?
                        tabList.focusPrevious() :
                        tabList.focusNext()
                ) {
                    event.preventDefault();
                    this.triggerChange(tabList.focusedIndex);
                    this.setState({tabList});
                }
                break;
        }
    }
}

const getSelectionListModel = (
    children: TabsViewProps['children']
): SelectionListModel => new SelectionListModel(
        selectionListItemsFromChildren(
            renderTabItems(children)
        )
    );
