export enum Ampm {
    AM,
    PM,
    NONE
}
export type TimePart = 'hh' | 'mm';
export type Format = 'ampm' | '24h';

export function pad2(num: string | number): string {
    return ('00' + num).slice(-2);
}

export function isNumber(value: string) {
    return /^\d{0,2}$/.test(value);
}

export function isTimePart(arg: any): arg is TimePart {
    return arg === 'hh' || arg === 'mm';
}

export function to24(hh: number, ampm: Ampm) {
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

export function isValidValue(num: number, part: TimePart, ampm: Ampm) {
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
