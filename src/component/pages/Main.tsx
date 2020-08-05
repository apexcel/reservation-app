import React, { useState, useEffect } from 'react'
import Calendar from '../calendar/Calendar.tsx'
import Modal from '../modal/Modal.tsx'
import Admin from './admin/Admin.tsx'
import { createEmptyTableRow, fulfillEmptyObject } from '../../utils/tableUtils.ts'
import { tableHeadStateAtom, tableBodyStateAtom } from '../atoms/tableAtoms.ts'
import { userInfoAtom, baseURLAtom, currentSelectedDateAtom, getTableHeadersEachDay } from '../atoms/globalAtoms.ts'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

export default function Main() {

    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);
    const [tableHead, setTableHead] = useRecoilState(tableHeadStateAtom);
    const baseUrl = useRecoilValue(baseURLAtom);
    const getHeaders = useRecoilValue(getTableHeadersEachDay);

    const [visible, setVisible] = useState(false);
    const [selectedDateState, setSelectedDateState] = useRecoilState(currentSelectedDateAtom);

    // Calendar
    const now = new Date().valueOf();
    const maxDate = new Date(now + (86400000 * 31));
    const minDate = new Date(now - (86400000 * 1))

    // Modal
    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    useEffect(() => {
        setTableHead(getHeaders);
    }, [selectedDateState])

    const onDateClick = async (ev, selectedDate) => {
        //console.log(ev, selectedDate);
        await setSelectedDateState(selectedDate);
        setTableHead(getHeaders);
        getBookedList(selectedDate);
        openModal();
    };

    const getBookedList = async (selectedDate) => {
        const _selectedDate: string = "" + selectedDate.getFullYear() + (selectedDate.getMonth() + 1) + selectedDate.getDate();
        const config = {
            url: `${baseUrl}/api/reservation/get-booked-data`,
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
            <Admin/>
            <Calendar
                onDateClick={onDateClick}
                maxDate={maxDate}
                minDate={minDate}
            />
            <Modal
                visible={visible}
                closeModal={closeModal}
                selectedDateState={selectedDateState}
            />
        </>
    )
}