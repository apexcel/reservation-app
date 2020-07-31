import React, { useState, useEffect } from 'react'
import Calendar from '../calendar/Calendar.tsx'
import Modal from '../modal/Modal.tsx'
import { createObjectForTableBody } from '../../utils/tableUtils.ts'
import { tableHeadStateAtom, tableBodyStateAtom } from '../atoms/tableAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

export default function Main() {

    const tableHead = useRecoilValue(tableHeadStateAtom);
    const [tableBody, setTableBody] = useRecoilState(tableBodyStateAtom);

    const [visible, setVisible] = useState(false);
    const [currentDay, setCurrentDay] = useState(new Date())

    const now = new Date().valueOf();
    const maxDate = new Date(now + (86400000 * 31));
    const minDate = new Date(now - (86400000 * 1))

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const onDateClick = async (ev, currentDate) => {
        console.log(ev, currentDate)
        setCurrentDay(currentDate);
        await getBooked(currentDate)
        openModal();
    }

    const getBooked = async (_currentDate) => {
        const selectedDate: string = "" + _currentDate.getFullYear() + (_currentDate.getMonth() + 1) + _currentDate.getDate();
        console.log(selectedDate)
        const config = {
            url: "http://localhost:9000/api/get-booked-data",
            data: { date: selectedDate }
        }
        const result = await axios.post(config.url, config.data)
        console.log(result)

        let defaultBodyList = createObjectForTableBody(tableHead);
        let newTableBody = [];

        for (let i = 0; i < result.data.length; i += 1) {
            if (result.data[i].booked_data === null || result.data[i].booked_data === undefined) {
                newTableBody[i] = defaultBodyList;
            }
            else {
                newTableBody[i] = JSON.parse(result.data[i].booked_data);
            }
        }
        setTableBody(newTableBody)
    }


    return (
        <>
            <Calendar
                onDateClick={onDateClick}
                maxDate={maxDate}
                minDate={minDate}
            />
            <Modal
                visible={visible}
                closeModal={closeModal}
                currentDay={currentDay}
            />
        </>
    )
}