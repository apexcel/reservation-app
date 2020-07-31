import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { tueState, wedState } from '../../utils/timeTables.ts'
import { isEmpty, replacer } from '../../utils/utils.ts'
import { UserStateDispatch } from '../App.tsx'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../atoms/tableAtoms'
import axios from 'axios'

import '../../styles/modal.scss'

export default function Modal({ visible, closeModal, currentDay }) {

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);

    const stat = React.useContext(UserStateDispatch);


    const [selectedDateTime, setSelectedDateTime] = useState(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()));

    useEffect(() => {
        setTableHead([
            { name: "소정", field: "so" },
            { name: "현영", field: "hyun" },
            { name: "상정", field: "jung" },
        ]);
        setTableBody([
            {so: "s0", hyun: "h0", jung: "j0"}
        ])
        getBookedData(selectedDateTime)
    }, [])
    console.log(tableHead)
    console.log(tableBody)
    const onBookingHandler = async (ev, row, index, headField) => {
        console.log("onBookingHandler");
        const selectedDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 13);
        setSelectedDateTime(selectedDate);
        getBookedData(selectedDateTime);
        console.log(tableBody)
        console.log(ev, row, index, headField)
        if (isEmpty(row)) {
            const ans = confirm(`${row} ${selectedDate.getHours()}에 예약하시겠습니까?`);
            if (ans) {
                tableBody[index][headField] = stat.user.id;
                setBookedData(index, headField, tableBody[index], selectedDate);
                getBookedData(selectedDate)
            }
        }
    };


    const getBookedData = async (selectedDate) => {
        const selected = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        console.log("getBookedDate", selected)
        const config = {
            url: "http://localhost:9000/api/get-booked-data",
            data: { date: selected }
        }
        const result = await axios.post(config.url, config.data)
        console.log(result)
        let returnObj = {};
        for (let j = 0; j < tableHead.length; j += 1) {
            const fieldName = tableHead[j].field;
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
        }
        setTableBody(newTableBodyState)
    };

    const setBookedData = async (index, headField, newTableState, selectedDate) => {
        const _currentDate = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: "http://localhost:9000/api/set-booked-data",
            data: { 
                date: _currentDate,
                id: stat.user.id,
                booked_data: JSON.stringify(newTableState),
                time: (index + 1)
            }
        }
        const date = await axios.post(config.url, config.data);
        console.log(date)
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
                        tHeadState={tableHead}
                        tBodyState={tableBody}
                        currentDay={currentDay}
                        onBookingHandler={onBookingHandler}
                    />
                </div> : null}
        </>
    )
}