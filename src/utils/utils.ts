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


//TODO: sort compare 함수 만들기
export function compare(a, b) {
    let keysA = [];
    a.map(el => {
        console.log(el)
        keysA.push(Object.keys(el))
    })
    const largestKeys = keysA.sort()[keysA.length - 1];
}