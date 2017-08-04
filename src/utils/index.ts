export function noop() {}

export function isNumber(value: any): value is number {
    return typeof value == 'number';
}
