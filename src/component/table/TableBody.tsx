import React, { useEffect, useState } from 'react'
import RowData from './RowData.tsx'

export default function TableBody({ className, tHeadState, tBodyState }) {

    const renderTableBody = () => {
        return tBodyState.map((el ,idx) => 
        <RowData 
            key={idx} 
            className={className}
            rowState={el} 
            tHeadState={tHeadState} 
            />)
    
    }


    return (
        <div className={`${className}-body-wrapper`}>
            {renderTableBody()}
        </div>
    )
}