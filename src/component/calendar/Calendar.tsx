import React, { useEffect, useState } from "react"
import "../../styles/calendar.scss"
import CalendarNavigation from "./CalendarNavigation.tsx";
import { 
    createDays,
    prevMonthDays,
    nextMonthDays
 } from "../../utils/dateUtils.ts"

export default function Calendar() {

    const className = "simple_calendar";

    const [calendarState, setCalendarState] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        days: createDays(new Date().getFullYear(), new Date().getMonth()),
        today: new Date().getDate(),
        prevDays: prevMonthDays(createDays(new Date().getFullYear(), new Date().getMonth())[0]),
        nextDays: ''
    });

    useEffect(() => {
        createCalendar(calendarState.year, calendarState.month)
        console.log(calendarState)
    }, [calendarState])


    const createCalendar = (year, month) => {
        const firstDayOfWeek = (new Date(year, month).getDay());
        const _calendarBody = document.getElementById("calendar-body");
        // clear table
        _calendarBody.innerHTML = "";

        // year and month change
        const _calendarYearMonth = document.getElementById("calendar-year-month");
        _calendarYearMonth.innerHTML = `${calendarState.year} ${calendarState.month + 1}`

        let firstDate = 0;
        let weekBody;
        let dateCell;
        for (let i = 0; i < 6; i += 1) {
            weekBody = document.createElement("div");
            weekBody.classList.add("calendar-weeks");

            for (let j = 0; j < calendarState.days.length; j += 1) {
                dateCell = document.createElement("div");
                dateCell.classList.add("date-cell");
                
                if (firstDate >= calendarState.days.length) {
                    dateCell.appendChild(document.createTextNode("X"))
                }
                else {
                    if (i === 0) {
                        if (j < firstDayOfWeek) {
                            dateCell.appendChild(document.createTextNode(calendarState.prevDays[j].getDate()))
                        }
                        else {
                            dateCell.appendChild(document.createTextNode(calendarState.days[firstDate].getDate()))
                            dateCell.setAttribute("aria-date", calendarState.days[firstDate])
                            dateCell.addEventListener("click", (ev) => {
                                console.log(ev.srcElement.attributes[1].value)
                            });
                            firstDate += 1;
                        }
                    }

                    if (i > 0) {
                        dateCell.appendChild(document.createTextNode(calendarState.days[firstDate].getDate()))
                        dateCell.setAttribute("aria-date", calendarState.days[firstDate])
                        dateCell.addEventListener("click", (ev) => {
                            console.log(ev.srcElement.attributes[1].value)
                        });
                        firstDate += 1;
                    }
                }
                weekBody.appendChild(dateCell)

                if (calendarState.month === new Date().getMonth() && calendarState.year === new Date().getFullYear() && calendarState.today === firstDate) {
                    dateCell.classList.add("today")
                }
                if (j % 7 === 0){
                    dateCell.classList.add("sunday")
                }
                if (j % 7 === 6) {
                    dateCell.classList.add("saturday")
                    j += 1;
                    break;
                }
            }

            _calendarBody.appendChild(weekBody)
        }
    }

    return (
        <div id="calendar-wrapper" className="calendar-wrapper">
            <div id="calendar-year-month" className="calendar-year-month">{calendarState.year} {calendarState.month + 1}</div>
            <CalendarNavigation 
                className={className}
                calendarState={calendarState}
                setCalendarState={setCalendarState}
                createCalendar={createCalendar}
                createDays={createDays}
                prevMonthDays={prevMonthDays}
            />
            <div id="calendar-date-wrapper" className="calendar-date-wrapper">
                <div className="calendar-date">SUN</div>
                <div className="calendar-date">MON</div>
                <div className="calendar-date">TUE</div>
                <div className="calendar-date">WED</div>
                <div className="calendar-date">THU</div>
                <div className="calendar-date">FRI</div>
                <div className="calendar-date">SAT</div>
            </div>
            <div id="calendar-body" className="calendar-body">
            </div>
        </div>
    )
}