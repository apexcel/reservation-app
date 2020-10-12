import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { tableBodyStateAtom, tableHeadStateAtom } from 'Atoms/tableAtoms.ts';
import { userStateAtom } from 'Atoms/globalAtoms.ts';
import { isEmpty } from 'Utils/utils.ts';
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts';

import ReservationApi from 'Api/ReservationApi.ts';
import UserApi from 'Api/UserApi.ts';

import Table from 'Components/table/Table.tsx';
import Dialog from 'Components/modal/Dialog.tsx';
import LessonDialog from './user/LessonDialog.tsx';

import * as socketio from 'socket.io-client';
const io = socketio.connect('http://localhost:9000');

// Styles
import 'Styles/Dialog.scss';

// Types
import { IColumn, IRow } from 'types/@oogie826/table';

interface DialogProps {
    dialogState: IObject,
    closeDialog: () => void,
    selectedDateState: Date
}

export default function TableDialog({ dialogState, closeDialog, selectedDateState }: DialogProps) {

    const [lessonDialogShow, setLessonDialogShow] = useState(false);
    const openLessonDialog = () => { setLessonDialogShow(true); };
    const closeLessonDialog = () => { setLessonDialogShow(false); };

    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom);
    const [tableBody, setTableBody] = useRecoilState<Array<IRow>>(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState(userStateAtom);

    const updateTableBodyState = (index: number, field: string, fullname?: string) => {
        if (fullname) {
            return (tableBody.map((el, idx) => {
                return index === idx ? { ...tableBody[idx], [field]: fullname } : el;
            }));
        }
        else {
            return (tableBody.map((el, idx) => {
                return index === idx ? { ...tableBody[idx], [field]: userState.fullname } : el;
            }));
        }
    };

    const removeTableBodyItem = (field, rowVal, rowIdx) => {
        return tableBody.map((el, idx) => {
            return el[field] === rowVal && rowIdx === idx ? { ...el, [field]: "" } : el;
        });
    }

    useEffect(() => {
        io.on('set', (table) => {
            console.log(table);
            setTableBody(table);
        });
    }, [tableBody]);

    const onTableRowClick = async (ev: React.MouseEvent, rowIdx: number, rowVal: string, selectedHeadState: IColumn) => {
        const selectedDate = new Date(selectedDateState.getFullYear(), selectedDateState.getMonth(), selectedDateState.getDate(), rowIdx + 13);

        if (isEmpty(rowVal)) {
            const ans = confirm(`${selectedHeadState.name} ${selectedDate.getHours()}시에 예약하시겠습니까?`);
            if (ans && !userState.isAdmin) {
                const updated = updateTableBodyState(rowIdx, selectedHeadState.field);
                setTableBody(updated);
                setBookedList(rowIdx, updated[rowIdx], selectedDate);
                io.emit('get', { table: updated });
                return;
            }
            // 어드민일 경우
            if (ans && userState.isAdmin) {
                const setFullname = prompt('이름을 입력해주세요.');
                if (!isEmpty(setFullname)) {
                    const updated = updateTableBodyState(rowIdx, selectedHeadState.field, setFullname);
                    setBookedList(rowIdx, updated[rowIdx], selectedDate);
                    setTableBody(updated);
                    io.emit('get', { table: updated });
                    return;
                }
            }
        }
        // 예약 취소
        if ((rowVal === userState.fullname) || (!isEmpty(rowVal) && userState.isAdmin === true)) {
            const ans = confirm(`예약 취소 하시겠습니까?`);
            if (ans) {
                const removed = removeTableBodyItem(selectedHeadState.field, rowVal, rowIdx);
                setTableBody(removed);
                setBookedList(rowIdx, removed[rowIdx], selectedDate);
                io.emit('get', { table: removed });
                return;
            }
        }
        return;
    };

    const setBookedList = async (rowIdx, newTableState, selectedDate) => {
        moment.locale('ko');
        const token = getCookie('userToken');
        const formatDate = moment(selectedDate).format('YYYY-MM-DD:HH');
        const data = {
            time_stamp: formatDate,
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
    };

    const updateLesson = async () => {
        const updated = await UserApi.subtractLesson(userState.fullname);
        if (updated.status === 200) {
            const userResp = await UserApi.getUserInfo(userState.fullname).then(res => res.data);
            setUserState(jwtDecode(userResp.token));
        }
        else {
            alert('Unknown Error!');
        }
    };

    const renderDialogHeader = () => {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className='dialog-selected-date'>
                <span>{selectedDateState.getFullYear()}</span>
                <span>{selectedDateState.getMonth() + 1}</span>
                <span>{selectedDateState.getDate()}</span>
                <span>{daysOfWeek[selectedDateState.getDay()]}</span>
            </div>
        );
    };

    return (
        <div className={`${dialogState.style ? 'dialog-background' : ''}`}>
            {dialogState.component ?
                <Dialog
                    className={`${dialogState.style ? 'toast' : 'untoast'}`}
                    closeDialog={closeDialog}
                    dialogHeader={renderDialogHeader()}
                >
                    <Table
                        tHeadState={tableHead}
                        tBodyState={tableBody}
                        onTableRowClick={onTableRowClick}
                    />
                </Dialog> : null}
            {lessonDialogShow ? <LessonDialog closeDialog={closeLessonDialog} /> : null}
        </div>
    );
}