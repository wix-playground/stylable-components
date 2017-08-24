import {ChangeEvent} from "./events";

export interface FormInput<T, S = any> {
    value: T;
    onChange: (event: ChangeEvent<T>) => void;
    onInput?: (event: ChangeEvent<S>) => void;
}
