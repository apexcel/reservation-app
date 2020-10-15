import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import FormDialog from './FormDialog.tsx';

import * as socketio from 'socket.io-client';
// TODO: prod 버전에서는 도메인이나 해당 ip로 변경할 것
const io = socketio.connect('http://localhost:9000');

// Styles
import 'Styles/Dialog.scss';

// Types
import { IColumn, IRow } from 'types/@oogie826/table';

interface DialogProps {
    dialogState: Record<string, unknown>,
    closeDialog: () => void,
    selectedDateState: Date
}

export default function TableDialog({ dialogState, closeDialog, selectedDateState }: DialogProps): React.ReactElement {

    const tableHead = useRecoilValue<Record<string, any>>(tableHeadStateAtom);
    const [tableBody, setTableBody] = useRecoilState<Array<IRow>>(tableBodyStateAtom);
    const [userState, setUserState] = useRecoilState<Record<string, any>>(userStateAtom);
    
    const [params, setParams] = useState([]);
    const [open, setOpen] = useState({
        comp: false,
        flag: false
    });
    
    useEffect(() => {
        io.on('set', (table) => {
            console.log(table);
            setTableBody(table);
        });
    }, [tableBody]);

    useEffect(() =>{
        if (open.flag) {
            onBooking(params[0], params[1], params[2]);
        }
    }, [open]);

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

    function onBooking(rowIdx: number, selectedHeadState: Record<string, string>, selectedDate: Date) {
        const updated = updateTableBodyState(rowIdx, selectedHeadState.field);
        setTableBody(updated);
        setBookedList(updated[rowIdx], selectedDate);
        io.emit('get', { table: updated });
    }

    const removeTableBodyItem = (field: string, rowVal: string, rowIdx: number) => {
        return tableBody.map((el, idx) => {
            return el[field] === rowVal && rowIdx === idx ? { ...el, [field]: "" } : el;
        });
    };

    const onTableRowClick = async (ev: React.MouseEvent, rowIdx: number, rowVal: string, selectedHeadState: IColumn) => {
        const selectedDate = new Date(selectedDateState.getFullYear(), selectedDateState.getMonth(), selectedDateState.getDate(), rowIdx + 13);
        if (!canBooking()) {
            alert(`You don't have authority`);
            return;
        }
        if (isEmpty(rowVal)) {
            const ans = confirm(`${selectedHeadState.name} ${selectedDate.getHours()}시에 예약하시겠습니까?`);
            if (ans && !userState.isAdmin) {
                popupLessonSelectDialog('sub');
                setParams([rowIdx, selectedHeadState, selectedDate]);
                // const updated = updateTableBodyState(rowIdx, selectedHeadState.field);
                // setTableBody(updated);
                // setBookedList(updated[rowIdx], selectedDate);
                // io.emit('get', { table: updated });
                return;
            }
            // 어드민일 경우
            if (ans && userState.isAdmin) {
                const setFullname = prompt('이름을 입력해주세요.');
                if (!isEmpty(setFullname)) {
                    const updated = updateTableBodyState(rowIdx, selectedHeadState.field, setFullname);
                    setBookedList(updated[rowIdx], selectedDate);
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
                setBookedList(removed[rowIdx], selectedDate);
                io.emit('get', { table: removed });
                return;
            }
        }
        return;
    };

    const setBookedList = async (newTableState: IObject, selectedDate: Date) => {
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
        if (userState.lessons.length > 0) {
            const usableLessons = userState.lessons.filter(el => el.counter > 0 && new Date(el.endDate).valueOf() >= new Date().valueOf());
            return usableLessons.length > 0 ? true : false;
        }
        return false;
    };

    function popupLessonSelectDialog (addSub: string) {
        if (addSub === 'sub') {
            setOpen({flag: false, comp: true});
            //const response = await UserApi.putAlterLesson(getCookie('userToken'), userState.fullname).then(res => console.log(res.data));
            return true;
        }
        else {
            return false;
        }
    }


    const handleClickOpen = () => {
        setOpen({...open, comp: true});
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
            {open.comp ? <FormDialog open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} /> : null}
        </div>
    );
}