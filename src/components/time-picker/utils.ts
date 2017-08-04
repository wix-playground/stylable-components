export enum Ampm {am, pm}
export type FormatPart = 'hh' | 'mm' | 'ss';

export const pad2 = (num: string | number): string => ('00' + num).slice(-2);
export const isNumber = (value: string) => /^\d{0,2}$/.test(value);

export const to24 = (hh: number, ampm: Ampm | null) => {
	if (ampm === null || ampm === Ampm.am) {
		return hh;
	}
	return hh === 12 ? 0 : (hh + 12);
}
export const toAmpm = (hh: number) => {
	if (hh < 11) {
		return {
			hh,
			ampm: Ampm.am
		}
	} else if (hh === 12) {
		return {
			hh,
			ampm: Ampm.pm
		}
	} else {
		return {
			hh: hh % 12,
			ampm: Ampm.pm
		}
	}
}

export const isValidValue = (num: number, part: FormatPart, use12: boolean) => {
	switch (part) {
		case 'hh':
			return num >= 0 && num <= (use12 ? 12 : 23);
		case 'mm':
		case 'ss':
			return num >= 0 && num <= 59;
	}
}
