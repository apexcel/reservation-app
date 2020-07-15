function isLeapYear(y) {
    if (( y % 4 === 0 && (y % 100 !== 0) || y % 400 === 0 )) return true
    else return false
}

function findDay(c, y, m, d) {
    enum _MONTH {march = 1, april, may, june, july, august, september, october, november, december, january, february}
    enum _DATE {sun, mon, tue, wed, thu, fri, sat}

    let month = parseInt(_MONTH[m])
    if (month > 10) y -= 1

    console.log(weekDay(d, month, y, c))
}

function weekDay(d, m, y, c) {
    let wod = (Math.floor((13 * m -1) / 5) + Math.floor(y/4) + Math.floor(c/4) + d + y - (2*c)) % 7
    if (wod < 0) wod += 7
    return wod
}

findDay(19, 94, 'march', 1)
findDay(19, 97, 'march', 1)
