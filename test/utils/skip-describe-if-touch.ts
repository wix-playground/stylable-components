import {isTouch} from '../../src/utils';

export const describeIfTouch = isTouch ? describe : describe.skip;
