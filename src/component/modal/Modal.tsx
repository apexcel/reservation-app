import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { tueState, wedState } from '../../utils/timeTables.ts'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue } from 'recoil'
import '../../styles/modal.scss'

export default function Modal({ visible, closeModal, currentDay }) {

    let tHeadState = [
        { headerName: "소정", field: "so" },
        { headerName: "현영", field: "hyun" },
        { headerName: "상정", field: "jung" },
    ];

    let tBodyState = [
        { so: "so1", hyun: "hy1" },
        { so: "so2", hyun: "hy2" },
        { so: "so3", hyun: "hy3", jung: "kane" },
        { so: "so4", hyun: "hy4" },
        { so: "so5", hyun: "hy5" },
        { so: "so6", hyun: "hy6" },
        { so: "so7", hyun: "hy7" },
        { so: "so8", hyun: "hy7" },
        { so: "so9", hyun: "hy7" },
        { so: "so9", hyun: "hy7" },
    ];

    switch (currentDay.getDay()) {
        case 2:
            tHeadState = tueState[0];
            tBodyState = tueState[1];
            break;
        case 3:
            tHeadState = wedState[0];
            tBodyState = wedState[1];
    }

    const onBookingHandler = (ev, rowState) => {
        console.log(ev, rowState)
        console.log(currentDay)
    };

    return (
        <>
            {visible ?
                <div>
                    <div className="modal">
                        <button onClick={closeModal}>closeModal</button>
                        {currentDay.getFullYear()}
                        {currentDay.getMonth() + 1}
                        {currentDay.getDate()}
                        <Table
                            tHeadState={tHeadState}
                            tBodyState={tBodyState}
                            currentDay={currentDay}
                            onBookingHandler={onBookingHandler}
                        />
                    </div>
                </div> : null}
        </>
    )
}