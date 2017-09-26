export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
export type MouseHandler = (
    event: React.MouseEvent<HTMLElement> | MouseEvent,
    sliderArea: HTMLElement,
    focusableElement: HTMLElement
) => void;
export type TouchHandler = (
    event: React.TouchEvent<HTMLElement> | TouchEvent,
    sliderArea: HTMLElement,
    focusableElement: HTMLElement
) => void;
