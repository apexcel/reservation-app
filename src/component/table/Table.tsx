import React, { useEffect } from 'react'
import '../../styles/table.scss'
import TableContainer from './TableContainer.tsx'

export default function Table({ tHeadState, tBodyState }) {
    const className = "simple__table";

    return (
        <div className={`${className}-table-container`}>
            <TableContainer
                className={className}
                tHeadState={tHeadState}
                tBodyState={tBodyState}
            />
        </div>

    )
}