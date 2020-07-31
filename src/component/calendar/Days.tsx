import React from 'react'
import Day from './Day.tsx'

type Days = {
    className: string,
    currentDays: Array<Date>,
    onDateClick: Function,
}

export default function Days({
    className,
    currentDays,
    onDateClick,
}: Days) {

    const renderDays = () => {
        return currentDays.map((el, idx) =>
            <Day
                key={idx}
                currentDay={el}
                className={className}
                onDateClick={onDateClick}
            />
        );
    };

    return (
        <div className={`${className}-body`}>
            {renderDays()}
        </div>
    )
}