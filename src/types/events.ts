export interface BaseEvent {}

export interface ChangeEvent<T> extends BaseEvent {
    value: T;
}
