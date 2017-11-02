const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
];

export function getDayNames(startingDay: number = 0): string[] {
    const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    for (let i = startingDay; i > 0; i--) {
        dayNames.push(dayNames.shift()!);
    }

    return dayNames;
}

export function getMonthNames(): string[] {
    return monthNames;
}

export function getMonthFromOffset(date: Date, offset: number): Date {
    return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export function getDaysInMonth(date: Date): number {
    // Important: the '0' in the day category "rolls back" the daysArray to the start of the previous month
    // so we add a month to the daysArray in order to get the number of days for the intended month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getLastDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
}

export function getNumOfPreviousDays(date: Date, startingDay: number = 0): number {
    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    const previousDays: number = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() - startingDay) + 7;
    return previousDays > 6 ? previousDays - 7 : previousDays;
}

export function getNumOfFollowingDays(date: Date, startingDay: number = 0): number {
    const followingDays = (6 - getLastDayOfMonth(date)) + startingDay;
    return followingDays > 6 ? followingDays - 7 : followingDays;
}

export function changeDayInMonth(date: Date, dayToSet: number): Date {
    const dateToReturn = new Date(date.getFullYear(), date.getMonth());
    dateToReturn.setDate(dayToSet);
    return dateToReturn;
}

export function isWeekend(date: Date): boolean {
    // Returns true if Saturday or Sunday... need to add localization
    return date.getDay() === 6 || date.getDay() === 0;
}
