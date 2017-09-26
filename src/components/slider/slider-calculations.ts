import {AXISES, CONTINUOUS_STEP} from './slider-constants';
import {AxisOptions, PointerPosition, Step} from './slider-types';

export function isVertical(axis: AxisOptions): boolean {
    return axis === AXISES.y || axis === AXISES.yReverse;
}

export function isReverse(axis: AxisOptions): boolean {
    return axis === AXISES.xReverse || axis === AXISES.yReverse;
}

export function getRelativeStep(step: Step | undefined, min: number, max: number): Step {
    if (typeof step === 'undefined' || step === CONTINUOUS_STEP) {
        return CONTINUOUS_STEP;
    }
    return 100 * step / (max - min);
}

export function getRelativeValue(value: number, min: number, max: number): number {
    const normilizedMax = max - min;
    const normilizedValue = value - min;

    const relativeValue = (normilizedValue * 100) / normilizedMax;

    return getValueInRange(relativeValue, 0, 100);
}

export function getAbsoluteValue(relativeValue: number, min: number, max: number): number {
    const range = max! - min!;
    const absoluteValue = range * relativeValue / 100 + min!;
    return getValueInRange(absoluteValue, min!, max!);
}

export function getValueInRange(value: number, min: number, max: number): number {
    return value < min ? min : (value > max ? max : value);
}

export function getValueFromElementAndPointer(
    element: HTMLElement,
    {clientX, clientY}: PointerPosition,
    relativeStep: Step,
    vertically: boolean,
    reversed: boolean
): number {
    const {top, left, height, width} = element.getBoundingClientRect();

    const sliderOffset = vertically ? top : left;
    const sliderSize = vertically ? height : width;
    const sliderCoordinate = vertically ? clientY : clientX;

    let relativeValue = getRelativeValue(sliderCoordinate - sliderOffset, 0, sliderSize);

    relativeValue = reversed ?
        (vertically ? relativeValue : 100 - relativeValue) :
        (vertically ? 100 - relativeValue : relativeValue);

    if (relativeStep === undefined || relativeStep === CONTINUOUS_STEP) {
        return relativeValue;
    }
    let value = Math.round(relativeValue / relativeStep) * relativeStep;
    value = value > 100 ?
        value - relativeStep :
        (value < 0 ? value + relativeStep : value);

    return value;
}
