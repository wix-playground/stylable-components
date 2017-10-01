export declare function omit<T extends {
    [key: string]: any;
}>(obj: T, ...skip: string[]): Partial<T>;
