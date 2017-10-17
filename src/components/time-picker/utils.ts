import {isTouch} from '../../utils';

export type Ampm = 'am' | 'pm' | 'none';
export type TimeSegment = 'hh' | 'mm';
export type Format = 'ampm' | '24h';
export type Segment = TimeSegment | 'ampm';

export const isTouchTimeInputSupported = (() => {
    if (!isTouch) {
        return false;
    }
    const input = document.createElement('input');
    input.type = 'time';
    return input.type === 'time';
})();

export const is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
export const ampmLabels: {
    [key: string]: string
} = {
    am: 'AM',
    pm: 'PM',
    ampm: ''
};

export function formatTimeChunk(num: string | number): string {
    return ('00' + num).slice(-2);
}

export function isTimeSegment(arg: any): arg is TimeSegment {
    return arg === 'hh' || arg === 'mm';
}

export function to24(hh: number, ampm: Ampm): number {
    switch (ampm) {
        case 'none':
            return hh;
        case 'am':
            return hh === 12 ? 0 : hh;
        case 'pm':
            return hh === 12 ? hh : (hh + 12);
    }
}

export function toAmpm(hh: number): {hh: number, ampm: Ampm} {
    let ampm: Ampm;
    if (hh < 12) {
        hh = hh === 0 ? 12 : hh;
        ampm = 'am';
    } else {
        hh = hh === 12 ? hh : (hh % 12);
        ampm = 'pm';
    }
    return {hh, ampm};
}

export function isValidValue(num: number, part: TimeSegment, ampm: Ampm): boolean {
    if (part === 'mm') {
        return num >= 0 && num <= 59;
    }
    switch (ampm) {
        case 'none':
            return num >= 0 && num <= 23;
        case 'am':
        case 'pm':
            return num >= 1 && num <= 12;
    }
}
