import React, { useState } from 'react'
import Table from '../table/Table.tsx'
import '../../styles/modal.scss'

export default function Modal({ show, close, currentDay }) {

    const tHeadState = [
        {headerName: "소정", field: "so"},
        {headerName: "현영", field: "hyun"},
        {headerName: "상정", field: "jung"},
    ];

    const tBodyState = [
        {so: "so1", hyun: "hy1"},
        {so: "so2", hyun: "hy2"},
        {so: "so3", hyun: "hy3", jung: "kane"},
        {so: "", hyun: "hy4"},
        {so: "", hyun: "hy5"},
        {so: "so6", hyun: "hy6"},
        {so: "so7", hyun: "hy7"},
    ];

    return (
        <>
            {show ?
                <div>
                    <div className="modal">
                        <button onClick={close}>close</button>
                        {currentDay.date.getFullYear()} 
                        {currentDay.date.getMonth() + 1}
                        {currentDay.date.getDate()}
                        <Table
                            tHeadState={tHeadState} 
                            tBodyState={tBodyState} />
                    </div>
                </div> : null}
        </>
    )
}