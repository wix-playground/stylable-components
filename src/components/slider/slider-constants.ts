import {AxisOptions, AxisOptionsKey} from './slider-types';

export const AXES: {[name in AxisOptionsKey]: AxisOptions} = {
    x: 'x',
    y: 'y',
    xReverse: 'x-reverse',
    yReverse: 'y-reverse'
};
export const CONTINUOUS_STEP = 'any';
export const DEFAULT_STEP = 1;
export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;
export const DEFAULT_VALUE = DEFAULT_MIN;
export const DEFAULT_AXIS = AXES.x;
