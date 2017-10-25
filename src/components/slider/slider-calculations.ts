import {warnOnce} from '../../utils/logger';
import {AXES, CONTINUOUS_STEP} from './slider-constants';
import {AxisOptions, PointerPosition, SliderValue, Step} from './slider-types';

export function isVertical(axis: AxisOptions): boolean {
    return axis === AXES.y || axis === AXES.yReverse;
}

export function getSizeProperty(axis: AxisOptions): 'width' | 'height' {
    return isVertical(axis) ? 'height' : 'width';
}

export function getPositionProperty(axis: AxisOptions, rtl: boolean): 'top' | 'bottom' | 'right' | 'left' {
    const reversed = isReverse(axis) !== rtl;
    return isVertical(axis) ?
        reversed ? 'top' : 'bottom' :
        reversed ? 'right' : 'left';
}

export function isReverse(axis: AxisOptions): boolean {
    return axis === AXES.xReverse || axis === AXES.yReverse;
}

export function getRelativeStep(step: Step | undefined, min: number, max: number): Step {
    if (typeof step === 'number' && step <= 0) {
        warnOnce('Slider accepts only step="any" or number greater than 0, but %s given', step);
    }
    if (typeof step === 'undefined' || step === CONTINUOUS_STEP || step <= 0) {
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
    const range = max - min;
    const absoluteValue = range * relativeValue / 100 + min;
    return getValueInRange(absoluteValue, min, max);
}

export function relativeToAbsoluteValue(relativeValue: number[], min: number, max: number): number[] {
    return relativeValue
        .map(value => getAbsoluteValue(value, min, max))
        .sort((a, b) => a - b);
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

export function getNewValue(values: number[], newValue: number, index: number): number[] {
    return values.map((value, i) => i === index ? newValue : value).sort((a, b) => a - b);
}

export function getNormalizedValue(values: SliderValue): number[] {
    if (Array.isArray(values)) {
        return values;
    } else {
        return [values];
    }
}

export function getDenormalizedValue(values: number[]): SliderValue {
    if (values.length > 1) {
        return values;
    } else {
        return values[0];
    }
}
