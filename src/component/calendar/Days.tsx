import React from 'react'

export default function Days({ 
    className, 
    calendarState, 
    days }) {

    const renderDays = () => {
        return days.map((el, idx) => 
            <div key={idx} className={`${className}-date-cell`}>{el.getDate()}</div>
        )
    };

    return (
        <div className={`${className}-body`}>
            {renderDays()}
        </div>
    )
}