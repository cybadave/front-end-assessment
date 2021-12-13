const MS_PER_DAY = 8.64e7;
const MS_PER_HOUR = 3.6e6;
const DAYS_IN_WEEK = 7;
const WEEKEND_DAYS_IN_WEEK = 2;
const SHORT_STAY_BILLING_START_HOUR = 8;
const SHORT_STAY_BILLING_END_HOUR = 18;

const getDaysBetweenDates = (start: Date, end: Date) => {
    const from = new Date(start);
    const to = new Date(end);
    from.setHours(12, 0, 0);
    to.setHours(12, 0, 0);
    return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

const getWeekDaysBetweenDates = (d0: Date, d1: Date) => {
    const days = getDaysBetweenDates(d0, d1);
    const minimumWeekendCount = Math.floor(days / DAYS_IN_WEEK) * WEEKEND_DAYS_IN_WEEK;
    const daysToCheck = days % 7;
    return days - minimumWeekendCount - countWeekendDaysInNDaysFromDate(d0, daysToCheck);
}

const isWeekend = (date: Date) =>
    [0, 6].includes(date.getDay());

const areDatesTheSameDay = (from: Date, to: Date): boolean => {
    return from.getFullYear() === to.getFullYear() && from.getMonth() === to.getMonth() && from.getDay() == to.getDay();
}

const countWeekendDaysInNDaysFromDate = (start: Date, days: number): number => {
    const msPerDay = 8.64e7;
    let from = new Date(start);
    let count = 0;
    for (let i = 0; i < days; i++) {
        if (isWeekend(from)) count++;
        from = new Date(from.getTime() + msPerDay);
    }
    return count
}

const getBillableHoursFromStartDateTimeExclusive = (from: Date) => {
    const to = new Date(from);
    const start = new Date(from);
    if (start.getHours() < SHORT_STAY_BILLING_START_HOUR) {
        start.setHours(SHORT_STAY_BILLING_START_HOUR);
        start.setMinutes(0);
        start.setSeconds(0);
    }
    to.setHours(SHORT_STAY_BILLING_END_HOUR);
    to.setMinutes(0);
    to.setSeconds(0);
    if (from.getHours() >= 18) return 0;
    return (from.getHours() <= SHORT_STAY_BILLING_START_HOUR) ?
        10
        :
        Math.abs(to.getTime() - start.getTime()) / MS_PER_HOUR;
}


const getBillableHoursFromEndDateTimeExclusive = (from: Date) => {
    const to = new Date(from);
    to.setHours(SHORT_STAY_BILLING_START_HOUR);
    to.setMinutes(0);
    to.setSeconds(0);
    if (from.getHours() < SHORT_STAY_BILLING_START_HOUR) return 0;
    return (from.getHours() >= SHORT_STAY_BILLING_END_HOUR) ?
        10 :
        Math.abs(to.getTime() - from.getTime()) / MS_PER_HOUR;
}


const getBillableHoursSameDay = (start: Date, end: Date) => {
    if (isWeekend(start)) return 0;
    const from = new Date(start);
    const to = new Date(end);
    if (from.getHours() < SHORT_STAY_BILLING_START_HOUR) {
        from.setHours(SHORT_STAY_BILLING_START_HOUR);
        from.setMinutes(0);
        from.setSeconds(0);
    }
    if (to.getHours() > SHORT_STAY_BILLING_END_HOUR) {
        to.setHours(SHORT_STAY_BILLING_END_HOUR);
        to.setMinutes(0);
        to.setSeconds(0);
    }
    return Math.abs(to.getTime() - from.getTime()) / MS_PER_HOUR;
};

const calculateLongStayUnits = (start: Date, end: Date): number =>
    getDaysBetweenDates(start, end) + 1;

const calculateShortStayUnits = (start: Date, end: Date): number => {
    const MAX_UNITS_PER_DAY = 10;
    const full_days = getWeekDaysBetweenDates(start, end) - 1;
    const first_day_units = isWeekend(start) ? 0 : getBillableHoursFromStartDateTimeExclusive(start);
    const last_day_units = isWeekend(end) ? 0 : getBillableHoursFromEndDateTimeExclusive(end);
    return (areDatesTheSameDay(start, end)) ? getBillableHoursSameDay(start, end)
        : (full_days * MAX_UNITS_PER_DAY + first_day_units + last_day_units);
}

export const calculateLongStay = (start: Date, end: Date): number => {
    const COST_PER_UNIT = 750;
    const units = calculateLongStayUnits(start, end);
    return Math.floor(units * COST_PER_UNIT);
};

export const calculateShortStay = (start: Date, end: Date): number => {
    const COST_PER_UNIT = 110;
    const units = calculateShortStayUnits(start, end);
    return Math.floor(units * COST_PER_UNIT);
};
