export declare type Log = (message: string, ...args: any[]) => void;
export declare const createLogger: () => {
    [key: string]: Log;
};
export declare const warn: Log, error: Log, warnOnce: Log, errorOnce: Log;
