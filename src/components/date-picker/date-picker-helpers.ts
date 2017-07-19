export function getDayNames (firstDay: number = 0, nameLength: string = 'short', locale: string = 'en-US'): Array<string> {
    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    const listOfDayNames: Array<string> = [];

    for (let i = 0; i < 7; i++) {
        let dayName = new Date(1970, 5, i + firstDay).toLocaleString(locale, { weekday: nameLength });
        listOfDayNames.push(dayName);
    }

    return listOfDayNames;
}

export function getMonthNames (locale: string = 'en-US'): Array<string> {
    const listOfMonthNames: Array<string> = [];
    for (let i = 0; i < 12; i++) {
        let monthName = new Date(1970, i, 1).toLocaleString(locale, { month: 'long' });
        listOfMonthNames.push(monthName);
    }
    return listOfMonthNames;
}

export function getMonthFromOffset (date: Date, offset: number): Date {
    return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export function getDaysInMonth (date: Date): number {
    // Important: the '0' in the day category "rolls back" the daysArray to the start of the previous month
    // so we add a month to the daysArray in order to get the number of days for the intended month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getLastDayOfMonth (date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
}

export function getNumOfPreviousDays (date: Date, firstDay: number = 0): number {
    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    const previousDays: number = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() - firstDay) + 7;
    return previousDays > 6 ? previousDays - 7 : previousDays;
}

export function getNumOfFollowingDays (date: Date, firstDay: number = 0): number {
    const followingDays = (6 - getLastDayOfMonth(date)) + firstDay;
    return followingDays > 6 ? followingDays - 7 : followingDays;
}
