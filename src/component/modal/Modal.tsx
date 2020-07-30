import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { tueState, wedState } from '../../utils/timeTables.ts'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue } from 'recoil'
import '../../styles/modal.scss'
import { table } from 'console'

export default function Modal({ visible, closeModal, currentDay }) {


    const [tableState, setTableState] = useState({
        header: [
            { headerName: "소정", field: "so" },
            { headerName: "현영", field: "hyun" },
            { headerName: "상정", field: "jung" },
        ],
        body: [
            { so: "", hyun: "hy1" },
            { so: "", hyun: "hy2" },
            { so: "so3", hyun: "hy3", jung: "kane" },
            { so: "so4", hyun: "hy4" },
            { so: "so5", hyun: "hy5" },
            { so: "", hyun: "hy6" },
            { so: "", hyun: "hy7" },
            { so: "", hyun: "hy7" },
            { so: "", hyun: "hy7" },
            { so: "", hyun: "hy7" },
        ]
    })

    switch (currentDay.getDay()) {
        case 2:
            tableState.header = tueState[0];
            tableState.body = tueState[1];
            break;
        case 3:
            tableState.header = wedState[0];
            tableState.body = wedState[1];
    }

    const onBookingHandler = async (ev, row, index, tHeadStatus) => {
        //console.log(ev, row, index)
        //console.log(currentDay);
        console.log(index)
        console.log(row)
        console.log(tHeadStatus)
        const selected = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 13);
        console.log(selected)
        if (row === "") {
            const ans = confirm(`${row} ${selected.getHours()}에 예약하시겠습니까?`);
            if (ans) {
            const newTableBodyState = tableState.body
            newTableBodyState[index][tHeadStatus] = "Booked";
            await setTableState({...tableState, body: newTableBodyState});
            console.log(tableState.body)
            }
        }
        else {
            confirm(`${row} ${selected.getHours()} 이미 예약 되어 있음.`);
        }
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
                            tHeadState={tableState.header}
                            tBodyState={tableState.body}
                            currentDay={currentDay}
                            onBookingHandler={onBookingHandler}
                        />
                    </div>
                </div> : null}
        </>
    )
}