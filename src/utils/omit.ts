export function omit<T extends {[key: string]: any}>(obj: T, ...skip: Array<keyof T>): Partial<T> {
    return Object.keys(obj).reduce<Partial<T>>((acc, key) => {
        if (skip.indexOf(key) === -1) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
