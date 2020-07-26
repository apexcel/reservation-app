import React from 'react'

export default function Day({ className, day }) {

    const onDateClick = (ev) => {
        ev.preventDefault();
        console.log(day.date)
    }

    const renderDay = () => {
        let adjacent = false;
        let today = false;
        let sat = false;
        let sun = false;
        if (day.status !== "current") {
            adjacent = true;
        }
        if (day.date.getDate() === new Date().getDate() &&
            day.date.getFullYear() === new Date().getFullYear() &&
            day.date.getMonth() === new Date().getMonth()) {
            today = true;
        }
        if (day.day === 0) {
            sun = true;
        }
        if (day.day === 6) {
            sat = true;
        }
        return <div 
            onClick={onDateClick} 
            className={`
                ${className}-date-cell 
                ${adjacent ? "adjacent" : null}
                ${sat ? "sat" : null}
                ${sun ? "sun" : null}
                ${today ? "today" : null}
                `}>
                {day.date.getDate()}
            </div>
    }

    return (
        <>
            {renderDay()}
        </>
    )
}