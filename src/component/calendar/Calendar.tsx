import React, { useEffect, useState } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { maxDateAtom, minDateAtom } from '../atoms/dateAtoms'
import Navigation from "./Navigation.tsx";
import DayOfWeek from "./DayOfWeek.tsx";
import Weeks from "./Weeks.tsx"
import { createMonthDays } from "../../utils/dateUtils.ts"

import "../../styles/calendar.scss"

interface Calendar {
    onDateClick: () => void,
    maxDate: Date,
    minDate: Date,
    dateRange: { start: Date, end: Date }
}
// TODO: 최대 기간 최소 기간 설정 가능하게 만들기
// TODO: 사용불가한 기간 만들기
export default function Calendar({ onDateClick, maxDate, minDate, }: Calendar) {

    const className = "simple__calendar";
    const dateValues = createMonthDays(new Date().getFullYear(), new Date().getMonth());

    const [maxDateState, setMaxDateState] = useRecoilState(maxDateAtom);
    const [minDateState, setMinDateState] = useRecoilState(minDateAtom);
    useEffect(() => {
        setMaxDateState(maxDate)
        setMinDateState(minDate)
    }, [])

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