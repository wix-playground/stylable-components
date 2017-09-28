export function nearest(vector: number[], value: number): number {
    return vector.sort((a, b) => (Math.abs(value - a) - Math.abs(value - b)))[0];
}
export function nearestIndex(vector: number[], value: number): number {
    return vector.indexOf(nearest(vector, value));
}
