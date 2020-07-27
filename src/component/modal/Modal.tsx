import React, { useState } from 'react'
import Table from '../table/Table.tsx'
export default function Modal({ show, close, currentDay }) {

    const className = "simple__schedule__table"

    const modal = {
        display: "block",
        position: "fixed",
        border: "1px solid red",
        margin: "auto",
        width: "50%",
        height: "50vh",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }

    const tHeadState = [
        {headerName: "소정", field: "so", range: []},
        {headerName: "현영", field: "hyun", range: []},
    ];

    const tBodyState = [
        {so: "so1", hyun: "hy1"},
        {so: "so2", hyun: "hy2"},
        {so: "so3", hyun: "hy3"},
    ];

    return (
        <>
            {show ?
                <div>
                    <div style={modal}>
                        <button onClick={close}>close</button>
                        <Table
                            className={className}
                            tHeadState={tHeadState} 
                            tBodyState={tBodyState}/>

                    </div>
                </div> : null}
        </>
    )
}