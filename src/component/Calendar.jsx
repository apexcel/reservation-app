import React, { useEffect, useRef, createRef } from 'react'
import moment from 'moment'
//icons
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti'
//styles
import '../styles/calendar.scss'

const Calendar = () => {

    useEffect(() => {
        const isLeapYear = () => {
            const today = moment()
            const thisYear = today.year()

            if ( (thisYear % 4 === 0 && (thisYear % 100 !== 0) || thisYear % 400 === 0) ) {
                return true;
            }
            else {
                return false;
            }
        }
        isLeapYear()
    })

    const day_ref = createRef()

    const dayGenerator = () => {
        const today = moment()
        const startWeek = today.clone().startOf('month').week()
        const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week()

        let calendar = []

        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                <div className='week-row' key={week}> {
                    Array(7).fill(0).map((n, i) => {
                        let current = today.clone().week(week).startOf('week').add(n + i, 'day')
                        let isSatday = n + i == 6 ? 'saturday' : ''
                        let isSunday = n + i == 0 ? 'sunday' : ''
                        let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : ''
                        let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed'
                        return (
                            <div ref={day_ref} index={i} className={`day ${isSelected} ${isGrayed} ${isSatday} ${isSunday}`} key={i} onClick={onClickHandler}>
                                <span className={`text`}>{current.format('D')}</span>
                            </div>
                        )
                    })
                }
                </div>
            )
        }
        console.log(startWeek)
        console.log(endWeek)
        console.log(today.clone())

        return calendar;
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        console.log(e.taget)
        console.log(day_ref.current.attributes)
    }

    return(
        <div className='calendar-wrapper'>
            <div className='calendar-title'>
                <span className='left-icon'><TiChevronLeftOutline /></span>
                    {moment().format('MMMM YYYY')}
                <span className='right-icon'><TiChevronRightOutline /></span>
            </div>
            <div className='calendar-days'>
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>
            <div className='calendar-date'>
                {dayGenerator()}
            </div>
        </div>
    )
}

export default Calendar;