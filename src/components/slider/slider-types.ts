export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
