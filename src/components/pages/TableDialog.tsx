import React, { useState, useEffect } from 'react'
import Table from '../table/Table.tsx'
import ReservationApi from '../../utils/api/ReservationApi'
import UserApi from '../../utils/api/UserApi'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tableBodyStateAtom, tableHeadStateAtom } from '../../atoms/tableAtoms.ts'
import { baseURLAtom, userStateAtom } from '../../atoms/globalAtoms.ts'
import { genTableName, isEmpty } from '../../utils/utils.ts'
import Dialog from '../modal/Dialog.tsx'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:9000');

import '../../styles/dialog.scss'

interface DialogProps {
    isDialogVisible: boolean,
    closeDialog: () => void,
    selectedDateState: Date
}

export default function TableDialog({ isDialogVisible, closeDialog, selectedDateState }: DialogProps) {

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const baseURL = useRecoilValue(baseURLAtom);

    const updateTableBodyState = (index, field, name?) => {
        if (name) {
            return (tableBody.map((el, idx) => {
                return index === idx ? { ...tableBody[idx], [field]: name } : el
            }))
        }
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
            if (ans && canBooking()) {
                const updated = updateTableBodyState(rowIndex, selectedHeadState.field)
                setTableBody(updated)
                await setBookedList(rowIndex, updated[rowIndex], selectedDate);
                io.emit('get', { table: updated })
                subtractLessonCounter()
                return;
            }
            // 어드민일 경우
            if (ans && userState.isAdmin) {
                const willSetName = prompt('이름을 입력해주세요.');
                if (!isEmpty(willSetName)) {
                    const updated = updateTableBodyState(rowIndex, selectedHeadState.field, willSetName)
                    setTableBody(updated)
                    await setBookedList(rowIndex, updated[rowIndex], selectedDate);
                    io.emit('get', { table: updated })
                }
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
                await setBookedList(rowIndex, removed[rowIndex], selectedDate);
                io.emit('get', { table: removed })
            }
        }
    };

    const setBookedList = async (rowIndex, newTableState, selectedDate) => {
        const data = {
            date: genTableName(selectedDate),
            time: (rowIndex + 1),
            booked_data: JSON.stringify(newTableState)
        };

        await ReservationApi.setReservationList(data);
    };

    const canBooking = () => {
        const validLessons = userState.lessons.filter(el =>
            el.counter > 0 &&
            new Date(el.start) < new Date() &&
            new Date(el.end) > new Date()
        );
        return validLessons.length > 0 ? true : false;
    }

    const subtractLessonCounter = async () => {
        await UserApi.setUserInfo(userState.fullname)
    }

    const renderDialogHeader = () => {
        const dow = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className='dialog-selected-date'>
                <span>{selectedDateState.getFullYear()}</span>
                <span>{selectedDateState.getMonth() + 1}</span>
                <span>{selectedDateState.getDate()}</span>
                <span>{dow[selectedDateState.getDay()]}</span>
            </div>
        )
    };

    return (
        <>
            {isDialogVisible ?
                <Dialog
                    closeDialog={closeDialog}
                    dialogHeader={renderDialogHeader()}
                    dialogBody={
                        <Table
                            tHeadState={tableHead}
                            tBodyState={tableBody}
                            onTableRowClick={onTableRowClick} />}
                /> : null}
        </>
    )
}