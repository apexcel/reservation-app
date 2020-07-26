import React, { useEffect, useState } from "react"
import "../../styles/calendar.scss"
import Navigation from "./Navigation.tsx";
import DayOfWeek from "./DayOfWeek.tsx";
import Days from "./Days.tsx";
import Weeks from "./Weeks.tsx"
import { createMonthDays } from "../../utils/dateUtils.ts"

export default function Calendar() {

    const className = "simple_calendar";
    const days = createMonthDays(new Date().getFullYear(), new Date().getMonth());

    const [calendarState, setCalendarState] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        today: new Date().getDate(),
        currentDays: days,
    });

    useEffect(() => {
    }, [calendarState])

    return (
        <div id="calendar-wrapper" className="calendar-wrapper">
            <div className="calendar-year-month">{calendarState.year} {calendarState.month + 1}</div>
            <Navigation
                className={className}
                calendarState={calendarState}
                setCalendarState={setCalendarState}
                createMonthDays={createMonthDays}
            />
            <DayOfWeek className={className} />
            <div id="calendar-body" className="calendar-body">
                <Weeks
                    className={className}
                    calendarState={calendarState}
                />
            </div>
        </div>
    )
}