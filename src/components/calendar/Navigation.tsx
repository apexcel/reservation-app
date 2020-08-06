import React from 'react'
import { useRecoilValue } from 'recoil'
import { nextMonthSelector, prevMonthSelector  } from '../../atoms/calendarAtoms.ts'

interface NavigationProps {
    className: string,
    setCalendarState: (adjacentMonth) => void,
    prevLabel: string,
    nextLabel: string
}

export default function Navigation({
    className,
    setCalendarState,
    prevLabel = '‹',
    nextLabel = '›',
}: NavigationProps) {

    const nextMonth = useRecoilValue(nextMonthSelector);
    const prevMonth = useRecoilValue(prevMonthSelector);

    const next = () => setCalendarState(nextMonth);
    const prev = () => setCalendarState(prevMonth);

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

