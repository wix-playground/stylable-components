/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { ChangeEvent } from '../../types/events';
import { FormInputProps } from '../../types/forms';
import { OptionList } from '../selection-list/selection-list-model';
export declare type FilterPredicate = (item: string, filterString: string) => boolean;
export interface AutoCompleteProps extends FormInputProps<string>, Partial<OptionList>, properties.Props {
    open?: boolean;
    filter?: FilterPredicate;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
}
export interface AutoCompleteState {
    input: HTMLInputElement | null;
}
export declare class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
    static defaultProps: AutoCompleteProps;
    state: {
        input: null;
        isOpen: boolean;
    };
    render(): JSX.Element;
    private refCallback;
    private onChange;
    private onClick;
    private onCaretClick;
    private openPopup();
    private togglePopup();
}
