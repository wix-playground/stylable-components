import * as React from 'react';
import {properties} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {TabsOrientation, TabsView, TabsViewProps} from './tabs-view';

export interface TabsProps extends properties.Props, Partial<TabsViewProps> {
    defaultValue?: TabsViewProps['value'];
}

export interface TabsState {
    selected?: TabsViewProps['value'];
}

@properties
export class Tabs extends React.Component<TabsProps, TabsState> {
    public static defaultProps: Partial<TabsProps> = {
        orientation: 'horizontal-top'
    };

    constructor({value, defaultValue, children}: TabsProps) {
        super();

        this.state = {
            selected: getSelectedValue(value, defaultValue)
        };
    }

    public componentWillReceiveProps({value, defaultValue}: TabsProps) {
        if (this.isControlled) {
            if (value !== this.props.value) {
                this.setState({selected: value});
            }
        }
    }

    public render() {
        const {value, defaultValue, ...rest} = this.props;
        const {selected} = this.state;

        return (
            <TabsView
                value={selected}
                onChange={this.handleChange}
                {...rest}
            />
        );
    }

    private handleChange = (event: ChangeEvent<string>) => {
        if (this.isControlled && this.props.onChange !== undefined) {
            this.props.onChange(event);
        } else {
            this.setState({selected: event.value});
        }
    }

    private get isControlled() {
        return this.props.value !== undefined;
    }
}

function getSelectedValue(
    value: TabsProps['value'],
    defaultValue: TabsProps['value']
): TabsState['selected'] {
    if (value !== undefined) {
        return value;
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }
    return '0';
}
