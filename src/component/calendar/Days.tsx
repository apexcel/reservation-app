import React from 'react'

export default function Days({ className, calendarState }) {

    const createDays = () => {
        const firstDayOfWeek = new Date(calendarState.year, calendarState.month)
        console.log(firstDayOfWeek)
        return (
            <div>{firstDayOfWeek.getDate()}</div>
        )
    }

    return (
        <>
        {createDays()}
        </>
    )
}