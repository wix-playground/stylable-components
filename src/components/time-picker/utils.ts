export enum Ampm {
    AM,
    PM,
    NONE
}
export type FormatPart = 'hh' | 'mm';

export const pad2 = (num: string | number): string => ('00' + num).slice(-2);
export const isNumber = (value: string) => /^\d{0,2}$/.test(value);

export const to24 = (hh: number, ampm: Ampm) => {
    switch (ampm) {
        case Ampm.NONE:
            return hh;
        case Ampm.AM:
            return hh === 12 ? 0 : hh;
        case Ampm.PM:
            return hh === 12 ? hh : (hh + 12);
    }
};

export const toAmpm = (hh: number): {hh: number, ampm: Ampm} => {
    let ampm: Ampm;
    if (hh < 12) {
        hh = hh === 0 ? 12 : hh;
        ampm = Ampm.AM;
    } else {
        hh = hh === 12 ? hh : (hh % 12);
        ampm = Ampm.PM;
    }
    return {hh, ampm};
};

export const isValidValue = (num: number, part: FormatPart, ampm: Ampm) => {
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
};
