import React, { useEffect, useState } from 'react'

export default function Cal() {

    const [calendar, setCalendar] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        week: [], 
        date: ''
    })

    useEffect(() => {
        createCalendar()
    }, [])

    const createCalendar = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weeks = [];
        for (let i = 0; i < 7; i += 1) {
            const newDate = new Date(today.valueOf() + 86_400_000 * (i - today.getDay()))
            weeks.push(newDate)
        }
        setCalendar({...calendar, week: weeks})
        console.log(calendar)
    }

    const createWeekElements = calendar.week.map((val, idx) => 
            <div key={idx}>{val.getDate()}</div>
        );

    const createYearMonth = (<div>{calendar.year} {calendar.month + 1}</div>)

    return (
        <div id="calendar-wrapper">
            <h1 onClick={() => console.log(calendar)}>call</h1>
            {createYearMonth}
            {createWeekElements}
        </div>
    )
}