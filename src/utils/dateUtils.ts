export function daysInMonth (year, month) {
    return 32 - new Date(year, month, 32).getDate();
}

export function createDays(year: number, month: number) {
    const ret = [];
    const days = daysInMonth(year, month);
    const newDate = new Date(year, month);
    for (let i = 0; i < days; i += 1) {
        ret.push(new Date(newDate.valueOf() + 86_400_000 * i))
    }
    return ret;
}

export function prevMonthDays(firstDate: Date) {
    const ret = [];
    const day = firstDate.getDay();
    for (let i = 0; i < day; i += 1) {
        ret.unshift(new Date(firstDate.valueOf() - 86_400_000 * (i + 1)));
    }
    return ret;
}

export function nextMonthDays(lastDate: Date) {
    const ret = [];
    const day = 6 - lastDate.getDay();
    for (let i = 1; i <= day; i += 1) {
        ret.unshift(new Date(lastDate.valueOf() + 86_400_000 * i));
    }
    return ret;
}