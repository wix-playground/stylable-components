import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {SelectionList, SelectionListOption as Option} from '../selection-list';
import {TabProps} from './tab';
import styles from './tabs.st.css';

export interface TabsProps extends properties.Props {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    unmountInactiveTabs?: boolean;
    onChange?: (event: ChangeEvent<string>) => void;
    children: Array<React.ReactElement<TabProps>>;
}

@properties
@stylable(styles)
export class Tabs extends React.Component<TabsProps> {
    public render() {
        const {children, value: selected} = this.props;

        return (
            <div>
                <SelectionList
                    className="tabList"
                    tabIndex={0}
                    data-automation-id="TAB_LIST"
                    value={selected}
                    onChange={this.handleChange}
                >
                    {children.map(
                        ({props: {label, value, disabled}}) =>
                            <Option
                                key={value}
                                value={value}
                                disabled={disabled}
                            >{label}
                            </Option>
                    )}
                </SelectionList>
                <div
                    className="tabPanel"
                    data-automation-id="TAB_PANEL"
                >
                    {children.filter(({props: {value}}) => value === selected)}
                </div>
            </div>
        );
    }

    private handleChange = (event: ChangeEvent<string>) =>
        typeof this.props.onChange === 'function' ? this.props.onChange(event) : null
}
