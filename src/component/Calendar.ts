function isLeapYear(total_year: number) {
    if (( total_year % 4 === 0 && (total_year % 100 !== 0) || total_year % 400 === 0 )) return true
    else return false
}

function findDay(century: number, year: number, month, day: number) {
    enum _MONTH {march = 1, april, may, june, july, august, september, october, november, december, january, february}

    let _month = parseInt(_MONTH[month])
    if (_month > 10) year -= 1

    return findStartDateOfWeek(day, month, year, century)
}

function findStartDateOfWeek(day, month, year, century) {
    let start_date = (Math.floor((13 * month -1) / 5) + 
                        Math.floor(year/4) + 
                        Math.floor(century/4) + 
                        day + year - 
                        (2 * century)) % 7

    if (start_date < 0) start_date += 7
    return start_date
}

function printCalendar(dow: number, month) {
    console.log('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')
    console.log(dow)
    let weeks = []
    let sun = [], mon = [], tue = [], wed = [], thu = [], fri = [], sat = []
    weeks = [sun, mon, tue, wed, thu, fri, sat]
    let arr: Array<number> = []
    // isLeapYear일 때 28일에 1일 추가
    const days = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28]
    const dows = [0, 1, 2, 3, 4, 5, 6]
    let item = [].concat(dows.slice(dow), dows.slice(0, dow))
    console.log('item', item)
    for (let i = 1; i <= days[month - 1]; i++) {
        arr[i - 1] = i
    }
    console.log(arr)

    for (let i = 0; i < arr.length; i++) {
        weeks[item[i % 7]].push(arr[i])
    }
    console.log(weeks)
    for (let i = 0; i < weeks.length; i++) {
        let dayw = dow;
        for (let j = 0; j < 7; j++) {
            //console.log(weeks[dayw][i])
            dayw++;
            if (dayw> 6) dayw = 0;
        }
    }
    return arr
}

printCalendar(findDay(20, 20, 5, 1), 5)

function calendar(century, year, month?, day?) {
    const isleap = isLeapYear((century * 100) + year)
}