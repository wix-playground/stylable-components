import {isTouch} from '../../src/utils';

export const skipItIfTouch = isTouch ? it : it.skip;
