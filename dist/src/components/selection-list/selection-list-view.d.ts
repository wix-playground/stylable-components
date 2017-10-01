/// <reference types="react" />
import React = require('react');
import { ChangeEvent } from '../../types/events';
import { FormInputProps } from '../../types/forms';
import { SelectionListItemValue, SelectionListModel } from './selection-list-model';
export interface ViewProps extends FormInputProps<SelectionListItemValue> {
    className?: string;
    focused?: boolean;
    list: SelectionListModel;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    style?: React.CSSProperties;
    tabIndex?: number;
}
export declare class SelectionListView extends React.Component<ViewProps> {
    static defaultProps: Partial<ViewProps>;
    render(): JSX.Element;
    private handleClick;
}
