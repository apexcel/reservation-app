import React from 'react'

export default function Navigation({
    className,
    calendarState,
    setCalendarState,
    createMonthDays,
    prevLabel = '‹',
    nextLabel = '›',
}) {

    const next = () => {
        const year = (calendarState.month === 11) ? calendarState.year + 1 : calendarState.year;
        const month = (calendarState.month + 1) % 12;
        const currentDays = createMonthDays(year, month);
        setCalendarState({
            ...calendarState,
            year: year,
            month: month,
            currentDays: currentDays,
        });
    };

    const prev = () => {
        const year = (calendarState.month === 0) ? calendarState.year - 1 : calendarState.year;
        const month = (calendarState.month === 0) ? 11 : calendarState.month - 1;
        const currentDays = createMonthDays(year, month);
        setCalendarState({
            ...calendarState,
            year: year,
            month: month,
            currentDays: currentDays,
        });
    }

    const renderButtons = () => {
        return (
            <div className={`${className}-btn-wrapper`}>
                <button
                    arai-label={prevLabel}
                    className={`${className}-arrow-btn`}
                    onClick={prev}
                    type="button" >
                    {prevLabel}
                </button>
                <button
                    arai-label={nextLabel}
                    className={`${className}-arrow-btn`}
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

