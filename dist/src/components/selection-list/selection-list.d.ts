/// <reference types="react" />
import React = require('react');
import { ChangeEvent } from '../../types/events';
import { FormInputProps } from '../../types/forms';
import { OptionList, SelectionListItemValue } from './selection-list-model';
export interface Props extends OptionList, FormInputProps<SelectionListItemValue> {
    className?: string;
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: SelectionListItemValue;
}
export declare class SelectionList extends React.Component<Props> {
    static defaultProps: Props;
    private disposers;
    private focused;
    readonly children: React.ReactNode;
    readonly dataSource: (string | symbol | object)[] | undefined;
    readonly dataSchema: {} | undefined;
    readonly renderItem: ((item: string | symbol | object) => JSX.Element | null) | undefined;
    readonly value: string | undefined;
    private readonly list;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private handleFocus;
    private handleBlur;
    private handleKeyDown;
}
