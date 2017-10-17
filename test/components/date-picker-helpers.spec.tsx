import {expect} from 'test-drive-react';
import {
    getDaysInMonth,
    getMonthFromOffset,
    getNumOfFollowingDays,
    getNumOfPreviousDays
} from '../../src/utils';

describe('The Helper Functions', () => {
    it('getMonthFromOffset should return the next month when the second argument is 1', () => {
        const date = new Date('Mar 6 2017');
        const nextMonth = getMonthFromOffset(date, 1);

        expect(nextMonth.getMonth()).to.equal(date.getMonth() + 1);
    });

    it('getMonthFromOffset should return the previous month when the second argument is -1', () => {
        const date = new Date('Mar 6 2017');
        const nextMonth = getMonthFromOffset(date, -1);

        expect(nextMonth.getMonth()).to.equal(date.getMonth() - 1);
    });

    it('getMonthFromOffset should handle the year changing when moving forward a month', () => {
        const date = new Date('Dec 6 2016');
        const nextMonth = getMonthFromOffset(date, 1);

        expect(nextMonth.getFullYear()).to.equal(date.getFullYear() + 1);
        expect(nextMonth.getMonth()).to.equal(0);
    });

    it('getMonthFromOffset should handle the year changing when moving back a month', () => {
        const date = new Date('Jan 6 2018');
        const nextMonth = getMonthFromOffset(date, -1);

        expect(nextMonth.getFullYear()).to.equal(date.getFullYear() - 1);
        expect(nextMonth.getMonth()).to.equal(11);
    });

    it('getDaysInMonth should return the number of days in a given month', () => {
        expect(getDaysInMonth(new Date('Feb 18 2017'))).to.equal(28);
        expect(getDaysInMonth(new Date('Jun 5 2016'))).to.equal(30);
        expect(getDaysInMonth(new Date('Jan 28, 2017'))).to.equal(31);
    });

    it('getNumOfPreviousDays should return the number of days to display for the previous month', () => {
        // Sunday is the default starting day
        expect(getNumOfPreviousDays(new Date('Feb 18 2017'))).to.equal(3);
        expect(getNumOfPreviousDays(new Date('Jun 5 2017'))).to.equal(4);
        expect(getNumOfPreviousDays(new Date('July 5 2017'))).to.equal(6);
        expect(getNumOfPreviousDays(new Date('September 5 2019'))).to.equal(0);
    });

    it('getNumOfPreviousDays should handle starting on different days of the week', () => {
        const dateToTest = new Date('July 5 2017');
        const secondDateToTest = new Date('September 5 2017');
        const thirdDateToTest = new Date('October 5 2017');
        const fourthDateToTest = new Date('August 5 2019');

        expect(getNumOfPreviousDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
        expect(getNumOfPreviousDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(4);
        expect(getNumOfPreviousDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
        expect(getNumOfPreviousDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
        expect(getNumOfPreviousDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(1);
        expect(getNumOfPreviousDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(0);

        expect(getNumOfPreviousDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(4);
        expect(getNumOfPreviousDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(3);
        expect(getNumOfPreviousDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(2);
        expect(getNumOfPreviousDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
        expect(getNumOfPreviousDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(0);
        expect(getNumOfPreviousDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);

        expect(getNumOfPreviousDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
        expect(getNumOfPreviousDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(5);
        expect(getNumOfPreviousDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(4);
        expect(getNumOfPreviousDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(3);
        expect(getNumOfPreviousDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
        expect(getNumOfPreviousDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(1);

        expect(getNumOfPreviousDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(3);
        expect(getNumOfPreviousDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
        expect(getNumOfPreviousDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
        expect(getNumOfPreviousDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(0);
        expect(getNumOfPreviousDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(6);
        expect(getNumOfPreviousDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(5);
    });

    it('getNumOfFollowingDays should return the number of days to display for the next month', () => {
        // Sunday is the default starting day
        expect(getNumOfFollowingDays(new Date('Feb 18 2017'))).to.equal(4);
        expect(getNumOfFollowingDays(new Date('Jun 5 2017'))).to.equal(1);
        expect(getNumOfFollowingDays(new Date('July 5 2017'))).to.equal(5);
        expect(getNumOfFollowingDays(new Date('September 5 2019'))).to.equal(5);
    });

    it('getNumOfFollowingDays should handle starting on different days of the week', () => {
        const dateToTest = new Date('July 5 2017');
        const secondDateToTest = new Date('September 5 2017');
        const thirdDateToTest = new Date('October 5 2017');
        const fourthDateToTest = new Date('August 5 2019');

        expect(getNumOfFollowingDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
        expect(getNumOfFollowingDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(0);
        expect(getNumOfFollowingDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
        expect(getNumOfFollowingDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
        expect(getNumOfFollowingDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(3);
        expect(getNumOfFollowingDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(4);

        expect(getNumOfFollowingDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
        expect(getNumOfFollowingDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
        expect(getNumOfFollowingDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
        expect(getNumOfFollowingDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
        expect(getNumOfFollowingDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
        expect(getNumOfFollowingDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);

        expect(getNumOfFollowingDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
        expect(getNumOfFollowingDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(6);
        expect(getNumOfFollowingDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(0);
        expect(getNumOfFollowingDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
        expect(getNumOfFollowingDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
        expect(getNumOfFollowingDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(3);

        expect(getNumOfFollowingDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
        expect(getNumOfFollowingDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
        expect(getNumOfFollowingDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
        expect(getNumOfFollowingDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
        expect(getNumOfFollowingDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
        expect(getNumOfFollowingDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);
    });
});
