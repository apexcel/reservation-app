import React, { useState, useEffect } from 'react'
import Calendar from './calendar/Calendar.tsx'
import Modal from './modal/Modal.tsx'

export default function Main({ userInfo }) {

    const onDateClick = (ev, val) => {
        console.log(ev, val)
    }


    return (
        <div>
            <Calendar onDateClick={onDateClick}/>
        </div>
    )
}