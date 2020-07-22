import React, { useEffect, useState } from "react"
import "../styles/calendar.scss"

export default function Cal() {

    const daysInMonth = (year, month) => { return 32 - new Date(year, month, 32).getDate() };

    const createDays = (year, month) => {
        const days = [];
        const calcDays = daysInMonth(year, month)
        for (let i = 0; i < calcDays; i += 1) {
            days.push(i + 1)
        }
        return days;
    }

    const [calendar, setCalendar] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        days: createDays(new Date().getFullYear(), new Date().getMonth()),
    });

    const next = () => {
        calendar.year = (calendar.month === 11) ? calendar.year + 1 : calendar.year;
        calendar.month = (calendar.month + 1) % 12;
        calendar.days = createDays(calendar.year, calendar.month)
        createCalendar(calendar.year, calendar.month);
    }

    const prev = () => {
        calendar.year = (calendar.month === 0) ? calendar.year - 1 : calendar.year;
        calendar.month = (calendar.month === 0) ? 11 : calendar.month - 1;
        calendar.days = createDays(calendar.year, calendar.month)
        createCalendar(calendar.year, calendar.month);
    }



    useEffect(() => {
        createCalendar(calendar.year, calendar.month)
    }, [])


    const createCalendar = (year, month) => {
        const firstDayOfWeek = (new Date(year, month).getDay());
        const _calendarBody = document.getElementById("calendar-body");
        // clear table
        _calendarBody.innerHTML = "";

        // year and month change
        const _calendarYearMonth = document.getElementById("calendar-year-month");
        _calendarYearMonth.innerHTML = `${calendar.year} ${calendar.month + 1}`

        let firstDate = 0;
        let weekBody;
        let dateCell;
        for (let i = 0; i < 6; i += 1) {
            weekBody = document.createElement("div");
            weekBody.classList.add("calendar-weeks");

            for (let j = 0; j < calendar.days.length; j += 1) {
                dateCell = document.createElement("div");
                dateCell.classList.add("date-cell");
                dateCell.addEventListener("click", (ev) => {
                    console.log(ev.path[0].innerHTML);
                });

                if (firstDate >= calendar.days.length) {
                    dateCell.appendChild(document.createTextNode("X"))
                }
                else {
                    if (i === 0) {
                        if (j < firstDayOfWeek) {
                            dateCell.appendChild(document.createTextNode("B"))
                        }
                        else {
                            dateCell.appendChild(document.createTextNode(calendar.days[firstDate]))
                            firstDate += 1;
                        }
                    }

                    if (i > 0) {
                        dateCell.appendChild(document.createTextNode(calendar.days[firstDate]))
                        firstDate += 1;
                    }
                }
                weekBody.appendChild(dateCell)
                if (j % 7 === 6) {
                    j += 1;
                    break;
                }
            }

            _calendarBody.appendChild(weekBody)
        }
    }

    return (
        <div id="calendar-wrapper" className="calendar-wrapper">
            <div id="calendar-year-month">{calendar.year} {calendar.month + 1}</div>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
            <div id="calendar-body" className="calendar-body">
            </div>
        </div>
    )
}