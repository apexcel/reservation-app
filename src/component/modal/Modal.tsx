import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { isEmpty } from '../../utils/utils.ts'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../atoms/tableAtoms'
import { userInfoAtom } from '../atoms/globalAtoms'
import axios from 'axios'

import '../../styles/modal.scss'

export default function Modal({ visible, closeModal, currentDay }) {

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userInfoAtom)

    useEffect(() => {
        setTableHead([
            { name: "소정", field: "so" },
            { name: "현영", field: "hyun" },
            { name: "상정", field: "jung" },
        ]);
    }, [])

    const onBookingHandler = async (ev, row, index, headField) => {
        console.log("onBookingHandler");
        const selectedDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), index + 13);
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
            }
        }
    };

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