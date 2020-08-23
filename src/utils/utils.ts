export function isEmpty(obj) {
    if (obj === null || obj === undefined || obj.toString() === '' ||
        (obj !== null && typeof obj === 'object' && !Object.keys(obj).length) ||
        (typeof obj === 'function' && !obj.length)) {
        return true
    }
    return false
}

export function replacer(key, value) {
    if (value === undefined) {
        return null;
    }
    return value;
}

export function genTableName(date: Date) {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();

    month = (month.length === 1) ? '0' + month : month;
    day = (day.length === 1) ? '0' + day : day;
    return `${year}-${month}-${day}`;
}

export function stringFromDate(date: Date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

// TODO: query string 을 탐색하는 메소드 개발해보자