import React, { useEffect, useState } from 'react'
import RowData from './TableRow.tsx'

export default function TableBody({ 
    className, 
    tHeadState, 
    tBodyState, 
    onTableRowClick }) {

    const renderTableBody = () => {
        return tBodyState.map((el ,idx) => 
        <RowData 
            key={idx} 
            index={idx}
            className={className}
            rowItem={el} 
            tHeadState={tHeadState}
            onTableRowClick={onTableRowClick}
            />)
    }

    return (
        <div className={`${className}-body-wrapper`}>
            {renderTableBody()}
        </div>
    )
}