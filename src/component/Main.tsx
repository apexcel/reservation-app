import React, { useState, useEffect } from 'react'
import Calendar from './calendar/Calendar.tsx'
import Modal from './modal/Modal.tsx'

export default function Main({ userInfo }) {

    const [visible, setVisible] = useState(false);
    const [currentDay, setCurrentDay] = useState(new Date())

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const onDateClick = (ev, val) => {
        //console.log(ev, val)
        setCurrentDay(val);
        openModal();
    }


    return (
        <>
            <Calendar onDateClick={onDateClick}/>
            <Modal visible={visible} closeModal={closeModal} currentDay={currentDay}/>
        </>
    )
}