import React, { useEffect, useState } from "react"
import "../styles/calendar.scss"

export default function Cal() {

    const daysInMonth = (year, month) => { return 32 - new Date(year, month, 32).getDate() };

    const createDays = (year, month) => {
        const days = [];
        const calcDays = daysInMonth(year, month)
        const newDate = new Date(year, month)
        for (let i = 0; i < calcDays; i += 1) {
            days.push(new Date(newDate.valueOf() + 86400000 * i))
        }
        return days;
    }

    const [calendar, setCalendar] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        days: createDays(new Date().getFullYear(), new Date().getMonth()),
        today: new Date().getDate()
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
                
                console.log(j, firstDate)
                if (firstDate >= calendar.days.length) {
                    dateCell.appendChild(document.createTextNode("X"))
                }
                else {
                    if (i === 0) {
                        if (j < firstDayOfWeek) {
                            dateCell.appendChild(document.createTextNode("B"))
                        }
                        else {
                            dateCell.appendChild(document.createTextNode(calendar.days[firstDate].getDate()))
                            dateCell.setAttribute("aria-date", calendar.days[firstDate])
                            dateCell.addEventListener("click", (ev) => {
                                console.log(ev.srcElement.attributes[1].value)
                            });
                            firstDate += 1;
                        }
                    }

                    if (i > 0) {
                        dateCell.appendChild(document.createTextNode(calendar.days[firstDate].getDate()))
                        dateCell.setAttribute("aria-date", calendar.days[firstDate])
                        dateCell.addEventListener("click", (ev) => {
                            console.log(ev.srcElement.attributes[1].value)
                        });
                        firstDate += 1;
                    }
                }
                weekBody.appendChild(dateCell)

                if (calendar.month === new Date().getMonth() && calendar.year === new Date().getFullYear() && calendar.today === firstDate) {
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
            <div id="calendar-year-month" className="calendar-year-month">{calendar.year} {calendar.month + 1}</div>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
            <div className="calendar-date-wrapper">
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