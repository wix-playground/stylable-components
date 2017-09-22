import {isTouch} from '../../src/utils';

export const skipDescribeIfTouch = isTouch ? describe : describe.skip;
