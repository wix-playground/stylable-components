export function objectsShallowEqual(a: {[index: string]: any}, b: {[index: string]: any}) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    return (aKeys.length === bKeys.length) ? aKeys.every(k => a[k] === b[k]) : false;
}
