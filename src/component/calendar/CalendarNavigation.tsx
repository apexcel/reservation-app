import React from 'react'
import { prevMonthDays } from '../../utils/dateUtils.ts'


export default function CalendarNavigation({
    className,
    calendarState,
    setCalendarState,
    createCalendar,
    createDays,
    prevLabel = '‹',
    nextLabel = '›',
}) {

    const next = () => {
        const year = (calendarState.month === 11) ? calendarState.year + 1 : calendarState.year;
        const month = (calendarState.month + 1) % 12;
        const days = createDays(year, month);
        const prevDays = prevMonthDays(days[0]);
        setCalendarState({
            ...calendarState,
            year: year,
            month: month,
            days: days,
            prevDays: prevDays
        });
    };

    const prev = () => {
        const year = (calendarState.month === 0) ? calendarState.year - 1 : calendarState.year;
        const month = (calendarState.month === 0) ? 11 : calendarState.month - 1;
        const days = createDays(year, month);
        const prevDays = prevMonthDays(days[0]);
        setCalendarState({
            ...calendarState,
            year: year,
            month: month,
            days: days,
            prevDays: prevDays
        });
    }

    const renderButtons = () => {
        return (
            <div>
                <button
                    arai-label={prevLabel}
                    className={`${className}-arrow-prevBtn`}
                    onClick={prev}
                    type="button" >
                    {prevLabel}
                </button>
                <button
                    arai-label={nextLabel}
                    className={`${className}-arrow-nextBtn`}
                    onClick={next}
                    type="button" >
                    {nextLabel}
                </button>
            </div>
        )
    }

    return (
        <>
            {renderButtons()}
        </>
    )
}

