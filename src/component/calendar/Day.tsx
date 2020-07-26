import React from 'react'

export default function Day({ className, day }) {

    const onDateClick = (ev) => {
        ev.preventDefault();
        console.log(day);
    }

    const renderDay = () => {
        if (day.getDay() === 0) {
            return <div onClick={onDateClick} className={`${className}-date-cell sun`}>{day.getDate()}</div>
        }
        if (day.getDay() === 6) {
            return <div onClick={onDateClick} className={`${className}-date-cell sat`}>{day.getDate()}</div>
        }
        return <div onClick={onDateClick} className={`${className}-date-cell`}>{day.getDate()}</div>
    }

    return (
        <>
            {renderDay()}
        </>
    )
}