import * as PropTypes from 'prop-types';
import * as React from 'react';

import {codes as KeyCode} from 'keycode';
import {stylable} from 'wix-react-tools';

import {ChangeEvent} from '../../types/events';
import {isRTLContext} from '../../utils';
import {
    SelectionList,
    SelectionListModel,
    SelectionListOption as Option,
    SelectionListView
} from '../selection-list';
import {TabProps} from './tab';
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

    public static contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };

    constructor({value, children}: TabsViewProps) {
        super();
        const tabList = new SelectionListModel();
        tabList.addChildren(renderTabItems(children));
        tabList.selectValue(value);
        this.state = {tabList, focused: false};
    }

    public componentWillReceiveProps({value, children}: TabsViewProps) {
        const {focused} = this.state;
        const tabList = new SelectionListModel();

        tabList.addChildren(renderTabItems(children));
        tabList.selectValue(value);
        if (focused) {
            tabList.focusValue(value);
        }

        this.setState({tabList});
    }

    public render() {
        const {value, onChange, disabled, orientation, children, ...props} = this.props;
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
                    onChange={onChange}
                    onBlur={this.handleTabListBlur}
                    onFocus={this.handleTabListFocus}
                    onKeyDown={this.handleTabListKeyDown}
                />
                <div
                    className="tabPanel"
                    data-automation-id="TAB_PANEL"
                >
                    {tabElements(children).map(renderTab(value))}
                </div>
            </div>
        );
    }

    private handleTabListBlur: React.FocusEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        tabList.focusValue(undefined);
        this.setState({focused: false, tabList});
    }

    private handleTabListFocus: React.FocusEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        const selected = tabList.getSelectedValue();
        tabList.focusValue(selected);
        this.setState({focused: true, tabList});
    }

    private handleTabListKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        const {tabList} = this.state;
        const context = this.context;
        switch (event.keyCode) {
            case KeyCode.enter:
                event.preventDefault();
                const focused = tabList.getFocusedValue();
                tabList.selectValue(focused);
                this.setState({tabList});
                focused !== undefined ?
                    this.props.onChange({value: focused}) :
                    null;
                break;
            case KeyCode.up:
                event.preventDefault();
                tabList.focusPrevious();
                this.setState({tabList});
                break;
            case KeyCode.down:
                event.preventDefault();
                tabList.focusNext();
                this.setState({tabList});
                break;
            case KeyCode.left:
                event.preventDefault();
                // tabList.focusPrevious();
                isRTLContext(context) ?
                    tabList.focusNext() :
                    tabList.focusPrevious();
                this.setState({tabList});
                break;
            case KeyCode.right:
                event.preventDefault();
                // tabList.focusNext();
                isRTLContext(context) ?
                    tabList.focusPrevious() :
                    tabList.focusNext();
                this.setState({tabList});
                break;
        }
    }
}

const isTabElement = (
    child: React.ReactChild
): child is React.ReactElement<TabProps> =>
    typeof child !== 'string' && typeof child !== 'number';

const tabElements = (
    children: React.ReactNode
): Array<React.ReactElement<TabProps>> =>
    React.Children.toArray(children).filter(isTabElement);

const renderTabItem = (
    {props: {value, disabled, label}}: React.ReactElement<TabProps>, index: number
) => {
    const ensured = ensureValue(value, index);
    return (
        <Option
            key={ensured}
            value={ensured}
            disabled={disabled}
        >{label}
        </Option>
    );
};

const renderTabItems = (children: React.ReactNode) =>
    tabElements(children).map(renderTabItem);

const renderTab = (
    selected: string | undefined
) => (
    {props: {value, children}}: React.ReactElement<TabProps>,
    index: number
) => selected !== undefined && selected === ensureValue(value, index) ? children : null;

const ensureValue = (
    value: string | undefined,
    index: number
) => value === undefined ? String(index) : value;
