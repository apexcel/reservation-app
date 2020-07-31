import React from 'react'

export default function DayOfWeek({ className }) {

    const renderDayOfWeek = () => {
        const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const dows = dow.map((el, idx) =>
            <div key={idx} className={`${className}-date`}>{el}</div>
        )
        return dows;
    }

    return (
        <div className={`${className}-date-wrapper`}>
            {renderDayOfWeek()}
        </div>
    )
}