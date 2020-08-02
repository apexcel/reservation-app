import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { isEmpty } from '../../utils/utils.ts'
import { atom, atomFamily, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../atoms/tableAtoms'
import { userInfoAtom } from '../atoms/globalAtoms'
import axios from 'axios'

import '../../styles/modal.scss'

interface ModalProps {
    visible: boolean,
    closeModal: () => void,
    selectedDateState: Date
}

export default function Modal({ visible, closeModal, selectedDateState }: ModalProps) {

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

    const updateTableBodyState = (index, field) => {
        return (tableBody.map((el, idx) => {
            return index === idx ? { ...tableBody[idx], [field]: userState.user.id } : el
        }))
    };

    const onTableRowClick = async (ev, rowIndex, currentTableRowValue, selectedHeadState) => {
        //console.log(ev, currentTableRowValue, rowIndex, selectedHeadState)
        const selectedDate = new Date(selectedDateState.getFullYear(), selectedDateState.getMonth(), selectedDateState.getDate(), rowIndex + 13);

        // 예약
        if (isEmpty(currentTableRowValue)) {
            const ans = confirm(`${selectedHeadState.name} ${selectedDate.getHours()}시에 예약하시겠습니까?`);
            if (ans) {
                const updated = await updateTableBodyState(rowIndex, selectedHeadState.field)
                setTableBody(updated)
                await setBookedData(rowIndex, updated[rowIndex], selectedDate);
            }
        }
        // 예약 취소
        if (currentTableRowValue === userState.user.id) {
            const ans = confirm(`예약 취소 하시겠습니까?`)
            if (ans) {
                let removed = tableBody.map((el, idx) => {
                    if (el[selectedHeadState.field] === userState.user.id && rowIndex === idx) {
                        console.log("true", el, idx)
                        return { ...el, [selectedHeadState.field]: "" };
                    }
                    else {
                        return el;
                    }
                });
                setTableBody(removed);
                await setBookedData(rowIndex, removed[rowIndex], selectedDate);
            }
        }
    };

    const setBookedData = async (rowIndex, newTableState, selectedDate) => {
        const _currentDate = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: "http://localhost:9000/api/set-booked-data",
            data: {
                date: _currentDate,
                id: userState.user.id,
                booked_data: JSON.stringify(newTableState),
                time: (rowIndex + 1)
            }
        }
        await axios.post(config.url, config.data);
    }

    return (
        <>
            {visible ?
                <div className="modal">
                    <button onClick={closeModal}>closeModal</button>
                    {selectedDateState.getFullYear()}
                    {selectedDateState.getMonth() + 1}
                    {selectedDateState.getDate()}
                    <Table
                        tHeadState={tableHead}
                        tBodyState={tableBody}
                        onTableRowClick={onTableRowClick}
                    />
                </div> : null}
        </>
    )
}