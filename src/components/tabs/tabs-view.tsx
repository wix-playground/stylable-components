import * as React from 'react';

import {stylable} from 'wix-react-tools';
import styles from './tabs.st.css';

import {ChangeEvent} from '../../types/events';
import {isRTLContext} from '../../utils';
import {SelectionList, SelectionListOption as Option} from '../selection-list';
import {TabProps} from './tab';

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

export const TabsView: React.StatelessComponent<TabsViewProps> = stylable(styles)(
    ({value, onChange, disabled, orientation, children, ...props}, context) => {
        const tabs = tabElements(children);
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
                <SelectionList
                    className="tabList"
                    tabIndex={0}
                    data-automation-id="TAB_LIST"
                    value={value}
                    onChange={onChange}
                >
                    {tabs.map(renderTabItem)}
                </SelectionList>
                <div
                    className="tabPanel"
                    data-automation-id="TAB_PANEL"
                >
                    {tabs.map(renderTab(value))}
                </div>
            </div>
        );
    }
);

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
