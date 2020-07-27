import React, { useState } from 'react'
import Modal from '../modal/Modal.tsx'
interface DateValues {
    date: Date,
    day: number,
    status: string
}

interface Day {
    className: string,
    currentDay: DateValues
    onDateClick: (Function) => void,
}
export default function Day({ className, currentDay, onDateClick }: Day) {

    const [show, setShow] = useState(false);

    const open = () => {
        setShow(true);
    }

    const close = () => {
        setShow(false);
    }

    const _onDateClick = (ev) => {
        onDateClick.call(this, ev, currentDay.date);
        open();
    };

    const renderDay = () => {
        let adjacent = false;
        let today = false;
        let sat = false;
        let sun = false;
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
            <Modal show={show} close={close} currentDay={currentDay}/>
        </>
    )
}