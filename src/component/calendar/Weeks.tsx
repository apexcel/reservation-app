import React from 'react'
import Days from './Days.tsx'

export default function Weeks({ className, calendarState, onDateClick }) {
    const renderWeeks = () => {
        let weeks = [];
        let weekLength = 7;
        for (let i = 0; i < 6; i++) {
            weeks.push(calendarState.currentDays.slice(i * weekLength, (i + 1) * weekLength));
        }
        return weeks.map((el, idx) =>
            <Days
                key={idx}
                className={className}
                currentDays={el}
                onDateClick={onDateClick}
                />
        )
    }

    return (
        <>
            {renderWeeks()}
        </>
    )
}