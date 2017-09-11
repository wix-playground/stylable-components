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
const once = (fn: Log, map: Map<string, boolean>): Log => (condition, message, ...args) => {
    if (!condition && !map.has(message)) {
        map.set(message, true);
        fn(condition, message, ...args);
    }
};

export const createLogger = () => {
    const map = new Map();
    const result: {
        [key: string]: Log
    } = {};
    return ['log', 'warn', 'error'].reduce((obj, method: Method) => {
        const fn = createLogFunction(method);
        obj[method] = fn;
        obj[method + 'Once'] = once(fn, map);
        return obj;
    }, result);
};

export const {log, warn, error, logOnce, warnOnce, errorOnce} = createLogger();
