export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export type AxisOptionsKey = 'x' | 'y' | 'xReverse' | 'yReverse';
export type TooltipPosition = 'top' | 'left' | 'right' | 'bottom';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export type FocusEventHandler = (
    event: React.FocusEvent<HTMLElement> | MouseEvent,
    currentIndex: number
) => void;

export type EventHandler<T> = (
    event: T,
    sliderArea: HTMLElement
) => void;
export type SliderValue = number | number[];
export interface ValueFromPointer {
    relativeValue: number[];
    currentValue: number;
    currentValueIndex: number;
}
