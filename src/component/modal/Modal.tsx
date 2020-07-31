import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { isEmpty, replacer } from '../../utils/utils.ts'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../atoms/tableAtoms'
import { userInfoAtom, getBookedParamsAtom } from '../atoms/globalAtoms'
import axios from 'axios'

import '../../styles/modal.scss'

export default function Modal({ visible, closeModal, currentDay }) {

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userInfoAtom)
    const [selectedDateTime, setSelectedDateTime] = useState(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()));
    const setBookedParams = useSetRecoilState(getBookedParamsAtom);

    useEffect(() => {
        setTableHead([
            { name: "소정", field: "so" },
            { name: "현영", field: "hyun" },
            { name: "상정", field: "jung" },
        ]);
        // getBookedData(selectedDateTime)
    }, [])

    const onBookingHandler = async (ev, row, index, headField) => {
        console.log("onBookingHandler");
        const selectedDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 13);
        setSelectedDateTime(selectedDate);
        setBookedParams(selectedDate)

        // await getBookedData(selectedDateTime);
        console.log(ev, row, index, headField)
        if (isEmpty(row)) {
            const ans = confirm(`${row} ${selectedDate.getHours()}에 예약하시겠습니까?`);
            if (ans) {
                let updatedTableBody = await tableBody.map((el, idx) => {
                    return index === idx ? {...tableBody[idx], [headField]: userState.user.id} : el
                });
                setTableBody(updatedTableBody)
                console.log(updatedTableBody)
                console.log(tableBody)
                await setBookedData(index, headField, updatedTableBody[index], selectedDate);
                // await getBookedData(selectedDate)
            }
        }
    };


    // const getBookedData = async (selectedDate) => {
    //     const selected = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
    //     console.log("getBookedDate", selected)
    //     const config = {
    //         url: "http://localhost:9000/api/get-booked-data",
    //         data: { date: selected }
    //     }
    //     const result = await axios.post(config.url, config.data)
    //     //console.log(result)
    //     let defaultBodyList = createObjectForTableBody(tableHead);

    //     let newTableBodyState = [];
    //     for (let i = 0; i < result.data.length; i += 1) {
    //         if (result.data[i].booked_data === null || result.data[i].booked_data === undefined) {
    //             newTableBodyState[i] = defaultBodyList;
    //         }
    //         else {
    //             newTableBodyState[i] = JSON.parse(result.data[i].booked_data);
    //         }
    //     }
    //     setTableBody(newTableBodyState)
    // };

    const setBookedData = async (index, headField, newTableState, selectedDate) => {
        const _currentDate = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: "http://localhost:9000/api/set-booked-data",
            data: { 
                date: _currentDate,
                id: userState.user.id,
                booked_data: JSON.stringify(newTableState),
                time: (index + 1)
            }
        }
        const date = await axios.post(config.url, config.data);
        //console.log(date)
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

function createObjectForTableBody(tableHead) {
    let obj = {};
    for (let i = 0; i < tableHead.length; i += 1) {
        const fieldName = tableHead[i].field;
        Object.defineProperty(obj, fieldName, {
            value: "",
            writable: true,
            enumerable: true
        });
    }
    return obj;
}