import {getGlobalConfig} from 'wix-react-tools';
export type Log = (message: string, ...args: any[]) => void;
type Method = 'log' | 'warn' | 'error';

const createLogFunction = (method: Method): Log => (message, ...args) => {
    if (!getGlobalConfig().devMode) {
        return;
    }
    const formated = args.reduce((str, item) => str.replace(/%s/, item), message);
    console[method](new Error(formated));
};
const once = (fn: Log, set: Set<string>): Log => (message, ...args) => {
    if (!set.has(message)) {
        set.add(message);
        fn(message, ...args);
    }
};

export const createLogger = () => {
    const set = new Set();
    const result: {
        [key: string]: Log
    } = {};
    return ['warn', 'error'].reduce((obj, method: Method) => {
        const fn = createLogFunction(method);
        obj[method] = fn;
        obj[`${method}Once`] = once(fn, set);
        return obj;
    }, result);
};

export const {warn, error, warnOnce, errorOnce} = createLogger();
