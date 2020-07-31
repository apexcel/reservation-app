import React, { useState } from 'react'
import {maxDateAtom, minDateAtom} from '../atoms/calendarAtoms'
import { atom, useRecoilValue } from 'recoil'

interface DateValues {
    date: Date,
    day: number,
    status: string
}

interface Day {
    className: string,
    currentDay: DateValues
    onDateClick: () => void,
}
export default function Day({ className, currentDay, onDateClick }: Day) {

    const _onDateClick = (ev) => {
        ev.preventDefault();
        onDateClick.call(this, ev, currentDay.date);
    };

    const maxDate = useRecoilValue(maxDateAtom);
    const minDate = useRecoilValue(minDateAtom)

    const renderDay = () => {
        let adjacent = false;
        let today = false;
        let sat = false;
        let sun = false;
        if (currentDay.date > maxDate || currentDay.date < minDate) {
            // Empty character used
            return (<div className={`
            ${className}-date-cell transparent`}>&#10240;</div>);
        }
        if (currentDay.status !== "current") {
            adjacent = true;
        }
        if (currentDay.date.getDate() === new Date().getDate() &&
            currentDay.date.getFullYear() === new Date().getFullYear() &&
            currentDay.date.getMonth() === new Date().getMonth()) {
            today = true;
        }
        if (currentDay.day === 0) {
            sun = true;
        }
        if (currentDay.day === 6) {
            sat = true;
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