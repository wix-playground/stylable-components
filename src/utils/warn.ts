import {getGlobalConfig} from 'wix-react-tools';

export type Log = (condition: any, message: string, ...args: any[]) => void;
type Method = 'log' | 'warn' | 'error';

const map = new Map();
const createLogFunction = (method: Method): Log => (condition, message, ...args) => {
    if (condition || !getGlobalConfig().devMode) {
        return;
    }
    const formated = args.reduce((str, item) => str.replace(/%s/, item), message);
    console[method](new Error(formated));
};
const once = (fn: Log): Log => (condition, message, ...args) => {
    if (!condition && !map.has(message)) {
        map.set(message, true);
        fn(condition, message, ...args);
    }
};

export const warn = createLogFunction('warn');
export const error = createLogFunction('error');
export const log = createLogFunction('log');
export const warnOnce = once(warn);
export const errorOnce = once(error);
export const logOnce = once(log);
