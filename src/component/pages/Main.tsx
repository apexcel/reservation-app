import React, { useState, useEffect } from 'react'
import Calendar from '../calendar/Calendar.tsx'
import Modal from '../modal/Modal.tsx'
import {UserStateDispatch} from '../App.tsx'

export default function Main({ userInfo }) {

    const stat = React.useContext(UserStateDispatch);
    console.log("context:", stat)

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

    const onDateClick = (ev, currentDate) => {
        console.log(ev, currentDate)
        setCurrentDay(currentDate);
        openModal();
    }


    return (
        <>
            <Calendar 
                onDateClick={onDateClick} 
                maxDate={maxDate} 
                minDate={minDate}
                />
            <Modal visible={visible} closeModal={closeModal} currentDay={currentDay}/>
        </>
    )
}