import { atom, selector } from 'recoil'
import { createMonthDays } from "../../utils/dateUtils.ts"

export const maxDateAtom = atom({
    key: 'maxDateAtom',
    default: null
})

export const minDateAtom = atom({
    key: 'minDateAtom',
    default: null
})

export const dateRangeAtom = atom({
    key: 'dateRangeAtom',
    default: {
        start: null,
        end: null
    }
})

export const calendarStateAtom = atom({
    key: 'calendarStateAtom',
    default: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        today: new Date().getDate(),
        currentDays: createMonthDays(new Date().getFullYear(), new Date().getMonth()),
    }
})

export const nextMonthSelector = selector({
    key: 'nextMonthSelector',
    get: ({ get }) => {
        const calendarState = get(calendarStateAtom);
        const year = (calendarState.month === 11) ? calendarState.year + 1 : calendarState.year;
        const month = (calendarState.month + 1) % 12;
        const currentDays = createMonthDays(year, month);
        return {
            ...calendarState,
            year: year,
            month: month,
            currentDays: currentDays,
        };
    }
})

export const prevMonthSelector = selector({
    key: 'prevMonthSelector',
    get: ({ get }) => {
        const calendarState = get(calendarStateAtom);
        const year = (calendarState.month === 0) ? calendarState.year - 1 : calendarState.year;
        const month = (calendarState.month === 0) ? 11 : calendarState.month - 1;
        const currentDays = createMonthDays(year, month);
        return {
            ...calendarState,
            year: year,
            month: month,
            currentDays: currentDays,
        };
    }
})