import React, { useState, useEffect } from 'react'
import Calendar from '../calendar/Calendar.tsx'
import Dialog from '../modal/Dialog.tsx'
import { createEmptyTableRow, fulfillEmptyObject } from '../../utils/tableUtils.ts'
import { tableHeadStateAtom, tableBodyStateAtom } from '../../atoms/tableAtoms.ts'
import { baseURLAtom, currentSelectedDateAtom, getTableHeadersEachDay } from '../../atoms/globalAtoms.ts'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

export default function Main() {

    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom);
    const baseURL = useRecoilValue(baseURLAtom);
    const getHeaders = useRecoilValue(getTableHeadersEachDay);

    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedDateState, setSelectedDateState] = useRecoilState(currentSelectedDateAtom);

    // Calendar
    const now = new Date().valueOf();
    const maxDate = new Date(now + (86400000 * 31));
    const minDate = new Date(now - (86400000 * 1))

    // Dialog
    const openDialog = () => setIsDialogVisible(true);
    const closeDialog = () => setIsDialogVisible(false);

    useEffect(() => {
        setTableHead(getHeaders);
    }, [selectedDateState])

    const onDateClick = async (ev, selectedDate) => {
        //console.log(ev, selectedDate);
        await setSelectedDateState(selectedDate);
        setTableHead(getHeaders);
        getBookedList(selectedDate);
        openDialog();
    };

    //TODO: DB에서 가져올 때 날짜 변환 쉽도록 Date형식으로 보내주기
    const getBookedList = async (selectedDate) => {
        const _selectedDate: string = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: `${baseURL}/api/reservation/get-booked-data`,
            data: { date: _selectedDate }
        }
        const result = await axios.post(config.url, config.data)
        console.log(result)

        let emptyTableRow = createEmptyTableRow(tableHead);
        let newTableBody = fulfillEmptyObject(result.data, emptyTableRow);
        setTableBody(newTableBody)
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
                    {start: new Date(),
                    end: new Date(new Date().valueOf() + 10 * 86400000)}
                }
            />
            <Dialog
                isDialogVisible={isDialogVisible}
                closeDialog={closeDialog}
                selectedDateState={selectedDateState}
            />
        </>
    )
}