import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import qs from 'qs';
import moment from 'moment';

import { createEmptyTableRow, fulfillEmptyObject } from 'Utils/tableUtils.ts';
// import { genTableName } from 'Utils/utils.ts';
import { tableHeadStateAtom, tableBodyStateAtom } from 'Atoms/tableAtoms.ts';
import { currentSelectedDateAtom, getTableHeadersEachDay } from 'Atoms/globalAtoms.ts';
import { setCookie, getCookie, deleteCookie } from 'Utils/browserUtils.ts';

import TableDialog from './TableDialog.tsx';
import Calendar from 'Components/calendar/Calendar.tsx';

import ReservationApi from 'Api/ReservationApi.ts';

export default function Main(): React.ReactElement {

    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom);
    const getTableHeaders = useRecoilValue(getTableHeadersEachDay);

    const [dialogState, setDialogState] = useState({
        component: false,
        style: false
    });
    const [selectedDateState, setSelectedDateState] = useRecoilState<Date>(currentSelectedDateAtom);


    // Calendar
    const now = new Date().valueOf();
    const maxDate = new Date(now + (86400000 * 31));
    const minDate = new Date(now - (86400000 * 1));

    // Dialog
    const openDialog = () => {
        setDialogState({component: true, style: true});
        document.body.style.overflow = 'hidden';
    };
    const closeDialog = () => {
        setDialogState({component: true, style: false});
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            setDialogState({component: false, style: false});
        }, 500);
    };

    useEffect(() => {
        setTableHead(getTableHeaders);
        getBookedList(selectedDateState);
    }, [selectedDateState]);

    const onDateClick = async (ev, selectedDate: Date) => {
        //console.log(ev, selectedDate);
        if (selectedDate.getDay() === 1) {
            alert('월요일은 휴무입니다.');
            return;
        }
        await setSelectedDateState(selectedDate);
        getBookedList(selectedDate);
        openDialog();
    };

    // TODO: API 수정하기 헤더 달아야함
    const getBookedList = async (selectedDate: Date) => {
        moment.locale('ko');
        const token = getCookie('userToken');
        const formatDate = moment(selectedDate).format('YYYY-MM-DD');
        const response = await ReservationApi.getReservationList(token, formatDate);
        const emptyTableRow = createEmptyTableRow(tableHead);
        const newTableBody = fulfillEmptyObject(response.data, emptyTableRow);
        setTableBody(newTableBody);
    };

    return (
        <>
            <Calendar
                onDateClick={onDateClick}
                maxDate={maxDate}
                minDate={minDate}
                // TODO: Date-range 사용하기
                // TODO: 공휴일이나 어드민이 특정날짜 할 수 있게 하기
                dateRange={
                    {
                        start: new Date(),
                        end: new Date(new Date().valueOf() + 10 * 86400000)
                    }
                }
            />
            <TableDialog
                dialogState={dialogState}
                closeDialog={closeDialog}
                selectedDateState={selectedDateState}
            />
        </>
    );
}