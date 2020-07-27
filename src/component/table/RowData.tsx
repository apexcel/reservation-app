import React, { useState } from 'react'

export default function RowData({ className, rowState, tHeadState }) {

    const renderRow = () => {
        console.log(rowState)
        let ret = [];
        let able = true;
        for (let i = 0; i < 2; i += 1) {
            if (rowState[tHeadState[i].field] === "") able = false;
            else able = true;
            ret[i] = <div className={`${className}-row-cell ${able ? null : "unable"}`}>
                {rowState[tHeadState[i].field]}
            </div>
        }
        return ret;
    }

    return (
        <div className={`${className}-body`}>
            {renderRow()}
        </div>
    )
}