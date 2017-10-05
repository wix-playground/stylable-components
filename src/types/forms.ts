import {ChangeEvent} from './events';

export interface FormInputProps<T, S = T> {
    value?: T;
    onChange?: (event: ChangeEvent<T>) => void;
    onInput?: (event: ChangeEvent<S>) => void;
    autoFocus?: boolean;
    disabled?: boolean;
    name?: string;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
}
