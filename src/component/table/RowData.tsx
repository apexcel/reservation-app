import React, { useState } from 'react'

export default function RowData({
    className,
    rowState,
    tHeadState }) {

    const renderRow = () => {
        console.log(rowState)
        let ret = [];
        let able = true;
        for (let i = 0; i < tHeadState.length; i += 1) {
        console.log(rowState[tHeadState[i].field])

            if (rowState[tHeadState[i].field] === "" || rowState[tHeadState[i].field] === undefined) able = false;
            else able = true;
            ret[i] = (
                <div key={i} className={`${className}-row-cell ${able ? null : "unable"}`}>
                    {rowState[tHeadState[i].field]}
                </div>
            )
        }
        return ret;
    }

    return (
        <div className={`${className}-body`}>
            {renderRow()}
        </div>
    )
}