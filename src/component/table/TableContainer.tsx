import React from 'react'
import TableHeader from './TableHeader.tsx'
import TableBody from './TableBody.tsx'

export default function TableContainer({ className, tHeadState, tBodyState }) {
    return (
        <div className={`${className}-container`}>
            <TableHeader
                className={className}
                tHeadState={tHeadState}
            />
            <TableBody 
                className={className}
                tHeadState={tHeadState}
                tBodyState={tBodyState}
            />
        </div>
    )
}