import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'

import { tableBodyStateAtom, tableHeadStateAtom } from 'Atoms/tableAtoms.ts'
import { userStateAtom } from 'Atoms/globalAtoms.ts'
import { genTableName, isEmpty } from 'Utils/utils.ts'
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts'

import ReservationApi from 'Api/ReservationApi'
import UserApi from 'Api/UserApi'

import Table from 'Components/table/Table.tsx'
import Dialog from 'Components/modal/Dialog.tsx'
import LessonDialog from './user/LessonDialog.tsx'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:9000');

import 'Styles/dialog.scss'

interface DialogProps {
    isDialogVisible: boolean,
    closeDialog: () => void,
    selectedDateState: Date
}

export default function TableDialog({ isDialogVisible, closeDialog, selectedDateState }: DialogProps) {

    const [lessonDialogShow, setLessonDialogShow] = useState(false);
    const openL = () => { setLessonDialogShow(true) }
    const closeL = () => { setLessonDialogShow(false) }

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom)
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom)

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
        const selectedDate = new Date(selectedDateState.getFullYear(), selectedDateState.getMonth(), selectedDateState.getDate(), rowIndex + 13);
        // 예약
        if (isEmpty(currentTableRowValue)) {

            const ans = confirm(`${selectedHeadState.name} ${selectedDate.getHours()}시에 예약하시겠습니까?`);
            if (ans && !userState.isAdmin) {
                const updated = updateTableBodyState(rowIndex, selectedHeadState.field)
                setTableBody(updated)
                setBookedList(rowIndex, updated[rowIndex], selectedDate);
                io.emit('get', { table: updated })
                //updateLesson()
                return;
            }
            // 어드민일 경우
            if (ans && userState.isAdmin) {
                const willSetName = prompt('이름을 입력해주세요.');
                if (!isEmpty(willSetName)) {
                    const updated = updateTableBodyState(rowIndex, selectedHeadState.field, willSetName)
                    setTableBody(updated)
                    setBookedList(rowIndex, updated[rowIndex], selectedDate);
                    io.emit('get', { table: updated })
                    return;
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
                return;
            }
        }
        return;
    };

    const setBookedList = async (rowIndex, newTableState, selectedDate) => {
        const token = getCookie('userToken');
        const data = {
            date: genTableName(selectedDate),
            time: (rowIndex + 1),
            booked_data: JSON.stringify(newTableState)
        };

        await ReservationApi.setReservationList(token, data).then(res => console.log(res));
        return;
    };

    const canBooking = () => {
        const validLessons = userState.lessons.filter(el =>
            el.counter > 0 &&
            new Date(el.startDate) < new Date() &&
            new Date(el.endDate) > new Date()
        );
        return validLessons.length > 0 ? true : false;
    }

    const updateLesson = async () => {
        const updated = await UserApi.subtractLesson(userState.fullname);
        if (updated.status === 200) {
            const userResp = await UserApi.getUserInfo(userState.fullname).then(res => res.data)
            setUserState(jwtDecode(userResp.token))
        }
        else {
            alert('Unknown Error!')
        }
    };

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
                >
                    <Table
                        tHeadState={tableHead}
                        tBodyState={tableBody}
                        onTableRowClick={onTableRowClick} 
                    />
                </Dialog> : null}
            {lessonDialogShow ? <LessonDialog closeDialog={closeL} /> : null}
        </>
    )
}