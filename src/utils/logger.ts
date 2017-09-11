import {getGlobalConfig} from 'wix-react-tools';
export type Log = (condition: any, message: string, ...args: any[]) => void;
type Method = 'log' | 'warn' | 'error';

const createLogFunction = (method: Method): Log => (condition, message, ...args) => {
    if (condition || !getGlobalConfig().devMode) {
        return;
    }
    const formated = args.reduce((str, item) => str.replace(/%s/, item), message);
    console[method](new Error(formated));
};
const once = (fn: Log, set: Set<string>): Log => (condition, message, ...args) => {
    if (!condition && !set.has(message)) {
        set.add(message);
        fn(condition, message, ...args);
    }
};

export const createLogger = () => {
    const set = new Set();
    const result: {
        [key: string]: Log
    } = {};
    return ['log', 'warn', 'error'].reduce((obj, method: Method) => {
        const fn = createLogFunction(method);
        obj[method] = fn;
        obj[method + 'Once'] = once(fn, set);
        return obj;
    }, result);
};

export const {log, warn, error, logOnce, warnOnce, errorOnce} = createLogger();
