import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { tueState, wedState } from '../../utils/timeTables.ts'
import { isEmpty, replacer } from '../../utils/utils.ts'
import { UserStateDispatch } from '../App.tsx'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

import '../../styles/modal.scss'
import { table } from 'console'

export default function Modal({ visible, closeModal, currentDay }) {

    const stat = React.useContext(UserStateDispatch);
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

    useEffect(() => {
        getBookedData()
    }, [])

    switch (currentDay.getDay()) {
        case 2:
            tableState.header = tueState[0];
            tableState.body = tueState[1];
            break;
        case 3:
            tableState.header = wedState[0];
            tableState.body = wedState[1];
    }

    // TODO: DB에서 데이터 불러오기
    const onBookingHandler = async (ev, row, index, headField) => {
        console.log(tableState)
        console.log(ev, row, index, headField)
        const selected = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 13);
        console.log(selected)
        if (isEmpty(row)) {
            const ans = confirm(`${row} ${selected.getHours()}에 예약하시겠습니까?`);
            if (ans) {
                tableState.body[index][headField] = stat.user.id;
                await setBookedData(index, headField, tableState.body[index]);
                await getBookedData()
            }
        }
    };


    const getBookedData = async () => {
        const today = "" + currentDay.getFullYear() + (currentDay.getMonth() + 1) + currentDay.getDate();
        const config = {
            url: "http://localhost:9000/api/get-booked-data",
            data: { today: today }
        }
        const result = await axios.post(config.url, config.data)

        let returnObj = {};
        for (let j = 0; j < tableState.header.length; j += 1) {
            const fieldName = tableState.header[j].field;
            Object.defineProperty(returnObj, fieldName, {
                value: "",
                writable: true,
                enumerable: true
            });
        }

        let newTableBodyState = [];
        for (let i = 0; i < result.data.length; i += 1) {
            if (result.data[i].booked_data === null || result.data[i].booked_data === undefined) {
                newTableBodyState[i] = returnObj;
            }
            else {
                newTableBodyState[i] = JSON.parse(result.data[i].booked_data);
            }
            setTableState({ ...tableState, body: newTableBodyState })
        }
        return;
    }

    const setBookedData = async (index, headField, newTableState) => {
        const today = "" + currentDay.getFullYear() + (currentDay.getMonth() + 1) + currentDay.getDate();
        const config = {
            url: "http://localhost:9000/api/set-booked-data",
            data: { 
                today: today,
                id: stat.user.id,
                booked_data: JSON.stringify(newTableState),
                time: (index + 1)
            }
        }
        await axios.post(config.url, config.data);
    }

    return (
        <>
            {visible ?
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
                </div> : null}
        </>
    )
}