export function daysInMonth (year, month) {
    return 32 - new Date(year, month, 32).getDate();
}

export function createDays(year: number, month: number) {
    const ret = [];
    const days = daysInMonth(year, month);
    const newDate = new Date(year, month);
    for (let i = 0; i < days; i += 1) {
        const value = new Date(newDate.valueOf() + 86_400_000 * i);
        ret[i] = {
            date: value,
            day: value.getDay(),
            status: "current"
            };
    }
    return ret;
}

export function prevMonthDays(firstDate) {
    const ret = [];
    const day = firstDate.date.getDay();
    for (let i = 0; i < day; i += 1) {
        const value = new Date(firstDate.date.valueOf() - 86_400_000 * (i + 1));
        ret.unshift({
            date: value,
            day: value.getDay(),
            status: "prev"
        });
    }
    return ret;
}

export function nextMonthDays(lastDate) {
    const ret = [];
    let day = 12 + lastDate.day;
    for (let i = 0; i <= day; i += 1) {
        const value = new Date(lastDate.date.valueOf() + 86_400_000 * (i + 1));
        ret[i] = {
            date: value,
            day: value.getDay(),
            status: "next"
        };
    }
    return ret;
}

export function createMonthDays(year: number, month: number) {
    const currentDays = createDays(year, month);
    const prevDays = prevMonthDays(currentDays[0]);
    const nextDays = nextMonthDays(currentDays[currentDays.length - 1]);
    return [].concat(prevDays, currentDays, nextDays);
}