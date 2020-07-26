import React from 'react'
import Day from './Day.tsx'

type Days = {
    className: string,
    days: Array<Date>
}

export default function Days({ 
    className, 
    days }: Days) {

    const renderDays = () => {
        return days.map((el, idx) => 
        <Day key={idx} day={el} className={className} />
    );
    };

    return (
        <div className={`${className}-body`}>
            {renderDays()}
        </div>
    )
}