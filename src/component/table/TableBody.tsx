import React, { useEffect, useState } from 'react'
import RowData from './TableRow.tsx'

export default function TableBody({ 
    className, 
    tHeadState, 
    tBodyState, 
    currentDay,
    onBookingHandler }) {

    const renderTableBody = () => {
        return tBodyState.map((el ,idx) => 
        <RowData 
            key={idx} 
            index={idx}
            className={className}
            rowItem={el} 
            tHeadState={tHeadState}
            currentDay={currentDay}
            onBookingHandler={onBookingHandler}
            />)
    }

    return (
        <div className={`${className}-body-wrapper`}>
            {renderTableBody()}
        </div>
    )
}