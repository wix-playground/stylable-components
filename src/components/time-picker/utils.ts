export enum Ampm {
	AM,
	PM,
	NONE
}
export type FormatPart = 'hh' | 'mm';

export const pad2 = (num: string | number): string => ('00' + num).slice(-2);
export const isNumber = (value: string) => /^\d{0,2}$/.test(value);

export const to24 = (hh: number, ampm: Ampm) => {
	if (ampm === Ampm.NONE || ampm === Ampm.AM) {
		return hh;
	}
	return hh === 12 ? 0 : (hh + 12);
}
export const toAmpm = (hh: number) => {
	if (hh < 11) {
		return {
			hh,
			ampm: Ampm.AM
		}
	} else if (hh === 12) {
		return {
			hh,
			ampm: Ampm.AM
		}
	} else {
		return {
			hh: hh % 12,
			ampm: Ampm.AM
		}
	}
}

export const isValidValue = (num: number, part: FormatPart, ampm: Ampm) => {
	if (part === 'mm') {
		return num >= 0 && num <= 59;
	}
	switch (ampm) {
		case Ampm.NONE:
			return num >= 0 && num <= 23;
		case Ampm.AM:
			return num >= 0 && num <= 12;
		case Ampm.PM:
			return num >= 0 && num <= 11;
		default:
			return false;
	}
}
