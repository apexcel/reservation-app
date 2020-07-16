function isLeapYear(year: number) {
    if (( year % 4 === 0 && (year % 100 !== 0) || year % 400 === 0 )) return true
    else return false
}

function findDay(c, y, m, d) {
    enum _MONTH {march = 1, april, may, june, july, august, september, october, november, december, january, february}
    enum _DATE {sun, mon, tue, wed, thu, fri, sat}

    let month = parseInt(_MONTH[m])
    if (month > 10) y -= 1

    return weekDay(d, month, y, c)
}

function weekDay(d, m, y, c) {
    let wod = (Math.floor((13 * m -1) / 5) + Math.floor(y/4) + Math.floor(c/4) + d + y - (2*c)) % 7
    if (wod < 0) wod += 7
    return wod
}

function printCalendar(dow, month) {
    console.log('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')
    let sun = [], mon = []
    let arr: Array<number> = []
    const days = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28]

    for (let i = 0; i <= days[month]; i++) {
        arr[i] = i + 1
        if (i % 7 === 0) sun.push(i)
        if (i % 7 === 1) mon.push(i)
    }
    console.log(arr)
    console.log(sun)
    console.log(mon)
    return arr
}

printCalendar(findDay(0, 1, 'january', 1), 1)

