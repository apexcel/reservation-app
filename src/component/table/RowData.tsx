import React from 'react'

export default function RowData({ className, tHeadState, tBodyState, values }) {

    const renderRow = () => {
        const fields = Object.values(values)
        return fields.map((el, idx) => 
        <div 
            key={idx} 
            className={`${className}-row-cell`}>
            {el}
        </div>)
    }

    return (
        <>
            {renderRow()}
        </>
    )
}