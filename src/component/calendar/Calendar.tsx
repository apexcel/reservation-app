import React, { useEffect, useState } from "react"
import "../../styles/calendar.scss"
import Navigation from "./Navigation.tsx";
import DayOfWeek from "./DayOfWeek.tsx";
import Weeks from "./Weeks.tsx"
import { createMonthDays } from "../../utils/dateUtils.ts"

export default function Calendar({ onDateClick }) {

    const className = "simple__calendar";
    const dateValues = createMonthDays(new Date().getFullYear(), new Date().getMonth());

    const [calendarState, setCalendarState] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        today: new Date().getDate(),
        currentDays: dateValues,
    });

    return (
        <div className={`${className}-wrapper`}>
            <div className={`${className}-year-month`}>{calendarState.year} {calendarState.month + 1}</div>
            <Navigation
                className={className}
                calendarState={calendarState}
                setCalendarState={setCalendarState}
                createMonthDays={createMonthDays}
            />
            <DayOfWeek className={className} />
            <Weeks
                className={className}
                calendarState={calendarState}
                onDateClick={onDateClick}
            />
        </div>
    )
}