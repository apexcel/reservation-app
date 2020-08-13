import React, { useState, useEffect } from 'react'
import Calendar from '../calendar/Calendar.tsx'
import TableDialog from '../modal/TableDialog.tsx'
import { createEmptyTableRow, fulfillEmptyObject } from '../../utils/tableUtils.ts'
import { genTableName } from '../../utils/utils.ts'
import { tableHeadStateAtom, tableBodyStateAtom } from '../../atoms/tableAtoms.ts'
import { baseURLAtom, currentSelectedDateAtom, getTableHeadersEachDay } from '../../atoms/globalAtoms.ts'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:9000');

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
        getBookedList(selectedDateState);
    }, [selectedDateState])

    const onDateClick = async (ev, selectedDate) => {
        //console.log(ev, selectedDate);
        await setSelectedDateState(selectedDate);
        getBookedList(selectedDateState);
        openDialog();
    };

    const getBookedList = async (selectedDate) => {
        const _selectedDate = genTableName(selectedDate);
        const config = {
            url: `${baseURL}/api/reservation/get-booked-data`,
            data: { date: _selectedDate }
        };
        const result = await axios.post(config.url, config.data)
        console.log(result)

        const emptyTableRow = createEmptyTableRow(tableHead);
        const newTableBody = fulfillEmptyObject(result.data, emptyTableRow);
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
                    {
                        start: new Date(),
                        end: new Date(new Date().valueOf() + 10 * 86400000)
                    }
                }
            />
            <TableDialog
                isDialogVisible={isDialogVisible}
                closeDialog={closeDialog}
                selectedDateState={selectedDateState}
            />
        </>
    )
}