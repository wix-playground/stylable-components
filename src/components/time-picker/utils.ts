export enum Ampm {
    AM,
    PM,
    NONE
}
export type TimeSegment = 'hh' | 'mm';
export type Format = 'ampm' | '24h';
export type Segment = TimeSegment | 'ampm';

export const isTouch = typeof window === 'object' && 'orientation' in window;
export const is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
export const validInputStringRE = /^(\d{1,2}):(\d{1,2})(?:\s(AM|PM))?$/;
export const ampmLabels = {
    [Ampm.AM]: 'AM',
    [Ampm.PM]: 'PM',
    [Ampm.NONE]: ''
};

export const selectionIndexes = {
    hh: [0, 2],
    mm: [3, 5],
    ampm: [6, 8]
};

export function formatTimeChunk(num: string | number): string {
    return ('00' + num).slice(-2);
}

export function isTimeSegment(arg: any): arg is TimeSegment {
    return arg === 'hh' || arg === 'mm';
}

export function to24(hh: number, ampm: Ampm): number {
    switch (ampm) {
        case Ampm.NONE:
            return hh;
        case Ampm.AM:
            return hh === 12 ? 0 : hh;
        case Ampm.PM:
            return hh === 12 ? hh : (hh + 12);
    }
}

export function toAmpm(hh: number): {hh: number, ampm: Ampm} {
    let ampm: Ampm;
    if (hh < 12) {
        hh = hh === 0 ? 12 : hh;
        ampm = Ampm.AM;
    } else {
        hh = hh === 12 ? hh : (hh % 12);
        ampm = Ampm.PM;
    }
    return {hh, ampm};
}

export function isValidValue(num: number, part: TimeSegment, ampm: Ampm): boolean {
    if (part === 'mm') {
        return num >= 0 && num <= 59;
    }
    switch (ampm) {
        case Ampm.NONE:
            return num >= 0 && num <= 23;
        case Ampm.AM:
        case Ampm.PM:
            return num >= 1 && num <= 12;
    }
}
