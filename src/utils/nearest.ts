import {last} from './last';

export function nearest(vector: number[], value: number): number {
    return vector.slice().sort((a, b) => (Math.abs(value - a) - Math.abs(value - b)))[0];
}
export function nearestIndex(vector: number[], value: number, ordered?: boolean): number {
    const nearestValue = nearest(vector, value);
    if (ordered) {
        const sameValueIndexes = vector.reduce((indexes: number[], item, index) => {
            if (item === nearestValue) {
                indexes.push(index);
            }
            return indexes;
        }, []);
        return  value < nearestValue ? sameValueIndexes[0] : last(sameValueIndexes);
    } else {
        return vector.indexOf(nearestValue);
    }
}
