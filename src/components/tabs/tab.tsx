import * as React from 'react';

import {SelectionListOption as Option} from '../selection-list';

export interface TabProps {
    value?: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}

export type TabElement = React.ReactElement<TabProps>;

export const Tab: React.StatelessComponent<TabProps> = props => null;

export const isTabElement = (
    child: React.ReactChild
): child is TabElement =>
    typeof child !== 'string' && typeof child !== 'number';

export const tabElements = (children: React.ReactNode): TabElement[] =>
    React.Children.toArray(children).filter(isTabElement);

export const renderTabItem =
    ({props: {value, disabled, label}}: TabElement, index: number) => {
        const ensured = ensureValue(index, value);
        return (
            <Option
                key={ensured}
                value={ensured}
                disabled={disabled}
            >{label}
            </Option>
        );
    };

export const renderTabItems = (children: React.ReactNode) =>
    tabElements(children).map(renderTabItem);

export const renderTabContent =
    (mountInactiveTabs: boolean, selected?: string) =>
        ({props: {value, children}}: TabElement, index: number) =>
        selected !== undefined && selected === ensureValue(index, value) ?
            <div className="tabContent">{children}</div> :
            mountInactiveTabs ? (
                <div
                    className="tabContent"
                    style-state={{inactive: true}}
                >
                    {children}
                </div>
            ) : null;

const ensureValue = (index: number, value?: string) =>
    value === undefined ? String(index) : value;
