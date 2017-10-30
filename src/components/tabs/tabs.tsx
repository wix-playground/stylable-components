import * as React from 'react';
import {properties} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {TabsView, TabsViewProps} from './tabs-view';

export type TabsOrientation
    = 'horizontal-top'
    | 'horizontal-bottom'
    | 'vertical-before'
    | 'vertical-after';

export interface TabsProps extends properties.Props, Partial<TabsViewProps> {
    defaultValue?: TabsViewProps['value'];
}

@properties
export class Tabs extends React.Component<TabsProps> {
    public static defaultProps: Partial<TabsProps> = {
        orientation: 'horizontal-top'
    };

    public render() {
        const {value, defaultValue, ...rest} = this.props;
        const selected = defaultValue || value;

        return (
            <TabsView
                value={selected}
                onChange={this.handleChange}
                {...rest}
            />
        );
    }

    private handleChange = (event: ChangeEvent<string>) =>
        typeof this.props.onChange === 'function' ? this.props.onChange(event) : null
}
