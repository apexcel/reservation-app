import React, { useState } from 'react'
import { maxDateAtom, minDateAtom } from '../atoms/calendarAtoms.ts'
import { atom, useRecoilValue } from 'recoil'

interface DateValues {
    date: Date,
    day: number,
    status: string
}

interface DayProps {
    className: string,
    currentDay: DateValues
    onDateClick: () => void,
}
export default function Day({
    className,
    currentDay,
    onDateClick }: DayProps) {

    const _onDateClick = (ev) => {
        ev.preventDefault();
        onDateClick.call(this, ev, currentDay.date);
    };

    const maxDate = useRecoilValue(maxDateAtom);
    const minDate = useRecoilValue(minDateAtom)

    const renderDay = () => {
        let adjacent = currentDay.status !== "current" ? true : false;
        let today = false;
        let sat = currentDay.day === 6 ? true : false;
        let sun = currentDay.day === 0 ? true : false;

        if (maxDate && currentDay.date > maxDate) {
            return (<div className={`
                ${className}-date-cell transparent`}>&#10240;</div>);
        }

        if (minDate && currentDay.date < minDate) {
            return (<div className={`
            ${className}-date-cell transparent`}>&#10240;</div>);
        }

        if (currentDay.date.getDate() === new Date().getDate() &&
            currentDay.date.getFullYear() === new Date().getFullYear() &&
            currentDay.date.getMonth() === new Date().getMonth()) {
            today = true;
        }


        return <div
            onClick={_onDateClick}
            className={`
                ${className}-date-cell 
                ${adjacent ? "adjacent" : null}
                ${sat ? "sat" : null}
                ${sun ? "sun" : null}
                ${today ? "today" : null}
                `}>
            {currentDay.date.getDate()}
        </div>
    }

    return (
        <>
            {renderDay()}
        </>
    )
}