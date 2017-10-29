import {expect} from 'test-drive-react';
import {nearest, nearestIndex} from '../../src/utils/nearest';

const VECTOR = [1, 2, 2, 3, 7, 4, 5, 9, 6];

describe('Utils/nearest', () => {
    it('nearest in range', () => {
        expect(nearest(VECTOR, 1)).to.equal(1);
        expect(nearest(VECTOR, 2)).to.equal(2);
        expect(nearest(VECTOR, 9)).to.equal(9);
        expect(nearest(VECTOR, 1.6)).to.equal(2);
        expect(nearest(VECTOR, 1.5)).to.equal(1);
    });

    it('nearest out of range', () => {
        expect(nearest(VECTOR, -1)).to.equal(1);
        expect(nearest(VECTOR, 10)).to.equal(9);
    });

    it('nearest in empty array', () => {
        expect(nearest([], 2)).to.be.undefined;
    });

    it('nearestIndex in range', () => {
        expect(nearestIndex(VECTOR, 1)).to.equal(0);
        expect(nearestIndex(VECTOR, 2)).to.equal(1);
        expect(nearestIndex(VECTOR, 9)).to.equal(7);
        expect(nearestIndex(VECTOR, 1.6)).to.equal(1);
        expect(nearestIndex(VECTOR, 1.5)).to.equal(0);
    });

    it('nearestIndex out of range', () => {
        expect(nearestIndex(VECTOR, -1)).to.equal(0);
        expect(nearestIndex(VECTOR, 10)).to.equal(7);
    });

    it('nearestIndex in empty array', () => {
        expect(nearestIndex([], 2)).to.equal(-1);
    });

    it('nearestIndex ordered by index', () => {
        expect(nearestIndex(VECTOR, 1, true)).to.equal(0);
        expect(nearestIndex(VECTOR, 2, true)).to.equal(2);
        expect(nearestIndex(VECTOR, 1.6, true)).to.equal(1);
        expect(nearestIndex(VECTOR, 1.5, true)).to.equal(0);
    });
});
