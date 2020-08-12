import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import { isEmpty } from '../../utils/utils.ts'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../../atoms/tableAtoms.ts'
import { baseURLAtom, userStateAtom } from '../../atoms/globalAtoms.ts'
import axios from 'axios'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:9000');

import '../../styles/dialog.scss'

interface DialogProps {
    isDialogVisible: boolean,
    closeDialog: () => void,
    selectedDateState: Date
}

export default function Dialog({ isDialogVisible, closeDialog, selectedDateState }: DialogProps) {

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const baseURL = useRecoilValue(baseURLAtom);

    const updateTableBodyState = (index, field) => {
        return (tableBody.map((el, idx) => {
            return index === idx ? { ...tableBody[idx], [field]: userState.fullname } : el
        }))
    };

    useEffect(() => {
        io.on('set', (table) => {
            console.log(table)
            setTableBody(table)
        })
    }, [])

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
                io.emit('get', {table: updated})
            }
        }
        // 예약 취소
        if ((currentTableRowValue === userState.fullname) || (!isEmpty(currentTableRowValue) && userState.isAdmin === true)) {
            const ans = confirm(`예약 취소 하시겠습니까?`)
            if (ans) {
                let removed = tableBody.map((el, idx) => {
                    if (el[selectedHeadState.field] === currentTableRowValue && rowIndex === idx) {
                        console.log("true", el, idx)
                        return { ...el, [selectedHeadState.field]: "" };
                    }
                    else {
                        return el;
                    }
                });
                setTableBody(removed);
                await setBookedData(rowIndex, removed[rowIndex], selectedDate);
                io.emit('get', {table: removed})
            }
        }
    };

    const setBookedData = async (rowIndex, newTableState, selectedDate) => {
        const _currentDate = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: `${baseURL}/api/reservation/set-booked-data`,
            data: {
                date: _currentDate,
                booked_data: JSON.stringify(newTableState),
                time: (rowIndex + 1)
            }
        }
        await axios.post(config.url, config.data);
    }


    const renderDialogHeader = () => {
        const dow = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className='dialog-header'>
                <div className='dialog-close-btn' onClick={closeDialog}>
                    <div className='cross-line'></div>
                    <div className='cross-line'></div>
                </div>
                <div className='dialog-selected-date'>
                    <span>{selectedDateState.getFullYear()}</span>
                    <span>{selectedDateState.getMonth() + 1}</span>
                    <span>{selectedDateState.getDate()}</span>
                    <span>{dow[selectedDateState.getDay()]}</span>
                </div>
            </div>
        )
    };

    return (
        <>
            {isDialogVisible ?
                <div className='dialog'>
                    {renderDialogHeader()}
                    <Table
                        tHeadState={tableHead}
                        tBodyState={tableBody}
                        onTableRowClick={onTableRowClick}
                    />
                </div> : null}
        </>
    )
}