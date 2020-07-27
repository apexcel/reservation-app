import React, { useEffect, useState } from 'react'
import RowData from './RowData.tsx'

export default function TableBody({ className, tHeadState, tBodyState }) {

    const renderTableBody = () => {
        // let ret = [];
        // for (let i = 0; i < tBodyState.length; i += 1) {
        //     for (let j = 0; j < tHeadState.length; j += 1) {
        //         ret[i] = (<div key={i} className={`${className}-body`}>
        //             <RowData
        //                 className={className}
        //                 rowState={tBodyState}
        //                 key={i}
        //             />
        //         </div>)
        //     }
        // }
        // return ret;

        return tBodyState.map((el ,idx) => 
        <RowData key={idx} className={className} rowState={el} tHeadState={tHeadState} />)
    
    }


    return (
        <div className={`${className}-body-wrapper`}>
            {renderTableBody()}
        </div>
    )
}